define(["amd!../../../lib/underscore","../../../lib/mustache","../baseevents/baseeventsView","../../../Logger","../models/SelectionTree","../../../lib/jquery","./scrollbar/ScrollBarFactory","../HtmlUtils"],function(t,i,e,n,s,r,o,l){
return e.extend(n).extend({initialize:function(t){return this.configuration=t.configuration,
this.loglevel=this.configuration.loglevel,this.config=this.configuration[this.type],
null!=this.config.view.templates&&r.extend(!0,this.template,this.config.view.templates),
this.model&&this.bindToModel(this.model),this.setElement(t.target),this.render(),
this},bindToModel:function(t){return this.onChange(t,"isVisible",this.updateVisibility),
this},onChange:function(i,e,n){var s=e.split(" "),r=t.map(s,function(t){return"change:"+t;
}).join(" ");return this.config.view.throttleTimeMilliseconds>=0?this.listenTo(i,r,t.throttle(n,this.config.view.throttleTime,{
leading:!1})):this.listenTo(i,r,n),this},updateSlot:function(i){return t.bind(function(){
var t=this.getViewModel(),i=this.renderSlot("slot");return i.call(this,t)},this)},
renderSlot:function(e){return t.bind(function(t){if(this.template[e]){var n=i.render(this.template[e],t);
n=l.sanitizeHtml(n),this.$(this.config.view.slots[e]).replaceWith(n)}return this.injectContent(e),
this},this)},getViewModel:function(){var i;return i=t.result(this.config,"options"),
r.extend(!0,this.model.toJSON(),i,{strings:t.result(this.config,"strings"),selectionStrategy:t.omit(this.configuration.selectionStrategy,"strategy"),
isPartiallySelected:this.model.getSelection()===s.SelectionStates.SOME,numberOfChildren:this.model.children()?this.model.children().length:0
})},injectContent:function(i){var e,n,s,r;return s=null!=(e=this.config)&&null!=(n=e.renderers)?n[i]:void 0,
null!=s?(t.isArray(s)||(s=[s]),r=this,t.each(s,function(i){return t.isFunction(i)?i.call(r,r.$el,r.model,r.configuration):void 0;
}),this):void 0},render:function(){var t=this.getViewModel();return this.renderSkeleton(t),
this.renderSelection(t),this.updateVisibility(t),this},renderSkeleton:function(t){
var e=i.render(this.template.skeleton,t);return e=l.sanitizeHtml(e),this.$el.html(e),
this},updateSelection:function(t,i){if(t===this.model){var e=this.getViewModel();this.renderSelection(e);
}return this},renderSelection:function(t){var e=i.render(this.template.selection,t);
return e=l.sanitizeHtml(e),this.$(this.config.view.slots.selection).replaceWith(e),
this.injectContent("selection"),this},updateVisibility:function(){return this.model.getVisibility()?this.$el.show():this.$el.hide();
},getChildrenContainer:function(){return this.$(this.config.view.slots.children)},
createChildNode:function(){var t=r("<div/>").addClass(this.config.view.childConfig.className),i=this.$(this.config.view.slots.children);
return t.appendTo(i),t},appendChildNode:function(t){var i=this.$(this.config.view.slots.children);
return t.appendTo(i),t},updateScrollBar:function(){var i=this.config.options.scrollThreshold,e=t.isFinite(this.configuration.pagination.pageSize)&&this.configuration.pagination.pageSize>0;
return e=e||"Item"!==this.type&&this.model.flatten().size().value()>i,e?(this.debug("There are more than "+i+" items, adding scroll bar"),
this.addScrollBar()):void 0},addScrollBar:function(){if(null!=this._scrollBar)return this;
if(this.debug("Adding a scrollbar to "+this.model.get("label")),this._scrollBar=o.createScrollBar(this.config.view.scrollbar.engine,this),
this.config.options.isResizable){var i=this.$(this.config.view.slots.children).parent();
t.isFunction(i.resizable)&&i.resizable({handles:"s"})}return this},setScrollBarAt:function(t){
return null!=this._scrollBar&&this._scrollBar.scrollToPosition(t),this},onMouseOver:function(t){
var i;return i=this.$(this.config.view.slots.selection),i=this.$("div:eq(0)"),this.trigger("mouseover",this.model),
this},onMouseOut:function(t){var i;return i=this.$(this.config.view.slots.selection),
i=this.$("div:eq(0)"),this.trigger("mouseout",this.model),this},onSelection:function(){
return this.trigger("selected",this.model),this},onApply:function(t){return this.trigger("control:apply",this.model),
this},onCancel:function(t){return this.debug("triggered Cancel"),this.trigger("control:cancel",this.model),
this},onFilterChange:function(t){var i=r(t.target).val();return this.trigger("filter",i,this.model),
this},onFilterClear:function(t){var i="";return this.$(".filter-filter-input:eq(0)").val(i),
this.trigger("filter",i,this.model),this},onToggleCollapse:function(t){return this.debug("triggered collapse"),
this.trigger("toggleCollapse",this.model,t),this},close:function(){return this.remove(),
this.unbind()}})});