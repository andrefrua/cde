define(["../../../lib/jquery","amd!../../../lib/underscore","../../../lib/Base","../../../Logger","../models/SelectionTree"],function(e,t,n,i,o){
return n.extend(i).extend({ID:"BaseFilter.SelectionStrategies.AbstractSelect",constructor:function(e){
return this.isLogicGlobal=!0},getNewState:function(e){switch(e){case o.SelectionStates.NONE:
return o.SelectionStates.ALL;case o.SelectionStates.ALL:return o.SelectionStates.NONE;
case o.SelectionStates.SOME:return o.SelectionStates.NONE}},inferSelectionFromChildren:function(e){
var n=t.every(e,function(e){return e===SelectionStates.ALL}),i=t.every(e,function(e){
return e===SelectionStates.NONE});return n?SelectionStates.ALL:i?SelectionStates.NONE:SelectionStates.SOME;
},setSelection:function(e,t){throw new Error("NotImplemented")},changeSelection:function(n){
var i=e.now(),o=this.getNewState(n.getSelection());o=this.setSelection(o,n);var r=this;
return t.delay(function(){return r.debug("Switching "+n.get("label")+" to "+o+" took "+(e.now()-i)+" ms ");
},0),this},applySelection:function(e){return e.updateSelectedItems(),e.root().set("isCollapsed",!0),
this},getSelectedItems:function(e,t){return e.getSelectedItems(t)}})});