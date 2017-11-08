define(["../lib/jquery","amd!./jquery.i18n"],function(n){var e,a=n.i18n.properties,t=n.i18n.browserLang;
n.i18n.properties=function(u){(null===u.language||""==u.language||void 0==u.language)&&(u.language=t()),
(null===u.language||void 0==u.language)&&(u.language=""),u.language=r(u),e&&(n.ajaxSetup({
type:"GET"}),a(u),n.ajaxSetup({type:"POST"}))},n.i18n.browserLang=function(){return null;
};var r=function(a){var t;return n.ajax({type:"GET",url:(void 0!=a.path?a.path:"")+a.name+"_supported_languages.properties",
async:!1,cache:a.cache,contentType:"text/plain;charset="+a.encoding,dataType:"text",
success:function(n,r){t=u(n,a.language),e=!0},error:function(n,r,u){e=!1,404==n.status&&(t=a.language);
}}),t},u=function(n,e){var a,t,r;if(e.length>=2&&(a=e.substring(0,2)),e.length>=5&&(t=e.substring(0,5)),
void 0!=n){for(var u=n.split(/\n/),g=0;g<u.length;g++){var i=u[g].substr(0,u[g].indexOf("="));
i==a&&void 0==r&&(r=a),i==t&&(r=t)}return void 0==r&&(r=""),r}};return n});