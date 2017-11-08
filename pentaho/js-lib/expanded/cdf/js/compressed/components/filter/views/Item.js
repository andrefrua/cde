define(["./Abstract","../base/templates"],function(e,t){return e.extend({type:"Item",
ID:"BaseFilter.Views.Root",template:{selection:t["Item-template"],skeleton:t["Item-template"]
},events:{"mouseover .filter-item-body":"onMouseOver","mouseout  .filter-item-body":"onMouseOut",
"click     .filter-item-body":"onSelection","click     .filter-item-only-this":"onClickOnlyThis"
},bindToModel:function(e){return this.base(e),this.onChange(e,"isSelected",this.updateSelection),
this.onChange(e,"isVisible",this.updateVisibility)},onClickOnlyThis:function(e){return e.stopPropagation(),
this.trigger("control:only-this",this.model)}})});