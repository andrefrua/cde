define(["../../../lib/jquery","amd!../../../lib/underscore","../baseevents/baseeventsModel","../../../Logger","../HtmlUtils"],function(e,t,n,r,i){
var a=function(e){return t.isString(e)?i.sanitizeHtml(e):e},o=function(e,t){var n={};
return null!=(null!=e?e.pageStart:void 0)&&(n={page:Math.floor(parseInt(e.pageStart)/t)
}),n},s=function(n,r){t.isObject(r)||(r={});var i=function(i){return t.map(i,function(i){
var o={id:i[n.id],label:a(i[n.label])};return t.isFinite(n.value)&&n.value>=0&&(o.value=a(i[n.value])),
o=e.extend(!0,o,r)})};return i},d=function(e,t){var n=function(n,r){var i={id:null!=r?n[0][e.parentId]:void 0,
label:n[0][e.parentLabel],nodes:s(e,t)(n)};return i};return n};return n.extend(r).extend({
ID:"BaseFilter.DataHandlers.Input",getModel:function(){return this.get("model")},
updateModel:function(e){t.isArray(e)?this._updateModelFromBidimensionalArray(e):this.isCdaJson(e)?this._updateModelFromCdaJson(e):this._updateModelFromJson(e);
var n=this.get("model");n.set("isBusy",!1),n.set("isDisabled",null===this.get("model").children());
var r=this.get("options");return r.root&&r.root.id&&n.set("id",r.root.id),r.hooks&&r.hooks.postUpdate&&t.each(r.hooks.postUpdate,function(e){
return e.call(null,null,n,r)}),this.trigger("postUpdate",n),this},_updateModelFromCdaJson:function(n){
var r=e.extend(!0,{},this.get("options")),i=o(n.queryInfo,r.query.getOption("pageSize"));
this._addDataToModel(n.resultset,i);var a;n.queryInfo&&n.queryInfo.pageStart&&(a=parseInt(n.queryInfo.totalRows));
var s=r.query.getOption("searchPattern");return t.isEmpty(s)&&this.get("model").set("numberOfItemsAtServer",a),
this},_updateModelFromJson:function(e){return this},_updateModelFromBidimensionalArray:function(e){
return this._addDataToModel(e,void 0),this},_addDataToModel:function(n,r){if(0===n.length)return this;
var i,a=e.extend(!0,{},this.get("options")),o=t.chain(a.indexes).pick("parentId","parentLabel").filter(t.isFinite).max().value(),u=t.isFinite(o)&&o<n[0].length;
return i=u?t.chain(n).groupBy(function(e){return e[a.indexes.parentId]}).map(d(a.indexes,r)).value():s(a.indexes,r)(n),
this.get("model").add(i),this},isCdaJson:function(e){return t.isObject(e)&&t.isArray(e.resultset)&&t.isArray(e.metadata);
},setValue:function(e){return this.get("model").setSelectedItems(e),this.trigger("setValue",e),
this}})});