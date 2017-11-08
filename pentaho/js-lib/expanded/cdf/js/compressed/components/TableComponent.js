define(["../Logger","../dashboard/Utils","amd!../lib/underscore","./UnmanagedComponent","../dashboard/Sprintf","../lib/jquery","amd!../lib/datatables","../addIns/colTypes","css!./TableComponent"],function(Logger,Utils,_,UnmanagedComponent,sprintf,$){
void 0!=$.fn.dataTableExt&&($.fn.dataTableExt.oApi.fnLengthChange=function(a,t){a._iDisplayLength=t,
a.oApi._fnCalculateEnd(a),a._iDisplayEnd==a.aiDisplay.length&&(a._iDisplayStart=a._iDisplayEnd-a._iDisplayLength,
a._iDisplayStart<0&&(a._iDisplayStart=0)),-1==a._iDisplayLength&&(a._iDisplayStart=0),
a.oApi._fnDraw(a),$("select",a.oFeatures.l).val(t)},$.extend($.fn.dataTableExt.oSort,{
"html-asc":function(a,t){var e=a.replace(/<.*?>/g,"").toLowerCase(),n=t.replace(/<.*?>/g,"").toLowerCase();
return n>e?-1:e>n?1:0},"html-desc":function(a,t){var e=a.replace(/<.*?>/g,"").toLowerCase(),n=t.replace(/<.*?>/g,"").toLowerCase();
return n>e?1:e>n?-1:0},"date-asc":function(a,t){var e=Date.parse(a),n=Date.parse(t);
return(isNaN(e)||""===e)&&(e=Date.parse("01/01/1970 00:00:00")),(isNaN(n)||""===n)&&(n=Date.parse("01/01/1970 00:00:00")),
e-n},"date-desc":function(a,t){var e=Date.parse(a),n=Date.parse(t);return(isNaN(e)||""===e)&&(e=Date.parse("01/01/1970 00:00:00")),
(isNaN(n)||""===n)&&(n=Date.parse("01/01/1970 00:00:00")),n-e},"numeric-asc":function(a,t){
return a="-"==a||""==a?0:$.isNumeric(a)?1*a:0,t="-"==t||""==t?0:$.isNumeric(t)?1*t:0,
t>a?-1:a>t?1:0},"numeric-desc":function(a,t){return a="-"==a||""==a?0:$.isNumeric(a)?1*a:0,
t="-"==t||""==t?0:$.isNumeric(t)?1*t:0,t>a?1:a>t?-1:0}})),void 0!=$.fn.DataTable&&void 0!=$.fn.DataTable.ext&&($.extend($.fn.DataTable.ext.classes,{
sNoFooter:"",sPagePrevEnabled:"paginate_enabled_previous",sPagePrevDisabled:"paginate_disabled_previous",
sPageNextEnabled:"paginate_enabled_next",sPageNextDisabled:"paginate_disabled_next"
}),$.extend($.fn.DataTable.ext.oJUIClasses,{sNoFooter:"",sSortable:"",sSortAsc:"",
sSortDesc:"",sSortColumn:"",sPagePrevEnabled:"fg-button ui-button ui-state-default ui-corner-left",
sPagePrevDisabled:"fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
sPageNextEnabled:"fg-button ui-button ui-state-default ui-corner-right",sPageNextDisabled:"fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
sPageJUINext:"ui-icon ui-icon-circle-arrow-e",sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w"
}),$.extend($.fn.DataTable.ext.pager,{two_button:{fnInit:function(a,t,e){var n=(a.oLanguage.oPaginate,
a.oClasses,function(t){a.oApi._fnPageChange(a,t.data.action)&&e(a)}),o=a.bJUI?'<a class="'+a.oClasses.sPagePrevDisabled+'" tabindex="'+a.iTabIndex+'" role="button"><span class="'+a.oClasses.sPageJUIPrev+'"></span></a><a class="'+a.oClasses.sPageNextDisabled+'" tabindex="'+a.iTabIndex+'" role="button"><span class="'+a.oClasses.sPageJUINext+'"></span></a>':'<a class="'+a.oClasses.sPagePrevDisabled+'" tabindex="'+a.iTabIndex+'" role="button"></a><a class="'+a.oClasses.sPageNextDisabled+'" tabindex="'+a.iTabIndex+'" role="button"></a>';
$(t).append(o);var s=$("a",t),i=s[0],r=s[1];a.oApi._fnBindAction(i,{action:"previous"
},n),a.oApi._fnBindAction(r,{action:"next"},n),a.aanFeatures.p||(t.id=a.sTableId+"_paginate",
i.id=a.sTableId+"_previous",r.id=a.sTableId+"_next",i.setAttribute("aria-controls",a.sTableId),
r.setAttribute("aria-controls",a.sTableId))},fnUpdate:function(a,t){if(a.aanFeatures.p)for(var e,n=a.oClasses,o=a.aanFeatures.p,s=0,i=o.length;i>s;s++)e=o[s].firstChild,
e&&(e.className=0===a._iDisplayStart?n.sPagePrevDisabled:n.sPagePrevEnabled,e=e.nextSibling,
e.className=a.fnDisplayEnd()==a.fnRecordsDisplay()?n.sPageNextDisabled:n.sPageNextEnabled);
}}}));var TableComponent=UnmanagedComponent.extend({ph:void 0,update:function(){var a=this;
if(a.preExec()){if(!a.htmlObject)return a.error("TableComponent requires an htmlObject");
try{if(a.isSilent()||a.block(),a.setup(),a.chartDefinition.paginateServerside)a.paginatingUpdate();else{
var t=_.bind(function(t){a.rawData=t,a.processTableComponentResponse(t)},a),e=a.getSuccessHandler(t);
a.queryState.setAjaxOptions({async:!0});var n;void 0!=a.parameters?(n=$.extend(!0,[],a.parameters),
n=_.map(n,function(t){return t[1]=a.dashboard.getParameterValue(t[1]),t})):n=[],a.queryState.fetchData(n,e,a.failureCallback);
}}catch(o){Logger.exception(o),a.isSilent()||a.unblock()}}},paginatingUpdate:function(){
var a=this.chartDefinition;this.extraOptions=this.extraOptions||[],this.extraOptions.push(["bServerSide",!0]),
this.extraOptions.push(["bProcessing",!0]),this.queryState.setPageSize(parseInt(a.displayLength||10));
var t=_.bind(function(a){var t=void 0;"function"==typeof this.postFetch&&(t=this.postFetch(a)),
void 0!=t&&(a=t),this.processTableComponentResponse(a)},this);this.queryState.setCallback(t),
this.parameters&&this.queryState.setParameters(this.parameters),this.queryState.setAjaxOptions({
async:!0}),this.queryState.fetchData(this.parameters,t,this.failureCallback)},setup:function(){
var a=this.chartDefinition;if(void 0==a)return void Logger.log("Fatal - No chart definition passed","error");
"undefined"==typeof a.tableStyle&&(a.tableStyle="bootstrap"===this.dashboard.getWcdfSettings().rendererType?"bootstrap":"classic"),
a.tableId=this.htmlObject+"Table";var t=this;$(this.expandParameters).each(function(a,e){
t.dashboard.setParameter(e[1],"")}),this.ph=$("#"+this.htmlObject).empty();var e=$.extend({},a);
e.drawCallback=void 0,this.queryState=this.dashboard.getQuery(e),this.query=this.queryState;
for(var n=this.chartDefinition.sortBy||[],o=[],s=0;s<n.length;s++){var i=n[s][0],r=n[s][1];
o.push(i+("asc"==r?"A":"D"))}this.queryState.setSortBy(o)},pagingCallback:function(a,t,e,n,o,s){
function i(a){for(var e=0,n=t.length;n>e;e++)if(t[e].name==a)return t[e].value;return null;
}var r=i("order"),l=[];if(r&&r.length>0)for(var d=0;d<r.length;d++){var c=r[d].column,p=r[d].dir;
l.push(c+("asc"==p?"A":"D"))}var u=this.queryState,b=this;u.setSortBy(l.join(",")),
u.setPageSize(parseInt(i("length"))),u.setPageStartingAt(i("start")),u.setSearchPattern(i("search")?i("search").value:"");
var h=function(a){if(b.postFetch){var t=b.postFetch(a,n);"undefined"!=typeof t&&(a=t);
}var o;o=a.queryInfo?{iTotalRecords:a.queryInfo.totalRows,iTotalDisplayRecords:a.queryInfo.totalRows
}:{iTotalRecords:a.resultset.length,iTotalDisplayRecords:a.resultset.length},o.aaData=a.resultset,
o.sEcho=i("sEcho"),b.rawData=a,e(o)};s?(u.setCallback(h),h(o)):u.fetchData(h,this.failureCallback);
},fnDrawCallback:function(dataTableSettings){for(var dataTable=dataTableSettings.oInstance,cd=this.chartDefinition,myself=this,tableRows=this.ph.find("tbody tr"),k=0;k<tableRows.length;k++){
if(null==dataTable.fnGetPosition(tableRows[k]))return!0;for(var tableData=$(tableRows[k]).children("td"),i=0;i<tableData.length;i++){
var td=tableData[i],$td=$(td),position=dataTable.fnGetPosition(td);if(position&&"number"==typeof position[0]){
var rowIdx=position[0],colIdx=position[2],foundAddIn=myself.handleAddIns(dataTable,td,$td,rowIdx,colIdx);
if(!foundAddIn&&cd.colFormats){var format=cd.colFormats[colIdx],value=myself.rawData.resultset[rowIdx][colIdx];
format&&"undefined"!=typeof value&&null!==value&&$td.text(sprintf(format,value))}
}}}if(void 0!=cd.urlTemplate){var td=$("#"+myself.htmlObject+" td:nth-child(1)");td.addClass("cdfClickable"),
td.bind("click",function(e){var regex=new RegExp("{"+cd.parameterName+"}","g"),f=cd.urlTemplate.replace(regex,$(this).text());
eval(f)})}"function"==typeof cd.drawCallback&&cd.drawCallback.apply(myself,arguments);
},fnInitComplete:function(){this.postExec(),this.isSilent()||this.unblock()},handleAddIns:function(a,t,e,n,o){
var s=this.chartDefinition,i=s.colTypes[o],r={},l=e,d=this.rawData,c=this.getAddIn("colType",i);
if(!c)return!1;try{if(!l.parents("tbody").length)return;return"TD"!=l.get(0).tagName&&(l=l.closest("td")),
r.rawData=d,r.tableData=a.fnGetData(),r.colIdx=o,r.rowIdx=n,r.series=d.resultset[r.rowIdx][0],
r.category=d.metadata[r.colIdx].colName,r.value=d.resultset[r.rowIdx][r.colIdx],s.colFormats&&(r.colFormat=s.colFormats[r.colIdx]),
r.target=l,c.call(t,r,this.getAddInOptions("colType",c.getName())),!0}catch(p){return Logger.exception(p),
!1}},processTableComponentResponse:function(a){var t=this,e=t.chartDefinition,n={};
t.ph.trigger("cdfTableComponentProcessResponse"),("undefined"==typeof e.colHeaders||0==e.colHeaders.length)&&(e.colHeaders=a.metadata.map(function(a){
return a.colName})),("undefined"==typeof e.colTypes||0==e.colTypes.length)&&(e.colTypes=a.metadata.map(function(a){
return a.colType.toLowerCase()}));var o=TableComponent.getDataTableOptions(e);$.each(t.extraOptions?t.extraOptions:{},function(a,t){
n[t[0]]=t[1]});var s=$.extend(e.dataTableOptions,o,n);if(s.fnDrawCallback=_.bind(t.fnDrawCallback,t),
s.fnInitComplete=_.bind(t.fnInitComplete,t),s.bServerSide){var i=!0;s.fnServerData=function(e,n,o){
t.pagingCallback(e,n,o,this,a,i),i=!1},a.queryInfo||(s.iDisplayLength=a.resultset.length,
s.bLengthChange=!1,Logger.warn("Please use CDA queries to enable server-side pagination."));
}a&&(s.aaData=a.resultset);var r="bootstrap"==s.tableStyle?"table table-striped table-bordered form-inline table-responsive":"tableComponent compact";
t.ph.html("<table id='"+t.htmlObject+"Table' class='"+r+"' width='100%'></table>"),
t.dataTable=$("#"+t.htmlObject+"Table").dataTable(s),t.dataTable.anOpen=[],t.ph.find("table").bind("click",function(a){
if("function"==typeof e.clickAction||t.expandOnClick){var n={},o=$(a.target),s=t.rawData;
if(!o.parents("tbody").length)return;"TD"!=o.get(0).tagName&&(o=o.closest("td"));var i=t.dataTable.fnGetPosition(o.get(0));
n.rawData=t.rawData,n.tableData=t.dataTable.fnGetData(),n.colIdx=i[2],n.rowIdx=i[0],
n.series=s.resultset[n.rowIdx][0],n.category=s.metadata[n.colIdx].colName,n.value=s.resultset[n.rowIdx][n.colIdx],
n.colFormat=e.colFormats[n.colIdx],n.target=o,t.expandOnClick&&t.handleExpandOnClick(n),
e.clickAction&&e.clickAction.call(t,n)}}),t.ph.trigger("cdfTableComponentFinishRendering");
},handleExpandOnClick:function(a){var t=this,e=(t.expandContainerObject,"expandingClass");
"undefined"==typeof e&&(e="activeRow");var n=a.target.closest("tr"),o=a.target.closest("a");
if(!o.hasClass("info")){var s=n.get(0),i=t.dataTable.anOpen,r=$.inArray(s,i);if(n.hasClass(e))t.detachFromRow(s,r,e),
$(t.expandParameters).each(function(a,e){t.dashboard.setParameter(e[1],"")});else{
for(var l=0;l<i.length;l++)t.detachFromRow(i[l],l,e);n.addClass(e),t.attachToRow(s,e);
var d=t.queryState.lastResults(),c=null;$(t.expandParameters).each(function(e,n){
c||t.dashboard.getParameterValue(n[1])===d.resultset[a.rowIdx][parseInt(n[0],10)]?t.dashboard.setParameter(n[1],d.resultset[a.rowIdx][parseInt(n[0],10)]):c=n;
}),null!==c&&t.dashboard.fireChange(c[1],d.resultset[a.rowIdx][parseInt(c[0],10)]);
}$("td.expandingClass").click(function(a){a.stopPropagation()})}},attachToRow:function(a,t){
this.dataTable.anOpen.push(a),this.dataTable.fnOpen(a,"",t);var e,n=$(a).next().children().empty();
if(this.expandClone)e=this.expandClone;else{var o="#"+this.expandContainerObject;e=$(o),
this.expandClone=e.clone(!0)}e.appendTo(n).show()},detachFromRow:function(a,t,e){
$(a).next().find("td."+e+" > *").remove(),$(a).removeClass(e),this.dataTable.fnClose(a),
this.dataTable.anOpen.splice(t,1),$(".dataTables_wrapper div.dataTables_paginate").off("click");
}},{getDataTableOptions:function(options){var dtData={};if("themeroller"==options.tableStyle&&(dtData.bJQueryUI=!0),
dtData.bInfo=options.info,dtData.iDisplayLength=options.displayLength,dtData.bLengthChange=options.lengthChange,
dtData.bPaginate=options.paginate,dtData.bSort=options.sort,dtData.bFilter=options.filter,
dtData.sPaginationType=options.paginationType,dtData.sDom=options.sDom,dtData.aaSorting=options.sortBy,
dtData.tableStyle=options.tableStyle,"string"==typeof options.oLanguage?dtData.oLanguage=eval("("+options.oLanguage+")"):dtData.oLanguage=options.oLanguage,
"string"==typeof options.language?dtData.language=eval("("+options.language+")"):dtData.language=options.language,
void 0!=options.colHeaders){dtData.aoColumns=new Array(options.colHeaders.length);
for(var i=0;i<options.colHeaders.length;i++)dtData.aoColumns[i]={},dtData.aoColumns[i].sClass="column"+i;
$.each(options.colHeaders,function(a,t){dtData.aoColumns[a].sTitle=Utils.escapeHtml(t),
""==t&&(dtData.aoColumns[a].bVisible=!1)}),0!=dtData.aoColumns.length&&void 0!=options.colTypes&&$.each(options.colTypes,function(a,t){
if(a>=dtData.aoColumns.length)return!1;var e=dtData.aoColumns[a];"hidden"==t&&(e.bVisible=!1),
e.sClass+=" "+t,e.sType=t}),void 0!=options.colFormats;var bAutoWidth=!0;0!=dtData.aoColumns.length&&void 0!=options.colWidths&&$.each(options.colWidths,function(a,t){
return a>=dtData.aoColumns.length?!1:void(null!=t&&(dtData.aoColumns[a].sWidth=t,
bAutoWidth=!1))}),dtData.bAutoWidth=bAutoWidth,0!=dtData.aoColumns.length&&void 0!=options.colSortable&&$.each(options.colSortable,function(a,t){
return a>=dtData.aoColumns.length?!1:void(null==t||t&&"false"!=t||(dtData.aoColumns[a].bSortable=!1));
}),0!=dtData.aoColumns.length&&void 0!=options.colSearchable&&$.each(options.colSearchable,function(a,t){
return a>=dtData.aoColumns.length?!1:void(null==t||t&&"false"!=t||(dtData.aoColumns[a].bSearchable=!1));
})}return dtData}});return TableComponent});