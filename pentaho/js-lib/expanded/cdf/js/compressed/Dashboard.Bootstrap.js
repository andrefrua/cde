define("cdf/dashboard/RefreshEngine",[],function(){return function(e){var t=0,n=new Array,i=null,r=t,o=null,a=function(){
return{nextRefresh:0,component:null}},s=function(n){null!=o&&(clearInterval(o),o=null),
r=n>0?n:t,r!=t&&(o=setInterval(e.refreshEngine.fireGlobalRefresh,1e3*r))},u=function(e){
for(var t=0;t<n.length;t++)n[t].component==e&&(n.splice(t,1),t--)},c=function(){n.length>0&&n.splice(0,n.length);
},d=function(e,t){for(var n,i=e.length-1,r=0;i>=r;)if(n=parseInt((r+i)/2),e[n].nextRefresh>t.nextRefresh)i=n-1;else{
if(!(e[n].nextRefresh<t.nextRefresh))return n;r=n+1}return r},l=function(e,t){var n=d(e,t);
e.splice(n,0,t)},h=function(){null!=i&&(clearTimeout(i),i=null)},f=function(){h(),
e.refreshEngine.fireRefresh()},p=function(){return(new Date).getTime()},g=function(e){
return n.length>0&&n[0].component==e},m=function(t){e.update(t)},y=function(e){var i=p();
if(e.refreshPeriod>0||(e.refreshPeriod=t),e.refreshPeriod!=t){var r=new a;r.nextRefresh=i+1e3*e.refreshPeriod,
r.component=e,l(n,r)}};return{registerComponent:function(e,n){if(!e)return!1;e.refreshPeriod=n>0?n:t;
var i=g(e);return u(e),i&&f(),!0},getRefreshPeriod:function(e){return e&&e.refreshPeriod>0?e.refreshPeriod:t;
},processComponent:function(e){return u(e),y(e),g(e)&&f(),!0},processComponents:function(){
c();for(var t=0;t<e.components.length;t++)y(e.components[t]);return f(),!0},fireRefresh:function(){
i=null;for(var e=p();n.length>0&&n[0].nextRefresh<=e;){var t=n.shift();m(t.component);
}n.length>0&&(i=setTimeout(this.fireRefresh,n[0].nextRefresh-e))},fireGlobalRefresh:function(){
for(var t=0;t<e.components.length;t++){var n=e.components[t];n.refreshPeriod>0||"select"==n.type||m(n);
}},setGlobalRefresh:function(e){s(e)},getQueue:function(){return n}}}}),define("cdf/dashboard/Dashboard",["../lib/Base","../Logger","./RefreshEngine","amd!../lib/underscore","amd!../lib/backbone","../lib/jquery","module","amd!../lib/jquery.impromptu","../lib/shims"],function(e,t,n,i,r,o,a){
return e.extend({constructor:function(e){function a(e,n){"function"==typeof e?(t.info("Calling init method of module: "+n),
e.apply(u)):t.warn("Not calling init method of module: "+n)}function s(){var e=this;
"function"==typeof o?(o.ajaxSetup({type:"POST",async:!1,traditional:!0,scriptCharset:"utf-8",
contentType:"application/x-www-form-urlencoded;charset=UTF-8",dataFilter:function(t,n){
return e.lastServerResponse=Date.now?Date.now():(new Date).getTime(),t}}),o.prompt&&"function"==typeof o.prompt.setDefaults?o.prompt.setDefaults({
prefix:"jqi",show:"slideDown"}):t.log("$.prompt plugin not loaded!!"),"function"==typeof o.blockUI?(o.blockUI.defaults.fadeIn=0,
o.blockUI.defaults.message='<div class="blockUIDefaultImg"></div>',o.blockUI.defaults.css.left="50%",
o.blockUI.defaults.css.top="40%",o.blockUI.defaults.css.marginLeft="-16px",o.blockUI.defaults.css.width="32px",
o.blockUI.defaults.css.background="none",o.blockUI.defaults.overlayCSS={backgroundColor:"#FFFFFF",
opacity:.8,cursor:"wait"},o.blockUI.defaults.css.border="none"):t.log("$.blockUI plugin not loaded!!")):t.log("jQuery plugin not loaded!!");
}var u=this;e&&(e.context&&(this.context=e.context),e.storage&&(this.context&&"anonymousUser"===this.context.user||(this.storage=e.storage)),
e.view&&(this.view=e.view)),i.extend(this,r.Events),s(),"undefined"!=typeof CONTEXT_PATH&&(this.webAppPath=CONTEXT_PATH),
void 0===this.webAppPath&&(this.webAppPath="/"+window.location.pathname.split("/")[1]),
this.webAppPath.endsWith("/")&&(this.webAppPath=this.webAppPath.substr(0,this.webAppPath.length-1)),
a(this._initContext,"Context"),a(this._initStorage,"Storage"),a(this._initViews,"Views"),
a(this._initParameters,"Parameters"),a(this._initBookmarkables,"Bookmarkables"),a(this._initI18n,"I18n"),
a(this._initComponents,"Components"),a(this._initLifecycle,"Lifecycle"),a(this._initNotifications,"Notifications"),
a(this._initDataSources,"DataSources"),a(this._initQuery,"Query"),a(this._initAddIns,"AddIns"),
this.refreshEngine=new n(this)},refreshEngine:void 0,globalContext:!1,contextObj:a.config().context||{},
storageObj:a.config().storage||{},viewObj:a.config().view,legacyPriority:-1e3,logLifecycle:!0,
args:[],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
registerEvent:function(e,t){"undefined"==typeof this.events&&(this.events={}),this.events[e]=t;
},debug:1,syncDebugLevel:function(){var e=1;try{var t=function(e){return e&&/\bdebug=true\b/.test(e)?e:null;
},n=t(window.location.href)||t(window.top.location.href);if(n){var i=/\bdebugLevel=(\d+)/.exec(n);
e=i?+i[1]:3}}catch(r){}return this.debug=e},setGlobalContext:function(e){this.globalContext=e;
},getWebAppPath:function(){return this.webAppPath},getWcdfSettings:function(){return t.info("getWcdfSettings was not overridden, returning empty object"),
{}},normalizeId:function(e){return e}})}),define("cdf/dashboard/Dashboard.context",["../lib/jquery","./Dashboard","./Dashboard.ext","./Dashboard.context.ext"],function(e,t,n,i){
t.implement({context:void 0,_initContext:function(){this.context||(this.context={},
e.extend(this.context,this.contextObj))}})}),define("cdf/dashboard/Container",[],function(){
function e(e,t,i){var r;i||(i="instance"),this.build=function(n,o){if(r&&!o)return r;
var a=t(e,n);return o||"singleton"!==i||(r=a),a},this.dispose=function(){r&&(n(r),
r=null)}}function t(e,t,i){i||(i="external"),this.build=function(){return t},this.dispose=function(){
t&&("singleton"===i&&n(t),t=null)}}function n(e){"function"==typeof e.dispose&&e.dispose();
}function i(e){for(var t in e)if(r.call(e,t))return!1;return!0}var r=Object.prototype.hasOwnProperty;
return function(){function n(e,t){if(!e)throw new Error("Argument 'type' is required.");
if("string"!=typeof e)throw new Error("Argument 'type' must be a string.");var n=s[e];
if(!t&&(!n||i(n)))throw new Error("There are no registrations for type '"+e+"'.");
return n}function r(e,t,i){var r,o=n(e,i);if(o&&(r=o[t||""],!r&&!i))throw new Error("There is no registration for type '"+e+"'"+(t?" and name '"+t+"'":"")+".");
return r}function o(e,t,n,i,o){"string"!=typeof t&&(n=t,t="");var a=r(e,t,o);return n?i=!0:i||(n={}),
a?a.build(n,i):null}function a(e,t){var i=n(e,t),r=[];for(var o in i)r.push(i[o].build({},!1));
return r}this.register=function(n,i,r,o){if(!n)throw new Error("Argument 'type' is required.");
if("string"!=typeof n)throw new Error("Argument 'type' must be a string.");if(null!=i&&("string"!=typeof i?(o=r,
r=i,i=null):i||(i=null)),!r)throw new Error("Argument 'what' is required.");var a;
switch(typeof r){case"function":a=new e(this,r,o);break;case"object":a=new t(this,r,o);
break;default:throw new Error("Argument 'what' is of an invalid type.")}i||(i="");
var u=s[n]||(s[n]={}),c=u[i];c&&c.dispose(),u[i]=a},this.has=function(e,t){return!!r(e,t,!0);
},this.canNew=function(t,n){return r(t,n,!1)instanceof e},this.get=function(e,t){
return o(e,t,null,!1,!1)},this.tryGet=function(e,t){return o(e,t,null,!1,!0)},this.getNew=function(e,t,n){
return o(e,t,n,!0,!1)},this.tryGetNew=function(e,t,n){return o(e,t,n,!0,!0)},this.getAll=function(e){
return a(e,!1)},this.tryGetAll=function(e){return a(e,!0)},this.listType=function(e){
return n(e,!1)},this.tryListType=function(e){return n(e,!0)},this.dispose=function(){
if(s){for(var e in s){var t=s[e];for(var n in t)t[n].dispose()}s=null}};var s={}};
}),define("cdf/dashboard/Dashboard.addIns",["./Dashboard","./Container","./Utils"],function(e,t,n){
function i(e,t){return-1!==e.indexOf("Component",e.length-"Component".length)&&(e=e.substring(0,e.length-"Component".length)),
e=e.charAt(0).toUpperCase()+e.substring(1),t&&(e+="."+t),e}var r=new t;e.registerGlobalAddIn=function(e,t,n){
var e=i(e,t),o=n.getName?n.getName():null;r.register(e,o,n)},e.implement({addIns:void 0,
_initAddIns:function(){this.addIns=n.clone(r)},registerGlobalAddIn:function(t,n,i){
e.registerGlobalAddIn(t,n,i)},registerAddIn:function(e,t,n){var e=i(e,t),r=n.getName?n.getName():null;
this.addIns.register(e,r,n)},hasAddIn:function(e,t,n){var e=i(e,t);return Boolean(this.addIns&&this.addIns.has(e,n));
},getAddIn:function(e,t,n){var e=i(e,t);try{var r=this.addIns.get(e,n);return r}catch(o){
return null}},setAddInDefaults:function(e,t,n,i){var r=this.getAddIn(e,t,n);r&&r.setDefaults(i);
},listAddIns:function(e,t){var e=i(e,t);try{return this.addIns.listType(e)}catch(n){
return[]}}})}),define("cdf/dashboard/Dashboard.bookmarkable",["./Dashboard","../Logger","./Utils","../lib/jquery"],function(e,t,n,i){
e.implement({_initBookmarkables:function(){this.bookmarkables={}},getHashValue:function(e){
var t,n=window.location.hash;try{t=JSON.parse(n.slice(1))}catch(i){t={}}return 0===arguments.length?t:t[e];
},setHashValue:function(e,t){var n;1==arguments.length?n=e:(n=this.getHashValue(),
n[e]=t);var i=JSON.stringify(n);"{}"!=i?window.location.hash=i:window.location.hash&&(window.location.hash="");
},deleteHashValue:function(e){if(0===arguments.length)window.location.hash="";else{
var t=this.getHashValue();delete t[e],this.setHashValue(t)}},setBookmarkable:function(e,t){
1===arguments.length?this.bookmarkables[e]=!0:this.bookmarkables[e]=t},isBookmarkable:function(e){
return Boolean(this.bookmarkables[e])},generateBookmarkState:function(){var e={},t=this.bookmarkables;
for(var n in t)t.hasOwnProperty(n)&&t[n]&&(e[n]=this.getParameterValue(n));return e;
},persistBookmarkables:function(e){this.bookmarkables[e]&&this.finishedInit&&this.setBookmarkState({
impl:"client",params:this.generateBookmarkState()})},setBookmarkState:function(e){
if(window.history&&window.history.replaceState){var t,r=window.location.pathname.split("/").pop(),o=window.location.search.slice(1).split("&").map(function(e){
var t=e.split("=");return t[1]=decodeURIComponent(t[1]),t});o=n.propertiesArrayToObject(o),
o.bookmarkState=JSON.stringify(e),t=r+"?"+i.param(o),window.history.replaceState({},"",t),
this.deleteHashValue("bookmark")}else this.setHashValue("bookmark",e)},getBookmarkState:function(){
if(window.location.hash.length>1)try{return this.getHashValue("bookmark")||{}}catch(e){}
var t=window.location.search.slice(1).split("&").map(function(e){var t=e.split("=");
return t[1]=decodeURIComponent(t[1]),t}),i=n.propertiesArrayToObject(t);return i.bookmarkState?JSON.parse(decodeURIComponent(i.bookmarkState.replace(/\+/g," ")))||{}:{};
},restoreBookmarkables:function(){var e;try{e=this.getBookmarkState().params;for(var n in e)e.hasOwnProperty(n)&&this.setParameter(n,e[n]);
}catch(i){t.log(i,"error")}}})}),define("cdf/dashboard/Dashboard.components",["./Dashboard","amd!../lib/backbone","../lib/mustache","../Logger","../lib/jquery"],function(e,t,n,i,r){
e.implement({components:[],_initComponents:function(){this.components=[]},getComponent:function(e){
if(!e||"string"!=typeof e)return void i.warn("getComponent: invalid component name");
for(var t in this.components)if(this.components[t].name===e)return this.components[t];
},getComp:function(e){return this.getComponent(e)},getComponentByName:function(e){
return this.getComponent(e)},addComponents:function(e){return r.isArray(e)?void e.forEach(function(e){
this.addComponent(e)},this):void i.warn("addComponents: components in a structure other than an array will not be added");
},addComponent:function(e,t){if(!e||!e.name)throw i.error("addComponent: invalid component"),
new Error("addComponent: invalid component");var n=this.getComponentByName(e.name);
if(n){if(n!==e)throw i.error("addComponent: duplicate component name '"+e.name+"'"),
new Error("addComponent: duplicate component name '"+e.name+"'");return this}this._bindControl(e);
var r=t&&t.index,o=this.components.length;return null==r||0>r||r>=o?this.components.push(e):this.components.splice(r,0,e),
this},getComponentIndex:function(e){if(null!=e)switch(typeof e){case"string":for(var t=0,n=this.components,i=n.length;i>t;t++)if(n[t].name===e)return t;
break;case"number":if(e>=0&&e<this.components.length)return e;break;default:return this.components.indexOf(e);
}return-1},removeComponent:function(e){var t=this.getComponentIndex(e);if(-1===t)return void i.warn("removeComponent: component not found");
var n=this.components[t];return this.components.splice(t,1),n.dashboard=null,n.off("cdf:postExecution"),
n.off("cdf:preExecution"),n.off("cdf:error"),n.off("all"),n},_bindControl:function(e){
return e.dashboard||(e.dashboard=this,this._addLogLifecycleToControl(e)),e},_bindExistingControl:function(e){
return e.dashboard||(e.dashboard=this,delete e.initInstance,"function"==typeof e.off&&e.off("all"),
e.on||r.extend(e,t.Events),this._addLogLifecycleToControl(e),(null==e.priority||""===e.priority)&&(e.priority=this.legacyPriority++)),
e},_castControlToClass:function(e,t){if(!(e instanceof t)){var n=this._makeInstance(t);
r.extend(e,n)}},_getControlClass:function(e){var t=e.type;"function"==typeof t&&(t=t.call(e));
for(var n=t.substring(0,1).toUpperCase()+t.substring(1),i=[n+"Component",t,n],r=0,o=i.length;o>r;r++){
var a=window[i[r]];if(a&&"function"==typeof a)return a}},_makeInstance:function(e,t){
var n=Object.create(e.prototype);return t?e.apply(n,t):e.apply(n),n},_castControlToComponent:function(e,t){
if(!(e instanceof BaseComponent||t&&t.prototype instanceof BaseComponent)){var n=BaseComponent.prototype;
for(var i in n)if(n.hasOwnProperty(i)&&void 0===e[i]&&"function"==typeof n[i])switch(i){
case"base":break;default:e[i]=n[i]}}},_addLogLifecycleToControl:function(e){e.on("all",function(e){
var t=this.dashboard;if(t&&t.logLifecycle&&"cdf"!==e&&"PostInitMarker"!==this.name&&"undefined"!=typeof console){
var r,o=e.substr(4);switch(o){case"preExecution":r=">Start";break;case"postExecution":
r="<End  ";break;case"error":r="!Error";break;default:r="      "}var a=n.render("Timing: {{elapsedSinceStartDesc}} since start, {{elapsedSinceStartDesc}} since last event",this.splitTimer());
i.log("          [Lifecycle "+r+"] "+this.name+" ["+this.type+"] (P: "+this.priority+" ): "+o+" "+a+" (Running: "+this.dashboard.runningCalls+")","log","color: "+this.getLogColor());
}})}})}),define("cdf/dashboard/Dashboard.i18n",["../Logger","./Dashboard","./Dashboard.ext","../lib/moment","../lib/CCC/cdo","../lib/cdf.jquery.i18n"],function(e,t,n,i,r,o){
t.implement({i18nSupport:void 0,i18nCurrentLanguageCode:void 0,_initI18n:function(){
var t=this;t.i18nCurrentLanguageCode=void 0,t.i18nSupport={prop:function(t){return e.warn("i18n support wasn't properly initiated. Is the file messages_supported_languages.properties present?"),
t}};var a=function(e){if(e){var t=e.split("-");return t.length>1?t.join("_"):e}},s=a(SESSION_LOCALE);
o.i18n.properties({name:"messages",path:n.getStaticResource("resources/languages/"),
mode:"map",language:s,callback:function(){o.i18n.properties({path:t.getMessagesPath(),
name:"messages",mode:"map",type:"GET",language:s,callback:function(){t.setI18nSupport(s,o.i18n);
}})}});var u=r.format.language(s);r.format.language(u),i.locale(s)},setI18nSupport:function(e,t){
this.i18nCurrentLanguageCode=e,o.extend(this.i18nSupport,t)},getMessagesPath:function(){}
})}),define("cdf/dashboard/Dashboard.legacy",["../queries/CdaQuery.ext","../components/XactionComponent.ext","./Dashboard.ext","./Dashboard","../Logger","../lib/jquery","css!./Dashboard.legacy.css"],function(e,t,n,i,r,o){
i.implement({callPentahoAction:function(e,t,n,i,r,o){var a=this;return"function"==typeof o?a.pentahoAction(t,n,i,r,function(t){
o(a.parseXActionResult(e,t))}):a.parseXActionResult(e,a.pentahoAction(t,n,i,r,o));
},urlAction:function(e,t,n){return this.executeAjax("xml",e,t,n)},executeAjax:function(e,t,n,i){
if("function"==typeof i)return o.ajax({url:t,type:"POST",traditional:!0,dataType:e,
async:!0,data:n,complete:function(e,t){i(e.responseXML)},error:function(e,t,n){r.error("Found error: "+e+" - "+t+", Error: "+n);
}});var a=o.ajax({url:t,type:"POST",dataType:e,async:!1,data:n,error:function(e,t,n){
r.error("Found error: "+e+" - "+t+", Error: "+n)}});return"xml"==e?a.responseXML:a.responseText;
},pentahoAction:function(e,t,n,i,r){return this.pentahoServiceAction("ServiceAction","xml",e,t,n,i,r);
},pentahoServiceAction:function(e,t,i,r,a,s,u){var c=n.getServiceAction(e,i,r,a),d=c.url;
return delete c.url,o.each(s,function(e,t){c[t[0]]=t[1]}),this.executeAjax(t,d,c,u);
},CDF_ERROR_DIV:"cdfErrorDiv",createAndCleanErrorDiv:function(){0==o("#"+this.CDF_ERROR_DIV).length&&o("body").append("<div id='"+this.CDF_ERROR_DIV+"'></div>"),
o("#"+this.CDF_ERROR_DIV).empty()},showErrorTooltip:function(){o(function(){o.tooltip&&o(".cdf_error").tooltip({
delay:0,track:!0,fade:250,showBody:" -- "})})},parseXActionResult:function(e,t){var n=o(t),i=n.find("SOAP-ENV\\:Fault");
if(0==i.length)return n;var r="Error executing component "+e.name,a=new Array;a[0]=" Error details for component execution "+e.name+" -- ",
a[1]=i.find("SOAP-ENV\\:faultstring").find("SOAP-ENV\\:Text:eq(0)").text(),i.find("SOAP-ENV\\:Detail").find("message").each(function(){
a.push(o(this).text())}),a.length>8&&(a=a.slice(0,7),a.push("..."));var s="<table class='errorMessageTable' border='0'><tr><td class='errorIcon'></td><td><span class='cdf_error' title=\""+a.join("<br/>").replace(/"/g,"'")+'" >'+r+" </span></td></tr></table>";
return 0==e.visible?o("#"+this.CDF_ERROR_DIV).append("<br />"+s):o("#"+e.htmlObject).html(s),
null},setSettingsValue:function(e,t){var i={method:"set",key:e,value:JSON.stringify(t)
};o.post(n.getSettings("set",null),i,function(){})},getSettingsValue:function(e,t){
o.ajax({type:"GET",dataType:"json",url:n.getSettings("get",e),data:args,async:!0,
xhrFields:{withCredentials:!0}}).done("function"==typeof t?t:function(e){t=e})},fetchData:function(n,i,a){
if(r.warn("Dashboard fetchData() is deprecated. Use Query objects instead"),void 0!=n&&void 0!=n.dataAccessId){
for(var s in i)n["param"+i[s][0]]=this.getParameterValue(i[s][1]);o.post(e.getDoQuery(),n,function(e){
a(e)},"json").error(this.handleServerError)}else if(void 0!=n){var u="cda"==n.queryType?"jtable-cda.xaction":"jtable.xaction";
o.post(t.getCdfXaction("pentaho-cdf/actions",u),n,function(e){a(e.values)},"json");
}else a([])}})}),define("cdf/dashboard/Dashboard.lifecycle",["./Dashboard","../Logger","amd!../lib/underscore","../components/UnmanagedComponent","../lib/jquery"],function(e,t,n,i,r){
e.implement({initCounter:void 0,runningCalls:void 0,lastServerResponse:void 0,serverCheckResponseTimeout:void 0,
_initLifecycle:function(){this.initCounter=0,this.runningCalls=0,this.lastServerResponse=Date.now?Date.now():(new Date).getTime(),
this.serverCheckResponseTimeout=1/0},resetRunningCalls:function(){this.runningCalls=0,
setTimeout(n.bind(function(){this.hideProgressIndicator()},this),10)},getRunningCalls:function(){
return this.runningCalls},incrementRunningCalls:function(){this.runningCalls++,this.showProgressIndicator(),
t.log("+Running calls incremented to: "+this.getRunningCalls())},decrementRunningCalls:function(){
this.runningCalls--,t.log("-Running calls decremented to: "+this.getRunningCalls()),
setTimeout(n.bind(function(){this.runningCalls<=0&&(this.hideProgressIndicator(),
this.runningCalls=0)},this),10)},init:function(e){var i=this,o=i.initCounter++;t.log("InitInstance "+o),
0==o&&(i.syncDebugLevel(),i.initialStorage?n.extend(i.storage,i.initialStorage):i.loadStorage(),
null!=i.context&&null!=i.context.sessionTimeout&&(i.serverCheckResponseTimeout=900*i.context.sessionTimeout),
i.restoreBookmarkables(),i.restoreView(),i.syncParametersInit()),n.isArray(e)&&i.addComponents(e),
n.chain(i.components).filter(function(e){return"undefined"==typeof e.initInstance;
}).each(function(e){e.initInstance=o}),r(function(){i._initEngine(o)})},_initEngine:function(e){
var o=this;o.waitingForInit&&o.waitingForInit.length&&t.log("Overlapping initEngine!","warn");
var a=null!=e?n.where(o.components,{initInstance:e}):o.components;o.waitingForInit&&0!==o.waitingForInit.length||o.finishedInit||o.incrementRunningCalls(),
t.log("          [Lifecycle >Start] Init["+e+"] (Running: "+o.getRunningCalls()+")","log","color: #ddd"),
o.createAndCleanErrorDiv(),"function"==typeof o.preInit&&o.preInit(),o.trigger("cdf cdf:preInit",o),
r(window).trigger("cdfAboutToLoad");var s,o=o,u=[];for(s=0;s<a.length;s++)a[s].executeAtStart&&u.push(a[s]);
if(!u.length)return void o._handlePostInit();if(!o.getComponent("PostInitMarker")){
var c=new i({name:"PostInitMarker",type:"unmanaged",lifecycle:{silent:!0},executeAtStart:!0,
priority:999999999});o.addComponent(c),u.push(c)}o.waitingForInit=u.slice();for(var d=function(t,i){
2==arguments.length&&i||(o.waitingForInit=n(o.waitingForInit).without(t),t.off("cdf:postExecution",d),
t.off("cdf:preExecution",d),t.off("cdf:error",d),o._handlePostInit(e))},s=0,l=u.length;l>s;s++){
var h=u[s];h.on("cdf:postExecution cdf:preExecution cdf:error",d,o)}o.updateAll(u),
a.length>0&&o._handlePostInit(e)},_handlePostInit:function(e){var i=this,o=function(){
var e=n.filter(i.components,function(e){return"duplicate"==e.type}),t={},o=i.getBookmarkState().params||{};
n.map(n.filter(Object.keys(o),function(e){return/(_[0-9]+)+$/.test(e)}),function(e){
var n=e.match(/(.*?)((_[0-9]+)+)$/),i=n[1],r=n[2];return t[r]||(t[r]={}),t[r][i]=o[e],
e});for(var a in t)if(t.hasOwnProperty(a)){var o=t[a];r.each(e,function(e,t){var n;
for(n=0;n<t.parameters.length;n++)if(!o.hasOwnProperty(t.parameters[n])&&i.isBookmarkable(t.parameters[n]))return;
t.duplicate(o)})}};i.waitingForInit&&0!==i.waitingForInit.length||i.finishedInit||(i.trigger("cdf cdf:postInit",i),
r(window).trigger("cdfLoaded"),"function"==typeof i.postInit&&i.postInit(),o(),i.finishedInit=!0,
i.decrementRunningCalls(),t.log("          [Lifecycle <End  ] Init["+e+"] (Running: "+i.getRunningCalls()+")","log","color: #ddd"));
},updateLifecycle:function(e){var i=e.lifecycle?!!e.lifecycle.silent:!1;if(!e.disabled){
i||this.incrementRunningCalls();var o=n.bind(function(){try{var n;if("undefined"!=typeof e.preExecution&&(n=e.preExecution.apply(e)),
n="undefined"!=typeof n?!!n:!0,e.trigger("cdf cdf:preExecution",e,n),!n)return;void 0!=e.tooltip&&(e._tooltip="function"==typeof e.tooltip?e.tooltip():e.tooltip),
void 0!=e.update&&"function"==typeof e.update&&(e.update(),this.refreshEngine.processComponent(e)),
"undefined"!=typeof e.postExecution&&e.postExecution.apply(e),void 0!=e._tooltip&&r("#"+e.htmlObject).attr("title",e._tooltip).tooltip({
delay:0,track:!0,fade:250})}catch(o){var a=e.htmlObject?r("#"+e.htmlObject):void 0,s=this.getErrorObj("COMPONENT_ERROR").msg+" ("+e.name.replace("render_","")+")";
this.errorNotification({msg:s},a),t.error("Error updating "+e.name+":"),t.exception(o);
}finally{i||this.decrementRunningCalls()}e.trigger("cdf cdf:postExecution",e)},this);
setTimeout(o,1)}},updateAll:function(e){var t=function(e,t){if(t)for(var i in t)t.hasOwnProperty(i)&&(n.isArray(e[i])?e[i]=n.union(e[i],t[i]):e[i]=t[i]);
};if(this.updating||(this.updating={tiers:{},current:null}),e&&n.isArray(e)&&!n.isArray(e[0])){
var i={};n.each(e,function(e){if(e){var t=e.priority||0;i[t]||(i[t]=[]),i[t].push(e);
}}),e=i}t(this.updating.tiers,e);var r=this.updating.current,o=!1;if(null===r||0==r.components.length||(o=this.othersAwaitExecution(n.clone(this.updating.tiers),this.updating.current))){
var a=this.getFirstTier(this.updating.tiers);if(!a)return;if(o){var s=this.updating.tiers;
s[r.priority]=n.difference(s[r.priority],r.components),a.components=n.union(s[r.priority],this.getFirstTier(s).components);
}this.updating.current=a;for(var u=function(e,t){if(2!=arguments.length||"boolean"!=typeof t||!t){
e.off("cdf:postExecution",u),e.off("cdf:preExecution",u),e.off("cdf:error",u);var i=this.updating.current;
i.components=n.without(i.components,e);var r=this.updating.tiers;r[i.priority]=n.without(r[i.priority],e),
this.updateAll()}},i=this.updating.current.components.slice(),c=0;c<i.length;c++){
var d=i[c];d.startTimer(),d.on("cdf:postExecution cdf:preExecution cdf:error",u,this),
this.updateComponent(d)}}},update:function(e){this.updateQueue||(this.updateQueue=[]),
this.updateQueue.push(e),this.updateTimeout&&clearTimeout(this.updateTimeout);var t=n.bind(function(){
this.updateAll(this.updateQueue),delete this.updateQueue},this);this.updateTimeout=setTimeout(t,5);
},updateComponent:function(e){if((Date.now?Date.now():(new Date).getTime())-this.lastServerResponse>this.serverCheckResponseTimeout&&!this.checkServer())throw this.hideProgressIndicator(),
this.loginAlert(),"not logged in";e.isManaged===!1&&e.update?(e.update(),this.refreshEngine.processComponent(e)):this.updateLifecycle(e);
},getFirstTier:function(e){for(var t,i=n.keys(e).sort(function(e,t){return parseInt(e,10)-parseInt(t,10);
}),r=0;r<i.length;r++)if(t=e[i[r]],t.length>0)return{priority:i[r],components:t.slice()
};return null},resetAll:function(){this.createAndCleanErrorDiv();for(var e=(this.components.length,
0),t=this.components.length;t>e;e++)this.components[e].clear();for(var e=(this.components.length,
0),t=this.components.length;t>e;e++)this.components[e].executeAtStart&&this.update(this.components[e]);
},processChange:function(e){var t,n=this.getComponentByName(e),i=n.parameter;if("function"==typeof n.getValue&&(t=n.getValue()),
null!=t){if("undefined"!=typeof n.preChange){var r=n.preChange(t);t=void 0!=r?r:t;
}i&&this.fireChange(i,t),"undefined"!=typeof n.postChange&&n.postChange(t)}},fireChange:function(e,t){
var i=this;i.createAndCleanErrorDiv(),i.setParameter(e,t,!0),i.trigger("cdf "+e+":fireChange",{
parameter:e,value:t});for(var r=[],o=0,a=i.components.length;a>o;o++)if(n.isArray(i.components[o].listeners))for(var s=0;s<i.components[o].listeners.length;s++){
var u=i.components[o];if(u.listeners[s]==e&&!u.disabled){r.push(u);break}}i.updateAll(r);
},othersAwaitExecution:function(e,t){if(!e||!t||!t.components)return!1;e[t.priority]=n.difference(e[t.priority],t.components);
var i=this.getFirstTier(e);return i&&i.components&&0!=i.components.length?parseInt(i.priority)>parseInt(t.priority)?!1:!0:!1;
}})}),define("cdf/dashboard/Popups",["../lib/mustache","amd!../lib/underscore","../lib/jquery","amd!../lib/jquery.blockUI","css!./Popups.css"],function(e,t,n){
return{okPopup:{_firstRender:!0,template:"<div class='cdfPopup'>  <div class='cdfPopupHeader'>{{{header}}}</div>  <div class='cdfPopupBody'>    <div class='cdfPopupDesc'>{{{desc}}}</div>    <div class='cdfPopupButton'>{{{button}}}</div>  </div></div>",
defaults:{header:"Title",desc:"Description Text",button:"Button Text",callback:function(){
return!0}},$el:void 0,show:function(e){(e||this._firstRender)&&this.render(e),this.$el.show();
},hide:function(){this.$el.hide()},render:function(i){var r=t.extend({},this.defaults,i),o=this;
this._firstRender&&(this.$el=n("<div/>").addClass("cdfPopupContainer").hide().appendTo("body"),
this._firstRender=!1),this.$el.empty().html(e.render(this.template,r)),this.$el.find(".cdfPopupButton").click(function(){
r.callback(),o.hide()})}},notificationsComponent:{template:"<div class='cdfNotification component {{#isSmallComponent}}small{{/isSmallComponent}}'>  <div class='cdfNotificationBody'>    <div class='cdfNotificationImg'>&nbsp;</div>    <div class='cdfNotificationTitle' title='{{title}}'>{{{title}}}</div>    <div class='cdfNotificationDesc' title='{{desc}}'>{{{desc}}}</div>  </div></div>",
defaults:{title:"Component Error",desc:"Error processing component."},render:function(i,r){
var o=t.extend({},this.defaults,r);o.isSmallComponent=n(i).width()<300,n(i).empty().html(e.render(this.template,o));
var a=n(i).find(".cdfNotification");a.css({"line-height":a.height()+"px"})}},notificationsGrowl:{
_firstRender:!0,template:"<div class='cdfNotification growl'>  <div class='cdfNotificationBody'>    <h1 class='cdfNotificationTitle' title='{{title}}'>{{{title}}}</h1>    <h2 class='cdfNotificationDesc' title='{{desc}}'>{{{desc}}}</h2>  </div></div>",
defaults:{title:"Title",desc:"Default CDF notification.",timeout:4e3,onUnblock:function(){
return!0},css:n.extend({},n.blockUI.defaults.growlCSS,{position:"absolute",width:"100%",
top:"10px"}),showOverlay:!1,fadeIn:700,fadeOut:1e3,centerY:!1},render:function(i){
var r=t.extend({},this.defaults,i),o=n(e.render(this.template,r)),a=this;r.message=o;
var s=r.onUnblock;r.onUnblock=function(){a.$el.hide(),s.call(this)},this._firstRender&&(this.$el=n("<div/>").addClass("cdfNotificationContainer").hide().appendTo("body"),
this._firstRender=!1),this.$el.show().block(r)}}}}),define("cdf/dashboard/Dashboard.notifications",["./Dashboard","./Dashboard.notifications.ext","./Popups","../Logger","amd!../lib/underscore","../lib/jquery","amd!../lib/jquery.blockUI","css!./Dashboard.notifications.css"],function(e,t,n,i,r,o){
e.implement({ERROR_CODES:{QUERY_TIMEOUT:{msg:"Query timeout reached"},COMPONENT_ERROR:{
msg:"Error processing component"}},_initNotifications:function(){},blockUiOptions:void 0,
_setBlockUiOptions:function(e){if("function"==typeof o.blockUI){this.blockUiOptions=o.extend({},o.blockUI.defaults);
for(var t in e)this.blockUiOptions[t]=e[t]}},blockUIwithDrag:function(){"undefined"!=typeof this.i18nSupport&&null!=this.i18nSupport&&(o.blockUI.defaults.message='<div class="img blockUIDefaultImg" style="padding: 0px;"></div>'),
o.blockUI(this.blockUiOptions);var e=o('<div id="blockUIDragHandle"></div>');o("div.blockUI.blockMsg").prepend(e),
o("div.blockUI.blockMsg").draggable({handle:"#blockUIDragHandle"})},showProgressIndicator:function(){
o.blockUI&&this.blockUIwithDrag()},hideProgressIndicator:function(e){e&&this.resetRunningCalls(),
o.unblockUI&&o.unblockUI(),this.showErrorTooltip()},getErrorObj:function(e){return this.ERROR_CODES[e]||{};
},parseServerError:function(e,t,n){var i=[{match:/Query timeout/,msg:this.getErrorObj("QUERY_TIMEOUT").msg
}],a={msg:this.getErrorObj("COMPONENT_ERROR").msg,error:n,errorStatus:t},s=o("<div/>").html(e.responseText).find("h1").text();
return r.find(i,function(e){return s.match(e.match)?(a.msg=e.msg,!0):!1}),a},handleServerError:function(){
this.errorNotification(this.parseServerError.apply(this,arguments)),this.trigger("cdf cdf:serverError",this),
this.resetRunningCalls()},errorNotification:function(e,t){t?n.notificationsComponent.render(o(t),{
title:e.msg,desc:""}):n.notificationsGrowl.render({title:e.msg,desc:""})},loginAlert:function(e){
var t={header:"Warning",desc:"You are no longer logged in or the connection to the server timed out",
button:"Click to reload this page",callback:function(){window.location.reload(!0);
}};t=r.extend({},t,e),n.okPopup.show(t),this.trigger("cdf cdf:loginError",this)},
checkServer:function(){o.ajax({type:"POST",async:!1,dataType:"json",url:t.getPing(),
success:function(e){return e&&"ok"==e.ping},error:function(){return!1}})}})}),define("cdf/dashboard/Dashboard.parameters",["./Dashboard","../Logger","amd!../lib/backbone","./Utf8Encoder"],function(e,t,n,i){
e.implement({parameters:void 0,parameterModel:void 0,chains:void 0,syncedParameters:void 0,
escapeParameterValues:!1,flatParameters:!1,LEGACY_STORAGE:"Dashboards.storage.",STORAGE:"storage.",
_initParameters:function(){this.parameters=[],this.parameterModel=new n.Model,this.chains=[],
this.syncedParameters={},this.escapeParameterValues=!1},_isParameterInModel:function(e,t){
return void 0!==this._getValueFromContext(e,t)},_getValueFromContext:function(e,t){
if(e){if(this.flatParameters)return e[t];if(null!=t){var n,i;if(t instanceof Array)n=t;else{
if(t.indexOf(".")<0)return e[t];n=t.split(".")}i=n.length;for(var r=0;i>r;r++){if(!e)return;
var o=n[r],a=e[o];if(void 0===a)return;e=a}}return e}},_setValueInContext:function(e,t,n){
if(e&&null!=t&&void 0!==n){if(this.flatParameters)e[t]=n;else{var i,r;if(t instanceof Array)i=t,
r=i.pop();else{if(t.indexOf(".")<0)return e[t]=n,e;i=t.split("."),r=i.pop()}e=this._getValueFromContext(e,i),
e&&(e[r]=n)}return e}},_getParameterStore:function(e){var n;return 0==e.indexOf(this.LEGACY_STORAGE)?(t.warn("Legacy storage access for "+e+". Please use storage instead"),
e=e.substr(this.LEGACY_STORAGE.length),n=this.storage):0==e.indexOf(this.STORAGE)?(e=e.substr(this.STORAGE.length),
n=this.storage):n=this.parameters,{store:n,name:e}},addParameter:function(e,n){if(void 0==e||"undefined"==e)return void t.warn("Dashboard addParameter: trying to add undefined!!");
var i=this._getParameterStore(e);return this._isParameterInModel(i.store,i.name)&&(n=this.getParameterValue(i.name)),
this.setParameter(e,n),n},getParameterValue:function(e){if(void 0==e||"undefined"==e)return void t.warn("Dashboard.getParameterValue: trying to get undefined!!");
var n=this._getParameterStore(e);return this._getValueFromContext(n.store,n.name);
},getParam:function(e){return this.getParameterValue(e)},setParameter:function(e,n,r){
if(void 0==e||"undefined"==e)return void t.warn("Dashboard.setParameter: trying to set undefined!!");
var o=this._getParameterStore(e);this.escapeParameterValues?this._setValueInContext(o.store,o.name,i.encode_prepare_arr(n)):this._setValueInContext(o.store,o.name,n),
void 0!==this._setValueInContext(o.store,o.name,n)&&(this.parameterModel.set(o.name,n,{
notify:r}),this.persistBookmarkables(o.name))},setParam:function(e,t,n){this.setParameter(e,t,n);
},syncParameters:function(e,t){this.setParameter(t,this.getParameterValue(e)),this.parameterModel.on("change:"+e,function(e,n,i){
this[i.notify?"fireChange":"setParameter"](t,n)},this),this.parameterModel.on("change:"+t,function(t,n,i){
this[i.notify?"fireChange":"setParameter"](e,n)},this)},syncParametersOnInit:function(e,t){
var n,i,r,o,a=this.syncedParameters;a[e]||(a[e]=[]),a[e].push(t);for(var s=0;s<this.chains.length;s++)n=this.chains[s],
n.indexOf(e)>-1&&(i=n),n.indexOf(t)>-1&&(r=n,o=s);if(r&&i){if(i!=r){var u=r.slice();
u.unshift(0),u.unshift(i.length),[].splice.apply(i,u),this.chains.splice(o,1)}}else r?r.unshift(e):i?i.push(t):this.chains.push([e,t]);
},syncParametersInit:function(){var e,t,n,i,r,o=this.syncedParameters;for(n=0;n<this.chains.length;n++)for(i=0;i<this.chains[n].length;i++)if(e=this.chains[n][i],
o[e])for(r=0;r<o[e].length;r++)t=o[e][r],this.syncParameters(e,t)}})}),define("cdf/dashboard/Dashboard.storage",["./Dashboard","../Logger","../lib/jquery","./Dashboard.storage.ext"],function(e,t,n,i){
e.implement({storage:void 0,initialStorage:void 0,_initStorage:function(){this.storage||(this.storage={},
n.extend(this.storage,this.storageObj)),this.initialStorage=this.storage},loadStorage:function(){
var e=this;if(!this.context||"anonymousUser"!==this.context.user){var t={user:this.context.user,
action:"read",ts:Date.now?Date.now():(new Date).getTime()};n.ajax({type:"GET",dataType:"json",
url:i.getStorage(t.action),data:t,async:!0,xhrFields:{withCredentials:!0},success:function(t){
n.extend(e.storage,t)}})}},saveStorage:function(){if(!this.context||"anonymousUser"!==this.context.user){
var e={user:this.context.user,action:"store",storageValue:JSON.stringify(this.storage),
ts:Date.now?Date.now():(new Date).getTime()};n.ajax({type:"GET",dataType:"json",url:i.getStorage(e.action),
data:e,async:!0,xhrFields:{withCredentials:!0}}).done(function(e){1!=e.result&&t.log("Error saving storage","error");
})}},cleanStorage:function(){if(this.storage={},!this.context||"anonymousUser"!==this.context.user){
var e={user:this.context.user,action:"delete"};n.ajax({type:"GET",dataType:"json",
url:i.getStorage(e.action),data:e,async:!0,xhrFields:{withCredentials:!0}}).done(function(e){
1!=e.result&&t.log("Error deleting storage","error")})}}})}),define("cdf/dashboard/Dashboard.dataSources",["./Dashboard","../Logger","amd!../lib/underscore"],function(e,t,n){
e.implement({dataSources:void 0,_initDataSources:function(){this.dataSources={}},
_getDataSourceName:function(e){var i;return i=n.isObject(e)?e.dataSource:e,n.isString(i)&&!n.isEmpty(i)?i:void t.warn("Invalid data source name");
},addDataSource:function(e,i,r){if(n.isObject(e)&&(r=i,i=e,e=i.name),!n.isObject(i))return void t.error("Invalid data source object");
if(!n.isString(e)||n.isEmpty(e))return void t.error("Invalid data source name");if(this.dataSources[e]){
if(!this.dataSources.hasOwnProperty(e))return void t.error("Data source name '"+e+"' is invalid, overwrites an inherited property");
if(!r)return void t.warn("Data source name '"+e+"' is already defined, set force flag to true to overwrite it");
}var o=n.extend({},i);o.name&&delete o.name,this.dataSources[e]=o},getDataSource:function(e){
var t=this._getDataSourceName(e);return t&&this.dataSources.hasOwnProperty(t)?this.dataSources[t]:void 0;
},getDataSourceQuery:function(e){var i=this.getDataSource(e);return n.isEmpty(i)?void t.error("Invalid data source"):this.getQuery(i);
},setDataSource:function(e,t){n.isObject(e)?this.addDataSource(e,!0):this.addDataSource(e,t,!0);
},removeDataSource:function(e){var n;return(n=this._getDataSourceName(e))?void(n in this.dataSources&&this.dataSources.hasOwnProperty(n)?delete this.dataSources[n]:t.warn("Data source name '"+n+"' not found")):void t.warn("Invalid data source name");
}})}),define("cdf/dashboard/Dashboard.query",["../Logger","../lib/Base","./Dashboard","./Container","amd!../lib/underscore","./Utils"],function(e,t,n,i,r,o){
var a=t,s=new i;return n.implement({queryFactories:void 0,_initQuery:function(){this.queryFactories=o.clone(s);
},getBaseQuery:function(){return a},registerQuery:function(e,t){var n=this.getBaseQuery();
if(!r.isFunction(t)&&r.isObject(t)){var i={};r.each(n.prototype.deepProperties,function(e){
i[e]=r.extend({},n.prototype[e],t[e])})}var o=r.isFunction(t)&&t||r.isObject(t)&&n.extend(r.extend({},t,i));
this.queryFactories.register("Query",e,function(e,t){return new o(t)})},hasQuery:function(e){
return Boolean(this.queryFactories&&this.queryFactories.has("Query",e))},detectQueryType:function(t){
if(t){if(r.isString(t.dataSource)&&!r.isEmpty(t.dataSource)){var n=this.getDataSource(t.dataSource);
if(r.isUndefined(n))return void e.error("Invalid data source name '"+t.dataSource+"'");
t=n}var i=t.queryType?t.queryType:t.query?"legacy":t.path&&t.dataAccessId?"cda":void 0;
return t.queryType=i,this.hasQuery(i)?i:void 0}},getQuery:function(t,n){if(r.isUndefined(t)?t="cda":r.isObject(t)&&(n=t,
t=void 0),r.isString(n.dataSource)&&!r.isEmpty(n.dataSource)){var i=this.getDataSource(n.dataSource);
if(r.isUndefined(i))return void e.error("Invalid data source name '"+n.dataSource+"'");
n=r.extend({},i,n),delete n.dataSource}t=t||n.queryType||"cda";var o=this.queryFactories.getNew("Query",t,n);
return o.dashboard=this,o},isValidQueryDefinition:function(e){return void 0!==this.detectQueryType(e);
},listQueries:function(){return r.keys(this.queryFactories.listType("Query"))}}),
{setBaseQuery:function(e){r.isFunction(e)&&e.extend&&(a=e)},registerGlobalQuery:function(e,t){
var n=a;if(!r.isFunction(t)&&r.isObject(t)){var i={};r.each(n.prototype.deepProperties,function(e){
i[e]=r.extend({},n.prototype[e],t[e])})}var o=r.isFunction(t)&&t||r.isObject(t)&&n.extend(r.extend({},t,i));
s.register("Query",e,function(e,t){return new o(t)})}}}),define("cdf/dashboard/Dashboard.views",["./Dashboard","../lib/base64","./Dashboard.views.ext","../lib/jquery"],function(e,t,n,i){
e.implement({viewParameters:void 0,view:void 0,viewFlags:{UNUSED:"unused",UNBOUND:"unbound",
VIEW:"view"},_initViews:function(){this.viewParameters={},!this.view&&this.viewObj&&(this.view={},
i.extend(this.view,this.viewObj))},restoreView:function(){var e,n;if(this.view&&this.view.params&&(n=JSON.parse(t.decode(this.view.params))))if(i.isEmptyObject(n))this.view.params=n;else for(e in n)n.hasOwnProperty(e)&&this.setParameter(e,n[e]);
},setParameterViewMode:function(e,t){1===arguments.length?this.viewParameters[e]=this.viewFlags.VIEW:this.viewParameters[e]=t;
},isViewParameter:function(e){return this.viewParameters[e]},getViewParameters:function(){
var e=this.viewParameters,t={};for(var n in e)e.hasOwnProperty(n)&&(e[n]==this.viewFlags.VIEW||e[n]==this.viewFlags.UNBOUND)&&(t[n]=this.getParameterValue(n));
return t},getUnboundParameters:function(){var e=this.viewParameters,t=[];for(var n in e)if(e.hasOwnProperty(n))return e[n]==this.viewFlags.UNBOUND&&t.push(n),
t}})}),define("cdf/dashboard/OptionsManager",["./Utils","amd!../lib/underscore","../lib/jquery"],function(e,t,n){
function i(e,t,n,i){return e&&e[t]&&e[t].hasOwnProperty(n)?e[t][n]:i||void 0}function r(e,t,n,i){
e&&t&&n&&(e[t]=e[t]||{},e[t][n]=i)}return function(o){function a(e,t){t=t||{},l(e,t.reader),
h(e,t.writer),f(e,t.validator)}function s(e){return i(g._interfaces,e,"reader",g._libraries.mappers.identity);
}function u(e){return i(g._interfaces,e,"writer",g._libraries.mappers.identity)}function c(e){
return i(g._interfaces,e,"validator",g._libraries.predicates.tautology)}function d(e){
return i(g._options,e,"value")}function l(e,n){var i=g._libraries.mappers;return n=t.isFunction(n)&&n||t.isString(n)&&i[n]||s(e)||i.identity,
r(g._interfaces,e,"reader",n)}function h(e,n){var i=g._libraries.mappers;return n=t.isFunction(n)&&n||t.isString(n)&&i[n]||u(e)||i.identity,
r(g._interfaces,e,"writer",n)}function f(e,n){var i=g._libraries.predicates;return n=t.isFunction(n)&&n||t.isString(n)&&i[n]||c(e)||i.tautology,
r(g._interfaces,e,"validator",n)}function p(e,t){return r(g._options,e,"value",t);
}var g=this;this._options={},this._interfaces={},this._libraries={predicates:{tautology:function(e){
return!0},isFunction:t.isFunction,isPositive:function(e){return t.isNumber(e)&&e>0;
},isObjectOrPropertiesArray:function(e){return t.isArray(e)||t.isObject(e)},isObject:t.isObject,
isArray:t.isArray},mappers:{identity:t.identity,propertiesObject:function(n){return t.isArray(n)?e.propertiesArrayToObject(n):n;
}}},this.mixin=function(e){e.getOption=this.getOption,e.setOption=this.setOption},
this.init=function(e,i,r){e=n.extend(!0,{},e),i=n.extend(!0,{},i),this._libraries=n.extend(!0,{},this._libraries,r),
t.each(i,function(e,t){a(t,e)}),t.each(e,function(e,t){var n=i&&i[t]||{};a(t,n),p(t,e);
})},this.setOption=function(e,t,n){a(e,n);var i=s(e),r=c(e);if(r(t))return t=i(t),
p(e,t),!0;throw new Error("Invalid Option "+e.charAt(0).toUpperCase()+e.slice(1));
},this.getOption=function(e){var t=u(e),n=d(e);return t(n)},this.init(o.defaults,o.interfaces,o.libraries);
}}),define("cdf/queries/BaseQuery",["../lib/jquery","../lib/Base","amd!../lib/underscore","../Logger","../dashboard/OptionsManager","../dashboard/Dashboard.query"],function(e,t,n,i,r,o){
var a=t.extend({name:"baseQuery",label:"Base Query",deepProperties:["defaults","interfaces"],
dashboard:void 0,defaults:{successCallback:function(){i.log("Query success callback not defined. Override.");
},errorCallback:function(e,t,n){return this.dashboard&&"function"==typeof this.dashboard.handleServerError?void this.dashboard.handleServerError(e,t,n):void i.log("Query error callback not defined. Override.");
},lastResultSet:null,lastProcessedResultSet:null,page:0,pageSize:0,params:{},ajaxOptions:{
async:!1,type:"POST"},url:""},interfaces:{params:{reader:"propertiesObject",validator:"isObjectOrPropertiesArray"
},successCallback:{validator:"isFunction"},errorCallback:{validator:"isFunction"},
pageSize:{validator:"isPositive"}},constructor:function(e){this._optionsManager=new r(this),
this._optionsManager.mixin(this),this.init(e)},getOption:function(e){return this.defaults[e];
},setOption:function(e,t){this.defaults[e]=t},init:function(e){},buildQueryDefinition:function(e){},
getSuccessHandler:function(t){var n=this;return function(i){n.setOption("lastResultSet",i);
var r=e.extend(!0,{},n.getOption("lastResultSet"));n.setOption("lastProcessedResultSet",r),
i=t(r),void 0!==i&&i!==r&&n.setOption("lastProcessedResultSet",i)}},getErrorHandler:function(e){
return function(t,n,i){e&&e(t,n,i)}},doQuery:function(t,r){if("function"!=typeof this.getOption("successCallback"))throw"QueryNotInitialized";
var o=n.extend({},this.getOption("ajaxOptions"),{data:this.buildQueryDefinition(),
url:this.getOption("url"),success:this.getSuccessHandler(t?t:this.getOption("successCallback")),
error:this.getErrorHandler(r?r:n.bind(this.getOption("errorCallback"),this))}),a=null==o.async?e.ajaxSettings.async:o.async;
!a&&o.xhrFields&&o.xhrFields.withCredentials&&(i.log("Cross-domain requests are deprecated for synchronous operations."),
delete o.xhrFields.withCredentials),e.ajax(o)},exportData:function(){},setAjaxOptions:function(e){
this.setOption("ajaxOptions",n.extend({},this.getOption("ajaxOptions"),e))},setSortBy:function(e){},
sortBy:function(e,t){},fetchData:function(e,t,i){switch(arguments.length){case 0:
if(this.getOption("params")&&this.getOption("successCallback"))return this.doQuery();
break;case 1:if("function"==typeof arguments[0])return this.doQuery(arguments[0]);
if(!n.isEmpty(arguments[0])&&(n.isObject(arguments[0])||n.isArray(arguments[0])))return this.setOption("params",arguments[0]||{}),
this.doQuery();break;case 2:return"function"==typeof arguments[0]?(this.setOption("successCallback",arguments[0]),
"function"==typeof arguments[1]&&this.setOption("errorCallback",arguments[1]),this.doQuery()):(this.setOption("params",arguments[0]||{}),
this.setOption("successCallback",arguments[1]),this.doQuery());default:return e&&this.setOption("params",e),
"function"==typeof arguments[1]&&this.setOption("successCallback",t),"function"==typeof arguments[2]&&this.setOption("errorCallback",i),
this.doQuery()}throw"InvalidInput"},lastResults:function(){if(null!==this.getOption("lastResultSet"))return e.extend(!0,{},this.getOption("lastResultSet"));
throw"NoCachedResults"},lastProcessedResults:function(){if(null!==this.getOption("lastProcessedResultSet"))return e.extend(!0,{},this.getOption("lastProcessedResultSet"));
throw"NoCachedResults"},reprocessLastResults:function(t){if(null!==this.getOption("lastResultSet")){
var n=e.extend(!0,{},this.getOption("lastResultSet")),i=t||this.getOption("successCallback");
myself.setOption("lastProcessedResultSet",n);var r=i(n);return void 0!==r&&r!==n&&myself.setOption("lastProcessedResultSet",r),
r}throw"NoCachedResults"},reprocessResults:function(e){return this.reprocessLastResults(e);
},setParameters:function(e){this.setOption("params",e)},setCallback:function(e){this.setOption("successCallback",e);
},setErrorCallback:function(e){this.setOption("errorCallback",e)},setSearchPattern:function(e){
this.setOption("searchPattern",e)},nextPage:function(e){var t=this.getOption("page"),n=this.getOption("pageSize");
if(n>0)return t+=n,this.setOption("page",t),this.doQuery(e);throw"InvalidPageSize";
},previousPage:function(e){var t=this.getOption("page"),n=this.getOption("pageSize");
if(t>n)return t-=n,this.setOption("page",t),this.doQuery(e);if(_pageSize>0)return this.setOption("page",0),
this.doQuery(e);throw"AtBeginning"},getPage:function(e,t){var n=this.getOption("page"),i=this.getOption("pageSize");
if(e*i==n)return!1;if("number"==typeof e&&e>=0)return this.setOption("page",e*i),
this.doQuery(t);throw"InvalidPage"},setPageStartingAt:function(e){if(e==this.getOption("page"))return!1;
if(!("number"==typeof e&&e>=0))throw"InvalidPage";this.setOption("page",e)},pageStartingAt:function(e,t){
return this.setPageStartingAt(e)!==!1?this.doQuery(t):!1},setPageSize:function(e){
this.setOption("pageSize",e)},initPage:function(e,t){if(e==this.getOption("pageSize")&&0==this.getOption("page"))return!1;
if("number"==typeof e&&e>0)return this.setOption("page",0),this.setOption("pageSize",e),
this.doQuery(t);throw"InvalidPageSize"}});return o.setBaseQuery(a),a}),define("cdf/queries/CpkQuery",["../dashboard/Dashboard.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../dashboard/Utils","../Logger","../lib/jquery"],function(e,t,n,i,r,o,a){
var s={name:"cpk",label:"CPK Query",defaults:{url:"",pluginId:"",endpoint:"",systemParams:{},
ajaxOptions:{dataType:"json",type:"POST",async:!0,xhrFields:{withCredentials:!0}}
},init:function(t){i.isString(t.pluginId)&&i.isString(t.endpoint)&&(this.setOption("pluginId",t.pluginId),
this.setOption("endpoint",t.endpoint),this.setOption("url",e.getPluginEndpoint(t.pluginId,t.endpoint))),
this.setOption("kettleOutput",t.kettleOutput),this.setOption("stepName",t.stepName),
this.setOption("systemParams",t.systemParams||{}),this.setOption("ajaxOptions",a.extend({},this.getOption("ajaxOptions"),t.ajaxOptions));
var n=this.getOption("ajaxOptions");"json"==n.dataType&&(n.mimeType="application/json; charset utf-8",
this.setOption("ajaxOptions",n))},buildQueryDefinition:function(e){var t=this;e=e instanceof Array?r.propertiesArrayToObject(e):e||{};
var n={kettleOutput:this.getOption("kettleOutput"),stepName:this.getOption("stepName")
};n=a.extend(!0,{},n,this.getOption("systemParams"));var s=this.getOption("params"),u=a.extend({},s,e);
return i.each(u,function(e,r){var a,s;try{a=t.dashboard.getParameterValue(e)}catch(u){
s=!i.isObject(e)||i.isFunction(e)?e:JSON.stringify(e),o.log("BuildQueryDefinition detected static parameter "+r+"="+s+". The parameter will be used as value instead its value obtained from getParameterValue"),
a=e}void 0===a&&(a=e),i.isFunction(a)?a=a():i.isObject(a)&&(a=JSON.stringify(a)),
n["param"+r]=a}),n},getSuccessHandler:function(e){var t=this;return function(n){if(t.setOption("lastResultSet",n),
n&&0==n.result){var i=t.getErrorHandler(t.getOption("errorCallback"));i(r)}else{var r=a.extend(!0,{},t.getOption("lastResultSet"));
t.setOption("lastProcessedResultSet",r),n=e(r),void 0!==n&&n!==r&&t.setOption("lastProcessedResultSet",n);
}}}};n.registerGlobalQuery("cpk",s)}),define("cdf/queries/CdaQuery",["./CdaQuery.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../dashboard/Utils","../Logger","../lib/jquery"],function(e,t,n,i,r,o,a){
var s={name:"cda",label:"CDA Query",defaults:{url:e.getDoQuery(),file:"",id:"",outputIdx:"1",
sortBy:"",ajaxOptions:{async:!0,xhrFields:{withCredentials:!0}},searchPattern:""},
init:function(e){if("undefined"==typeof e.path||"undefined"==typeof e.dataAccessId)throw"InvalidQuery";
this.setOption("file",e.path),this.setOption("id",e.dataAccessId),"string"==typeof e.sortBy&&e.sortBy.match("^(?:[0-9]+[adAD]?,?)*$")&&this.setOption("sortBy",e.sortBy),
null!=e.pageSize&&this.setOption("pageSize",e.pageSize),null!=e.outputIndexId&&this.setOption("outputIdx",e.outputIndexId);
},buildQueryDefinition:function(e){var t=this;e=e instanceof Array?r.propertiesArrayToObject(e):e||{};
var n={},s=this.getOption("params"),u=a.extend({},s,e);return i.each(u,function(e,s){
var u;try{u=t.dashboard.getParameterValue(e)}catch(c){var d="";d=!i.isObject(e)||i.isFunction(e)?e:JSON.stringify(e),
o.log("BuildQueryDefinition detected static parameter "+s+"="+d+". The parameter will be used instead the parameter value"),
u=e}void 0===u&&(u=e),a.isArray(u)&&1==u.length&&(""+u[0]).indexOf(";")>=0&&(u=r.doCsvQuoting(u[0],";")),
"function"==typeof u&&(u=u()),n["param"+s]=u}),n.path=this.getOption("file"),n.dataAccessId=this.getOption("id"),
n.outputIndexId=this.getOption("outputIdx"),n.pageSize=this.getOption("pageSize"),
n.pageStart=this.getOption("page"),n.sortBy=this.getOption("sortBy"),n.paramsearchBox=this.getOption("searchPattern"),
n},exportData:function(t,n,i){i||(i={});var r=this.buildQueryDefinition(n);r.outputType=t,
"csv"==t&&i.separator&&(r.settingcsvSeparator=i.separator),i.filename&&(r.settingattachmentName=i.filename),
"xls"==t&&i.template&&(r.settingtemplateName=i.template),i.columnHeaders&&(r.settingcolumnHeaders=i.columnHeaders),
i.exportPage===!1&&(r.pageSize=0,r.pageStart=0),null!=i.dtFilter&&(r.settingdtFilter=i.dtFilter,
null!=i.dtSearchableColumns&&(r.settingdtSearchableColumns=i.dtSearchableColumns)),
r.wrapItUp="true",a.ajax({type:"POST",dataType:"text",async:!0,data:r,url:this.getOption("url"),
xhrFields:{withCredentials:!0}}).done(function(t){var n=a('<iframe style="display:none">');
n.detach(),n[0].src=e.getUnwrapQuery({path:r.path,uuid:t}),n.appendTo(a("body"))}).fail(function(e,t,n){
o.log("Request failed: "+e.responseText+" :: "+t+" ::: "+n)})},setSortBy:function(e){
var t,n=this;if(null===e||void 0===e||""===e)t="";else if("string"==typeof e){if(!e.match("^(?:[0-9]+[adAD]?,?)*$"))throw"InvalidSortExpression";
t=e.toUpperCase().split(",").filter(function(e){return""!==e})}else if(e instanceof Array){
t=e.map(function(e){return e.toUpperCase()});var i=t.filter(function(e){return!e.match("^[0-9]+[adAD]?,?$");
});if(i.length>0)throw"InvalidSortExpression"}var r;return t instanceof Array?(r=t.length!=n.getOption("sortBy").length,
a.each(t,function(e,t){return r=r&&t==n.getOption("sortBy")[e],r?void 0:!1})):r=t===this.getOption("sortBy"),
this.setOption("sortBy",t),!r},sortBy:function(e,t){var n=this.setSortBy(e);return n?null!==this.getOption("successCallback")?this.doQuery(t):void 0:!1;
}};n.registerGlobalQuery("cda",s)}),define("cdf/queries/XmlaQuery",["amd!../lib/xmla","./XmlaQuery.ext","../lib/Base","./BaseQuery","../dashboard/Dashboard.query","../Logger","../lib/jquery"],function(e,t,n,i,r,o,a){
var s=n.extend({xmla:null,datasource:null,catalogs:null,getDataSources:function(){
var t=[],n=this.xmla.discoverDataSources();if(!n)return void o.warn("XML/A DISCOVER_DATASOURCES request failed");
if(n.hasMoreRows()){t=n.fetchAllAsObject(),this.datasource=t[0];var i=this.datasource[e.PROP_DATASOURCENAME];
i&&i.length>0&&(this.datasource[e.PROP_DATASOURCEINFO]=i),n.close()}},getCatalogs:function(){
var t={},n={};if(!this.datasource||!this.datasource[e.PROP_DATASOURCEINFO])return void o.warn("XML/A DBSCHEMA_CATALOGS request failed, missing "+e.PROP_DATASOURCEINFO);
t[e.PROP_DATASOURCEINFO]=this.datasource[e.PROP_DATASOURCEINFO];var i=this.xmla.discoverDBCatalogs({
properties:t});if(!i)return void o.warn("XML/A DISCOVER_DATASOURCES request failed");
if(i.hasMoreRows()){for(this.catalogs=[];n=i.fetchAsObject();)this.catalogs[this.catalogs.length]=n;
i.close()}},discover:function(t){var n={},i=t.query();n[e.PROP_DATASOURCEINFO]=this.datasource[e.PROP_DATASOURCEINFO],
t.catalog&&(n[e.PROP_CATALOG]=t.catalog);var r=this.xmla.discover({properties:n,requestType:i
});return r},execute:function(t){for(var n=0,i=u.catalogs.length;i>n;n++)if(u.catalogs[n].CATALOG_NAME==t.catalog){
var r={};r[e.PROP_DATASOURCEINFO]=u.datasource[e.PROP_DATASOURCEINFO],r[e.PROP_CATALOG]=t.catalog,
r[e.PROP_FORMAT]=u.PROP_FORMAT||e.PROP_FORMAT_TABULAR;var o=this.xmla.execute({statement:t.query(),
properties:r});return o}throw new Error("Catalog: "+t.catalog+" was not found on Pentaho server.");
}}),u=new s,c={name:"xmla",label:"XML/A Query",queryDefinition:{},defaults:{url:t.getXmla()
},init:function(t){this.queryDefinition=a.extend({},this.getOption("params"),t),null==u.xmla&&(u.xmla=new e({
async:!1,url:this.getOption("url")})),null==u.datasource&&u.getDataSources(),null==u.catalogs&&u.getCatalogs();
},transformXMLAResults:function(t){var n,i,r,o={resultset:[],metadata:[]};t instanceof e.Rowset?(n=t.fetchAllAsArray(),
i=t.getFields()):t instanceof e.Dataset;for(var a=0,s=i.length;s>a;a++)switch(r=i[a],
o.metadata[a]={colIndex:r.index,colName:r.label},r.jsType){case"string":o.metadata[a].colType="string";
break;case"number":o.metadata[a].colType="numeric";break;default:o.metadata[a].colType="string";
}return o.resultset=n,t.close(),o},doQuery:function(e){var t=(this.getOption("url"),
e?e:this.getOption("successCallback"));this.getOption("errorCallback");try{var n=this.transformXMLAResults(this._executeQuery());
this.setOption("lastResultSet",n);var i=a.extend(!0,{},this.getOption("lastResultSet"));
this.setOption("lastProcessedResultSet",i),n=t(i),void 0!==n&&n!==i&&this.setOption("lastProcessedResultSet",n);
}catch(r){o.error("unable to execute the XML/A query: "+r+" :")}},_executeQuery:function(){
return u.execute(this.queryDefinition)}};r.registerGlobalQuery("xmla",c);var d={name:"xmlaDiscover",
label:"XML/A Discover Query",queryDefinition:{},defaults:{url:t.getXmla()},init:function(t){
this.queryDefinition=a.extend({},this.getOption("params"),t),null==u.xmla&&(u.xmla=new e({
async:!1,url:this.getOption("url")})),null==u.datasource&&u.getDataSources()},transformXMLADiscoverResults:function(e){
for(var t,n=e.getFields(),i={resultset:[],metadata:[]},r=0,o=n.length;o>r;r++)switch(t=n[r],
i.metadata[r]={colIndex:t.index,colName:t.label},t.jsType){case"string":i.metadata[r].colType="string";
break;case"number":i.metadata[r].colType="numeric";break;default:i.metadata[r].colType="string";
}return i.resultset=e.fetchAllAsArray(),e.close(),i},doQuery:function(e){var t=(this.getOption("url"),
e?e:this.getOption("successCallback"));this.getOption("errorCallback");try{var n=this.transformXMLADiscoverResults(this._executeDiscoverQuery());
this.setOption("lastResultSet",n);var i=a.extend(!0,{},this.getOption("lastResultSet"));
this.setOption("lastProcessedResultSet",i),n=t(i),void 0!==n&&n!==i&&this.setOption("lastProcessedResultSet",n);
}catch(r){o.error("unable to execute the XML/A query: "+r+" :")}},_executeDiscoverQuery:function(){
return u.discover(this.queryDefinition)}};r.registerGlobalQuery("xmlaDiscover",d);
}),define("cdf/queries/LegacyQuery",["../Logger","../components/XactionComponent.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../lib/jquery","../dashboard/Utils"],function(e,t,n,i,r,o,a){
function s(e,t,n){return{colIndex:e||0,colType:n||"String",colName:t||"Name"}}var u={
name:"legacy",label:"Legacy Query",defaults:{url:t.getCdfXaction("pentaho-cdf/actions","jtable.xaction"),
queryDef:{}},interfaces:{lastResultSet:{reader:function(e){e=JSON.parse(e);var t={
metadata:[s(0)],resultset:e.values||[]};return e.queryInfo&&(t.queryInfo=e.queryInfo),
r.each(e.metadata,function(e,n){return t.metadata.push(s(n+1,e))}),t}}},init:function(e){
this.setOption("queryDef",e)},getSuccessHandler:function(t){var n=this;return function(i){
try{n.setOption("lastResultSet",i)}catch(r){if(!this.async)throw r;e.error(n.dashboard.getErrorObj("COMPONENT_ERROR").msg+":"+r.message);
}var a=o.extend(!0,{},n.getOption("lastResultSet"));n.setOption("lastProcessedResultSet",a),
i=t(a),void 0!==i&&i!==a&&n.setOption("lastProcessedResultSet",i)}},buildQueryDefinition:function(e){
return r.extend({},this.getOption("queryDef"),e)}};i.registerGlobalQuery("legacy",u),
i.registerGlobalQuery("mdx",u),i.registerGlobalQuery("sql",u)}),define("cdf/Dashboard",["./dashboard/Dashboard","./dashboard/Dashboard.context","./dashboard/Dashboard.addIns","./dashboard/Dashboard.bookmarkable","./dashboard/Dashboard.components","./dashboard/Dashboard.i18n","./dashboard/Dashboard.legacy","./dashboard/Dashboard.lifecycle","./dashboard/Dashboard.notifications","./dashboard/Dashboard.parameters","./dashboard/Dashboard.storage","./dashboard/Dashboard.dataSources","./dashboard/Dashboard.query","./dashboard/Dashboard.views","./queries/BaseQuery","./queries/CpkQuery","./queries/CdaQuery","./queries/XmlaQuery","./queries/LegacyQuery","./components/BaseComponent","./components/UnmanagedComponent","css!./Dashboard"],function(e){
return e}),define("cdf/Dashboard.Bootstrap",["./Dashboard","amd!./lib/bootstrap","css!cdf/lib/font-awesome/css/font-awesome.css","./lib/html5shiv","./lib/respond"],function(e){
return e}),define("cdf/dashboard/Query",["amd!../lib/underscore","../lib/jquery"],function(e,t){
return function(n,i,r){var o,a;if(e.isObject(n)?(o=t.extend(!0,{},n),a=e.isString(n.queryType)&&n.queryType||!e.isUndefined(n.query)&&"legacy"||!e.isUndefined(n.path)&&!e.isUndefined(n.dataAccessId)&&"cda"||void 0):e.isString(n)&&e.isString(i)&&(a="cda",
o={path:n,dataAccessId:i}),!a)throw"InvalidQuery";return r.getQuery(a,o)}});