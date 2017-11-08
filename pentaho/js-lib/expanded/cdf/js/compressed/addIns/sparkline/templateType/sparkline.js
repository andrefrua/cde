define(["../../../AddIn","../sparklineBase","../../../Dashboard","amd!../../../lib/underscore","../../../lib/jquery","css!./sparkline"],function(e,n,r,t,a){
var i=new e(a.extend(!0,{},n,{defaults:{type:"bar"},getData:function(e,n){return t.map(e.value.split(","),function(e){
return e.trim()})}}));return r.registerGlobalAddIn("Template","templateType",i),i;
});