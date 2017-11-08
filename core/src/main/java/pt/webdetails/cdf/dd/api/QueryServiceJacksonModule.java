/*
 * Copyright 2016-2017 Hitachi Vantara. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 */
package pt.webdetails.cdf.dd.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class QueryServiceJacksonModule {
  public static ObjectMapper getMapper() {
    SimpleModule module = new SimpleModule( "CDE Engine Service REST API" );
    /*module.addAbstractTypeMapping( IQuery.class, Query.class );
    module.addAbstractTypeMapping( IQueryField.class, QueryField.class );
    module.addAbstractTypeMapping( IQuerySortField.class, QuerySortField.class );*/

    /*module.registerSubtypes( AndFilter.class, OrFilter.class, EqualsFilter.class, NotFilter.class, FalseFilter.class,
        TrueFilter.class, GreaterFilter.class, GreaterOrEqualFilter.class, LessFilter.class, LessOrEqualFilter.class,
        LikeFilter.class );*/

    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule( module );

    mapper.disable( DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES );
    mapper.setSerializationInclusion( JsonInclude.Include.NON_NULL );

    return mapper;
  }
}
