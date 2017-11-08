define(["amd!../lib/underscore","./UnmanagedComponent","pentaho/data/Table","../PentahoTypeContext","pentaho/visual/base/view","pentaho/shim/es6-promise"],function(e,t,i,n,a,c){
"use strict";var s=n.getInstance().get(a);return t.extend({vizView:null,update:function(){
this.beginQuery(this.queryDefinition,this.render)},render:function(t){var i=this.vizView?this.__syncVizViewAsync(t):this.__createVizViewAsync(t);
i.then(function(e){return e.update()}).then(e.bind(this.endExec,this),e.bind(this.failExec,this));
},_onVizViewSyncSpec:function(e){},_onVizViewCreated:function(e){},__syncVizView:function(e,t){},
__getVizViewSyncSpec:function(t){var n={width:this.width,height:this.height,model:{}
},a=n.model;return void 0!==t&&(a.data=new i(t)),e.each(this.vizOptions,function(e){
var t=e[0];switch(t){case"data":return}var i=e[1],n=this.getParameterValue(i);a[t]=n;
},this.dashboard),this._onVizViewSyncSpec(n),n},__createVizViewAsync:function(e){
var t=this.__getVizViewSyncSpec(e);t.domContainer=this.placeholder()[0],null==t.isAutoUpdate&&(t.isAutoUpdate=!1),
t.model._=this.vizId;var i=this;return s.createAsync(t).then(function(e){return i.vizView=e,
i._onVizViewCreated(e),e})},__syncVizViewAsync:function(e){var t=this.vizView,i=this;
return new c(function(n){function a(e){Object.keys(s).forEach(function(e){"model"!==e&&t.set(e,s[e]);
});var i=t.model,n=s.model;i&&n&&Object.keys(n).forEach(function(e){i.set(e,n[e]);
}),e.accept()}var c=t.isAutoUpdate;c&&(t.isAutoUpdate=!1);var s=i.__getVizViewSyncSpec(e);
try{t.type.context.enterChange().using(a,i)}finally{c&&(t.isAutoUpdate=!0)}n(t)});
}})});