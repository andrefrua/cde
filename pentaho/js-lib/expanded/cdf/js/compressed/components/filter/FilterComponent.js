define(["../../lib/jquery","amd!../../lib/underscore","amd!../../lib/backbone","../UnmanagedComponent","../../Logger","./BaseFilter","./addIns/addIns","css!./styles/filter"],function(t,e,n,i,o,r){
var s={getValue:function(){return this._value},setValue:function(t){return this.inputDataHandler.setValue(t),
this},processChange:function(t){return this._value=t,this.dashboard.processChange(this.name),
this}},a={defaults:{component:{},input:{defaultModel:{isDisabled:!0,searchPattern:""
},indexes:{id:0,label:1,parentId:2,parentLabel:3,value:4}},output:{}},getConfiguration:function(){
var n=this.componentDefinition,i=n.multiselect?"LimitedSelect":"SingleSelect",o={
input:{},output:{},component:t.extend(!0,{},r.defaults,r.Enum.selectionStrategy[i],{
target:this.placeholder()})};t.extend(!0,o,e.result(this,"defaults"));var s=function(n,i){
var r=t.Deferred(),s=!!this.query&&this.query.getOption("pageSize")>0,a=o.component.search.serverSide;
if(!a&&!s)return r.resolve({}),r;var u=e.bind(function(t){return this.inputDataHandler.updateModel(t),
this.model.setBusy(!1),r.resolve(t),t},this),l=e.bind(function(){this.model.setBusy(!1),
r.reject()},this);this.model.setBusy(!0);try{var h=e.isEmpty(i)?"":i;switch(this.query.setSearchPattern(h),
n){case"previous":0!==this.query.getOption("page")&&this.query.previousPage(u);break;
case"next":this.query.nextPage(u);break;default:this.query.setOption("page",n),this.query.doQuery(u,l);
}}catch(d){r.reject({}),this.model.setBusy(!1)}return r},a=[];n.showIcons||a.push("no-icons");
var u=1/0;null!=this.queryDefinition.pageSize&&e.isFinite(this.queryDefinition.pageSize)&&this.queryDefinition.pageSize>0&&(u=this.queryDefinition.pageSize),
t.extend(!0,o.component,{pagination:{pageSize:u,getPage:e.bind(s,this)},selectionStrategy:{
limit:e.isNumber(n.selectionLimit)?n.selectionLimit:1/0},Root:{options:{styles:a,
alwaysExpanded:n.alwaysExpanded,showFilter:n.showFilter,useOverlay:n.useOverlay},
strings:{title:n.title}}});var l=this.dashboard.i18nSupport.map||{},h=this;e.each(["Root","Group","Item"],function(t){
return e.each(o.component[t].strings,function(n,i,o){var r;return r="filter_"+t+"_"+i,
e.has(l,r)?o[i]=h.dashboard.i18nSupport.prop(r):void 0})});var d=o.component.selectionStrategy,p=new r.SelectionStrategies[d.type](d);
return o.component.selectionStrategy.strategy=p,"SingleSelect"!==d.type&&(n.showButtonOnlyThis===!0||n.showButtonOnlyThis===!1)&&(o.component.Root.options.showButtonOnlyThis=n.showButtonOnlyThis,
o.component.Group.options.showButtonOnlyThis=n.showButtonOnlyThis,o.component.Item.options.showButtonOnlyThis=n.showButtonOnlyThis),
t.extend(!0,o.input,this.componentInput,{query:this.query}),t.extend(!0,o.output,this.componentOutput),
o=t.extend(!0,o,this._mapAddInsToConfiguration(),e.result(this,"options"))},_mapAddInsToConfiguration:function(){
var t=this,n=e.chain(this.addIns).map(function(n,i){var o=e.chain(n).map(function(e){
var n=e.trim(),o=t.getAddIn(i,n);if(null!=o){var r=t.getAddInOptions(i,n);return function(e,n,i){
var s;return s={model:n,configuration:i,dashboard:t.dashboard},o.call(e,s,r)}}return null;
}).compact().value();return[i,o]}).object().value(),i={postUpdate:"input.hooks.postUpdate",
renderRootHeader:"component.Root.renderers.header",renderRootSelection:"component.Root.renderers.selection",
renderRootFooter:"component.Root.renderers.footer",renderGroupSelection:"component.Group.renderers.selection",
renderItemSelection:"component.Item.renderers.selection",sortItem:"component.Item.sorter",
sortGroup:"component.Group.sorter",outputFormat:"output.outputFormat"},o={},r=function(t,e){
return null!=t[e]?t[e]:t[e]={}};return e.each(n,function(t,s){var a,u,l,h;return e.isEmpty(t)?void 0:(u=i[s].split("."),
h=e.initial(u),a=e.last(u),l=e.reduce(h,r,o),l[a]=n[s])}),o}};return i.extend(s).extend(a).extend({
model:void 0,manager:void 0,inputDataHandler:void 0,outputDataHandler:void 0,update:function(){
return this.getData().then(e.bind(function(t){return this.initialize(),t},this),e.bind(this.onDataFail,this)).then(e.bind(this.onDataReady,this)),
this},close:function(){return null!=this.manager&&this.manager.empty(),null!=this.model&&this.model.stopListening().off(),
this.stopListening()},initialize:function(){var t=this.getConfiguration();return this.close(),
this.model=new r.Models.SelectionTree(t.input.defaultModel),this.model.set("matcher",t.component.search.matcher),
this.manager=new r.Controllers.Manager({model:this.model,configuration:t.component
}),this.inputDataHandler=new r.DataHandlers.Input({model:this.model,options:t.input
}),this.outputDataHandler=new r.DataHandlers.Output({model:this.model,options:t.output
}),this.listenTo(this.outputDataHandler,"changed",this.processChange),t},getData:function(){
var n=new t.Deferred;if(e.isEmpty(this.dashboard.detectQueryType(this.queryDefinition)))if(this.componentInput.inputParameter&&!e.isEmpty(this.componentInput.inputParameter)){
var i=e.bind(function(){var t=this.dashboard.getParameterValue(this.componentInput.inputParameter);
n.resolve(t)},this);this.synchronous(i,null)}else{var r=e.bind(function(){n.resolve(this.componentInput.valuesArray);
},this);this.synchronous(r,null)}else{var s={ajax:{error:function(){return n.reject({}),
o.log("Query failed","debug")}}},a=e.bind(function(t){n.resolve(t)},this);this.triggerQuery(this.queryDefinition,a,s);
}return n.promise()},onDataReady:function(t){if(this.inputDataHandler.updateModel(t),
this.parameter){var e=this.dashboard.getParameterValue(this.parameter);this.setValue(e);
}return this.trigger("getData:success"),this},onDataFail:function(t){return o.log("Component failed to retrieve data: "+t,"debug"),
this.trigger("getData:failed"),this}},{help:function(){return"Filter component"}});
});