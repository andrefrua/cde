define(["amd!../../../lib/underscore","../../../lib/BaseSelectionTree"],function(e,t){
return t.extend({defaults:{id:void 0,label:"",isSelected:!1,isVisible:!0,isCollapsed:!0,
numberOfSelectedItems:0,numberOfItems:0,page:0},setBusy:function(e){return this.root().set("isBusy",e),
this},isBusy:function(){return this.root().get("isBusy")}},{SelectionStates:t.SelectionStates
})});