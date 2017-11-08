define(["amd!../../../lib/underscore","../../../lib/Tree","../../../Logger","../views/Views","./RootCtrl"],function(t,e,i,n,r){
return e.extend({ID:"BaseFilter.Controllers.Manager",defaults:{model:null,view:null,
controller:null,configuration:null},constructor:function(e){this.base.apply(this,arguments);
var i=this.get("configuration").loglevel;return t.isUndefined(i)||(this.loglevel=i),
this.updateChildren(),this},initialize:function(t){return null==this.get("view")&&this.addViewAndController(this.get("model")),
this.applyBindings(),this},close:function(){return this.empty(),this.get("view").close(),
this.get("controller").stopListening().off(),this.stopListening(),this.off(),this.clear(),
this},empty:function(){this.children()&&(this.children().each(function(t){t.close();
}),this.base())},applyBindings:function(){var e=this,i=function(i){var n=e.get("configuration").pagination.throttleTimeMilliseconds;
return t.throttle(i,n||0,{trailing:!1})},n=function(i){var n=e.get("view").config.view.throttleTimeMilliseconds;
return t.debounce(i,n)},r={model:{add:this.onNewData,"change:selectedItems":this.onApply,
selection:this.sortSiblings},view:{filter:n(this.onFilterChange),"scroll:reached:top":i(this.getPreviousPage),
"scroll:reached:bottom":i(this.getNextPage)}};return t.each(r,function(i,n){return t.each(i,function(i,r){
return e.listenTo(e.attributes[n],r,t.bind(i,e))})}),this.on("post:child:selection request:child:sort",n(this.renderSortedChildren)),
this.on("post:child:add",n(this.onUpdateChildren)),this},addViewAndController:function(t){
var e,i,o,s,l,h,a=!0;if(null!=this.parent()){var d=this.parent();o=d.get("configuration");
var u=o[d.get("view").type].view.childConfig;h=d.get("view").createChildNode(),i=t.children()?n[u.withChildrenPrototype]:n[u.withoutChildrenPrototype],
e=r,s=d.get("controller")}else o=this.get("configuration"),h=o.target,i=n.Root,e=r,
s=null;var g=new i({model:t,configuration:o,target:h});return this.set("view",g),
a===!0&&null!==s?(l=s,l.bindToView(g)):l=new e({model:t,view:g,configuration:o}),
this.set("controller",l),this.debug("addViewAndController is done for "+t.get("id")+" : "+t.get("label")),
this},onNewData:function(t,e,i){var n;return this.debug("New data ("+t.get("label")+") caught by "+this.get("model").get("label")),
n=this.where({model:t.parent()}),1===n.length?n[0].trigger("post:child:add"):void 0;
},onUpdateChildren:function(){return this.debug("New data added to "+this.get("model").get("label")+" : updating children"),
this.updateChildren(),this.restoreScroll(),this.trigger("post:update:children",this);
},restoreScroll:function(){return null!=this.get("view")._scrollBar&&(this.debug("This group has a scrollbar"),
null!=this.previousPosition)?(this.debug("Scrolling back"),this.get("view").setScrollBarAt(this.previousPosition),
this.previousPosition=null):void 0},getNextPage:function(e,i){var n=this._listChildren(this.children()),r=this.sortChildren(n),o=t.last(r,2)[0];
return this.previousPosition=null!=o?o.target:void 0,this.getPage("next",e,i)},getPreviousPage:function(e,i){
var n=this._listChildren(this.children()),r=this.sortChildren(n),o=t.first(r,2)[1];
return this.previousPosition=null!=o?o.target:void 0,this.getPage("previous",e,i);
},getPage:function(t,e,i){this.debug("Item "+e.get("label")+" requested page "+t);
var n="";return this.get("configuration").search.serverSide===!0&&(n=e.root().get("searchPattern")),
this.requestPage(t,n)},requestPage:function(e,i){var n=this.get("configuration").pagination.getPage;
if(!t.isFunction(n))return this;var r=this;return n(e,i).then(function(t){null!=t.resultset?r.debug("getPage: got "+t.resultset.length+" more items"):r.debug("getPage: no more items");
})},updateChildren:function(){var e=this.get("model").children();if(null!=e){var i=this;
e.each(function(e){var n=!1;return i.children()&&(n=t.any(i.children().map(function(t){
return t.get("model")===e}))),n?void 0:(i.debug("adding child model "+e.get("label")),
i.addChild(e))}),this.renderSortedChildren(),this.get("view").updateScrollBar()}return this;
},addChild:function(t){var e={model:t,configuration:this.get("configuration")};return this.add(e),
this},removeChild:function(t){throw new Error("NotImplemented")},sortSiblings:function(t){
return this.debug("sortSiblings: "+this.get("model").get("label")+" was triggered from "+t.get("label")+":"+t.getSelection()),
this.get("model")!==t?this:this.parent()?this.parent().trigger("request:child:sort"):void 0;
},getSorters:function(){var e=this.children().first().get("view").type,i=this.get("configuration")[e].sorter;
return t.isFunction(i)?[i]:t.isArray(i)?i:[]},sortChildren:function(e){var i=this.getSorters();
if(t.isEmpty(i))return e;for(var n=i.length,r=this.get("configuration"),o=t.chain(e);n--;)o=o.sortBy(function(t,e){
return i[n](null,t.item.get("model"),r)});return o.value()},renderSortedChildren:function(){
var t;return this.children()?(t=this.get("view").getChildrenContainer(),t.hide(),
this._appendChildren(this.sortChildren(this._detachChildren())),t.show(),this):this;
},_listChildren:function(){var t;return t=this.children()?this.children().map(function(t){
return{item:t,target:t.get("view").$el}}):null},_detachChildren:function(){var t=this._listChildren();
return t.forEach(function(t){t.target.detach()}),t},_appendChildren:function(e){return null!=e&&t.each(e,function(t){
return function(e){return t.get("view").appendChildNode(e.target)}}(this)),this},
onFilterChange:function(t){this.get("configuration").search.serverSide===!0&&this.requestPage(0,t),
this.get("model").filterBy(t)},onApply:function(t){return this.onFilterChange("");
}})});