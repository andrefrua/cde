/*!
 * Copyright 2002 - 2017 Webdetails, a Hitachi Vantara company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

package pt.webdetails.cdf.dd.api;

import static javax.ws.rs.core.MediaType.TEXT_HTML;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import pt.webdetails.cdf.dd.CdeConstants;
import pt.webdetails.cdf.dd.CdeConstants.MethodParams;
import pt.webdetails.cdf.dd.DashboardManager;
import pt.webdetails.cdf.dd.ICdeEnvironment;
import pt.webdetails.cdf.dd.InterPluginBroker;
import pt.webdetails.cdf.dd.model.core.writer.ThingWriteException;
import pt.webdetails.cdf.dd.model.inst.writer.cdfrunjs.dashboard.CdfRunJsDashboardWriteOptions;
import pt.webdetails.cdf.dd.model.inst.writer.cdfrunjs.dashboard.CdfRunJsDashboardWriteResult;
import pt.webdetails.cdf.dd.util.CdeEnvironment;
import pt.webdetails.cdf.dd.util.Utils;
import pt.webdetails.cdf.dd.util.CorsUtil;
import pt.webdetails.cpf.Util;
import pt.webdetails.cpf.repository.api.IReadAccess;

@Path( "pentaho-cdf-dd/api/renderer" )
public class RenderApi {

  private static final Log logger = LogFactory.getLog( RenderApi.class );
  protected ICdeEnvironment privateEnviroment;

  @GET
  @Path( "/getDashboard" )
  @Produces( TEXT_HTML )
  public String getDashboard( @QueryParam( MethodParams.PATH ) @DefaultValue( "" ) String path,
                              @QueryParam( MethodParams.INFERSCHEME ) @DefaultValue( "false" ) boolean inferScheme,
                              @QueryParam( MethodParams.ROOT ) @DefaultValue( "" ) String root,
                              @QueryParam( MethodParams.ABSOLUTE ) @DefaultValue( "true" ) boolean absolute,
                              @QueryParam( MethodParams.BYPASSCACHE ) @DefaultValue( "true" ) boolean bypassCache,
                              @QueryParam( MethodParams.DEBUG ) @DefaultValue( "false" ) boolean debug,
                              @QueryParam( MethodParams.SCHEME ) @DefaultValue( "" ) String scheme,
                              @QueryParam( MethodParams.VIEW ) @DefaultValue( "" ) String view,
                              @QueryParam( MethodParams.STYLE ) @DefaultValue( "" ) String style,
                              @QueryParam( MethodParams.ALIAS ) @DefaultValue( "" ) String alias,
                              @Context HttpServletRequest request ) throws IOException {

/*
    path = XSSHelper.getInstance().escape( path );
    scheme = XSSHelper.getInstance().escape( scheme );
    view = XSSHelper.getInstance().escape( view );
    style = XSSHelper.getInstance().escape( style );
    alias = XSSHelper.getInstance().escape( alias );
*/
    final String schemeToUse;
    if ( !inferScheme ) {
      schemeToUse = StringUtils.isEmpty( scheme ) ? request.getScheme() : scheme;
    } else {
      schemeToUse = "";
    }

    if ( StringUtils.isEmpty( path ) ) {
      logger.warn( "No path provided." );
      return "No path provided.";
    }
/*
    IReadAccess readAccess = Utils.getSystemOrUserReadAccess( path );
    if ( readAccess == null ) {
      logger.warn( "Access Denied or File Not Found." );
      return "Access Denied or File Not Found.";
    }
*/
    IParameterProvider requestParams = getParameterProvider( request.getParameterMap() );

    try {
      String config = getCdfRequireConfig( path, requestParams );
      CdfRunJsDashboardWriteResult dashboard = getDashboardModule(
        path,
        schemeToUse,
        root,
        absolute,
        bypassCache,
        debug,
        style,
        alias );

      //TODO: how to process i18n for a required dashboard
      //i18n token replacement

      return dashboard.getContent( config );
    } catch ( Exception ex ) { //TODO: better error handling?
      String msg = "Could not load dashboard: " + ex.getMessage();
      logger.error( msg, ex );

      return msg;
    }
  }

  @GET
  @Path( "/getDashboardParameters" )
  @Produces( APPLICATION_JSON )
  public String getDashboardParameters(
    @QueryParam( MethodParams.PATH ) @DefaultValue( "" ) String path,
    @QueryParam( MethodParams.BYPASSCACHE ) @DefaultValue( "true" ) boolean bypassCache,
    @QueryParam( MethodParams.ALLPARAMS ) @DefaultValue( "false" ) boolean all,
    @Context HttpServletRequest servletRequest,
    @Context HttpServletResponse servletResponse ) throws IOException {


    //path = XSSHelper.getInstance().escape( path );

    //servletResponse.setContentType( APPLICATION_JSON );
    //servletResponse.setCharacterEncoding( CharsetHelper.getEncoding() );
    //setCorsHeaders( servletRequest, servletResponse );

    if ( StringUtils.isEmpty( path ) ) {
      logger.warn( "No path provided." );
      //return "No path provided.";
      path="test"; // trouble passing in url query parameters
    }
/*
    if ( !hasSystemOrUserReadAccess( path ) ) {
      logger.warn( "Access Denied or File Not Found." );
      return "Access Denied or File Not Found.";
    }
*/
    try {
      return getDashboardManager().getDashboardParameters( path, bypassCache, all );
    } catch ( Exception ex ) { //TODO: better error handling?
      String msg = "Could not load dashboard parameters: " + ex.getMessage();
      logger.error( msg, ex );
      return msg;
    }
  }

  private CdfRunJsDashboardWriteResult loadDashboard( String filePath, String scheme, String root, boolean absolute,
                                                      boolean bypassCache, boolean debug, String style )
    throws ThingWriteException {

    CdfRunJsDashboardWriteOptions options =
      new CdfRunJsDashboardWriteOptions( "", false, absolute, debug, root, scheme );
    return getDashboardManager().getDashboardCdfRunJs( filePath, options, bypassCache, style );
  }

  private CdfRunJsDashboardWriteResult getDashboardModule( String path, String scheme, String root,
                                                           boolean absolute, boolean bypassCache, boolean debug,
                                                           String style, String alias )
    throws ThingWriteException, UnsupportedEncodingException {

    final String dashboardAlias;
    if ( StringUtils.isEmpty( alias ) ) {
      dashboardAlias =
        FilenameUtils.removeExtension( FilenameUtils.getName( path ) ) + "_" + CdeConstants.DASHBOARD_ALIAS_TAG;
    } else {
      dashboardAlias = FilenameUtils.removeExtension( FilenameUtils.getName( path ) ) + "_" + alias;

    }
    CdfRunJsDashboardWriteOptions options =
      new CdfRunJsDashboardWriteOptions( dashboardAlias, true, absolute, debug, root, scheme );

    return getDashboardManager().getDashboardCdfRunJs( path, options, bypassCache, style );

  }

  protected DashboardManager getDashboardManager() {
    return DashboardManager.getInstance();
  }

  private String getWcdfRelativePath( String solution, String path, String file ) {
    //TODO: change to use path instead of file
    //    if ( !StringUtils.isEmpty( solution ) || !StringUtils.isEmpty( file ) ) {
    //      logger.warn( "Use of solution/path/file is deprecated. Use just the path argument" );
    return Util.joinPath( solution, path, file );
    //    }
    //    else return path;
    //    final String filePath = "/" + solution + "/" + path + "/" + file;
    //    return filePath.replaceAll( "//+", "/" );
  }

  private IPentahoSession getPentahoSession() {
    return PentahoSessionHolder.getSession();
  }

  private String getObjectName() {
    return RenderApi.class.getName();
  }

  private String getPluginName() {
    return CdeEnvironment.getPluginId();
  }

  private IParameterProvider getParameterProvider( Map<String, String> params ) {
    return new SimpleParameterProvider( params );
  }

  protected void setCorsHeaders( HttpServletRequest request, HttpServletResponse response ) {
    CorsUtil.getInstance().setCorsHeaders( request, response );
  }

  protected boolean hasSystemOrUserReadAccess( String path ) {
    return Utils.getSystemOrUserReadAccess( path ) != null;
  }

  protected String getCdfRequireConfig( String filePath, IParameterProvider requestParams ) throws Exception {
    return InterPluginBroker.getCdfRequireConfig( filePath, requestParams );
  }
}
