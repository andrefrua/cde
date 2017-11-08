define(["./Abstract","../base/templates"],function(e,t){return e.extend({type:"Group",
ID:"BaseFilter.Views.Group",template:{skeleton:t["Group-skeleton"],selection:t["Group-template"]
},events:{"change    .filter-filter:eq(0)":"onFilterChange","keyup     .filter-filter:eq(0)":"onFilterChange",
"click     .filter-filter-clear:eq(0)":"onFilterClear","click     .filter-group-selection":"onSelection",
"click     .filter-collapse-icon:eq(0)":"onToggleCollapse","mouseover .filter-group-container":"onMouseOver",
"mouseout  .filter-group-container":"onMouseOut"},bindToModel:function(e){return this.base(e),
this.onChange(e,"isSelected numberOfSelectedItems numberOfItems",this.updateSelection),
this.onChange(e,"isCollapsed",this.updateCollapse)},updateCollapse:function(){var e=this.getViewModel();
return this.renderCollapse(e)},renderCollapse:function(e){this.renderSelection(e);
var t=[".filter-group-body",".filter-group-footer"].join(", ");return e.isCollapsed?this.$(t).hide():this.$(t).show();
}})});