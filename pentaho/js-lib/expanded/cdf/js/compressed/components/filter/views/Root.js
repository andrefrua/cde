define(["../../../lib/jquery","amd!../../../lib/underscore","../../../lib/mustache","./Abstract","../base/templates"],function(e,t,i,l,r){
return l.extend({type:"Root",ID:"BaseFilter.Views.Root",template:{skeleton:r["Root-skeleton"],
overlay:r["Root-overlay"],header:r["Root-header"],selection:r["Root-template"],footer:r["Root-footer"]
},events:{"click     .filter-root-header:eq(0)":"onToggleCollapse","click     .filter-root-selection:eq(0)":"onSelection",
"click     .filter-btn-apply:eq(0)":"onApply","click     .filter-btn-cancel:eq(0)":"onCancel",
"mouseover .filter-root-header":"onMouseOver","mouseout  .filter-root-header":"onMouseOut",
"keyup   .filter-filter:eq(0)":"onFilterChange","change  .filter-filter:eq(0)":"onFilterChange",
"click  .filter-filter-clear:eq(0)":"onFilterClear","click  .filter-overlay":"onOverlayClick"
},initialize:function(e){return this.renderOverlay=this.renderSlot("overlay"),this.renderHeader=this.renderSlot("header"),
this.renderFooter=this.renderSlot("footer"),this.base(e)},bindToModel:function(e){
return this.base(e),this.onChange(e,"isCollapsed",this.updateCollapse),this.onChange(e,"isSelected numberOfSelectedItems numberOfItems reachedSelectionLimit",this.updateHeader),
this.onChange(e,"isSelected numberOfSelectedItems numberOfItems selectedItems",this.updateSelection),
this.onChange(e,"reachedSelectionLimit isBusy",this.updateFooter),this.onChange(e,"isDisabled",t.bind(this.updateAvailability,this));
},getViewModel:function(){var i=this.base();return e.extend(i,{selectedItems:t.map(this.configuration.selectionStrategy.strategy.getSelectedItems(this.model,"label"),function(e){
return e+" "}),allItemsSelected:this.model.getSelection()===!0,noItemsSelected:this.model.getSelection()===!1,
hasChanged:this.model.hasChanged()}),i},render:function(){var e=this.getViewModel();
return this.renderSkeleton(e),this.renderOverlay(e),this.renderHeader(e),this.renderCollapse(e),
this.renderSelection(e),this.renderFooter(e),this.renderAvailability(e),this},updateHeader:function(){
var e=this.getViewModel();return this.renderHeader(e),this},updateFooter:function(){
var e=this.getViewModel();return this.renderFooter(e),this},updateCollapse:function(){
var e=this.getViewModel();return this.renderHeader(e),this.renderOverlay(e),this.renderCollapse(e),
this},renderCollapse:function(e){if(e.isDisabled===!0){var t=e.alwaysExpanded===!0;
this.$(".filter-root-container").toggleClass("expanded",t).toggleClass("collapsed",!t).toggleClass("always-expanded",t);
}else e.alwaysExpanded===!0?this.$(".filter-root-container").toggleClass("expanded",!1).toggleClass("collapsed",!1).toggleClass("always-expanded",!0):e.isCollapsed===!0?this.$(".filter-root-container").toggleClass("expanded",!1).toggleClass("collapsed",!0).toggleClass("always-expanded",!1):this.$(".filter-root-container").toggleClass("expanded",!0).toggleClass("collapsed",!1).toggleClass("always-expanded",!1);
return this},updateAvailability:function(){var e=this.getViewModel();return this.renderAvailability(e),
this},renderAvailability:function(e){return this.$(".filter-root-container").toggleClass("disabled",e.isDisabled===!0),
this},onOverlayClick:function(i){return this.trigger("click:outside",this.model),
this.config.view.overlaySimulateClick===!0&&(this.$(".filter-overlay").toggleClass("expanded",!1).toggleClass("collapsed",!0),
t.delay(function(){var l=e(document.elementFromPoint(i.clientX,i.clientY)),r=t.chain(l.parents()).filter(function(t){
return e(t).hasClass("filter-root-header")}).first().value();return null!=r?e(r).click():void 0;
},0)),this}})});