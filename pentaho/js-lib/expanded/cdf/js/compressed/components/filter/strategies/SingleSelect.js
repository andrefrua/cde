define(["amd!../../../lib/underscore","./AbstractSelect","../models/SelectionTree"],function(e,t,n){
return t.extend({ID:"BaseFilter.SelectionStrategies.SingleSelect",setSelection:function(e,t){
return t.children()?void 0:(this.isLogicGlobal===!0?t.root().setSelection(n.SelectionStates.NONE):t.getSelection()!==n.SelectionStates.ALL&&t.parent()&&t.parent().setSelection(n.SelectionStates.NONE),
t.setAndUpdateSelection(n.SelectionStates.ALL),e)},changeSelection:function(e){return this.base(e),
this.applySelection(e)},getSelectedItems:function(t,n){return t&&t.isRoot()&&t.children()&&1==t.countSelectedItems()&&1==t.children().length?e.flatten(t.children().map(function(e){
return e.getSelectedItems(n)||[]})):t.getSelectedItems(n)}})});