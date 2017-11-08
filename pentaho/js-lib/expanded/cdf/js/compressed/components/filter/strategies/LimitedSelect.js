define(["amd!../../../lib/underscore","../models/SelectionTree","./MultiSelect"],function(e,t,i){
return i.extend({ID:"BaseFilter.SelectionStrategies.LimitedSelect",constructor:function(e){
return this.selectionLimit=e.limit||1/0},setSelection:function(i,n){var l,o,c=!0,s=n.getSelection();
return i=this.getNewState(s),i!==t.SelectionStates.NONE&&(o=n.root().get("numberOfSelectedItems"),
e.isFinite(o)||(n.update(),o=n.root().get("numberOfSelectedItems")),o>=this.selectionLimit?(this.warn('Cannot allow the selection of  "'+n.get("label")+'". Selection limit of '+this.selectionLimit+" has been reached."),
c=!1):n.children()&&i===t.SelectionStates.ALL&&(l=n.flatten().filter(function(e){
return null==e.children()}).filter(function(e){return e.getSelection()===t.SelectionStates.NONE;
}).value().length,o+l>=this.selectionLimit&&(this.warn('Cannot allow the selection of "'+n.get("label")+'". Selection limit of '+this.selectionLimit+" would be reached."),
c=!1))),c?(this.debug("setSelection"),n.setAndUpdateSelection(i),o=n.root().get("numberOfSelectedItems"),
n.root().set("reachedSelectionLimit",o>=this.selectionLimit)):i=s,i}})});