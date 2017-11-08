define(["../../../lib/jquery","amd!../../../lib/underscore","../../../lib/BaseEvents","../../../Logger","../models/SelectionTree"],function(e,t,i,n,o){
return i.extend(n).extend({constructor:function(i){return e.extend(this,t.pick(i,["model","view","configuration"])),
this.view&&this.bindToView(this.view),this.loglevel=this.configuration.loglevel,this;
},bindToView:function(e){var i,n;return i={selected:this.onSelection,toggleCollapse:this.onToggleCollapse,
"control:only-this":this.onOnlyThis,"control:apply":this.onApply,"control:cancel":this.onCancel,
"click:outside":this.onClickOutside},n=this,t.each(i,function(t,i){return n.listenTo(e,i,t);
}),this},onSelection:function(e){return this.configuration.selectionStrategy.strategy.changeSelection(e),
this},onApply:function(e){return this.configuration.selectionStrategy.strategy.applySelection(e),
this},onCancel:function(e){return e.restoreSelectedItems(),e.root().set("isCollapsed",!0),
this},onToggleCollapse:function(e){var i,n;this.debug("Setting isCollapsed"),e.get("isDisabled")===!0?i=!0:(n=e.get("isCollapsed"),
i=!n);var o=!!e.nodes()&&t.some(e.nodes().models,function(e){return e.get("isVisible");
});return!o&&n&&this.view.onFilterClear(),e.set("isCollapsed",i),this},onClickOutside:function(e){
return e.set("isCollapsed",!0),this},onOnlyThis:function(e){return this.debug("Setting Only This"),
this.model.root().setAndUpdateSelection(o.SelectionStates.NONE),this.configuration.selectionStrategy.strategy.setSelection(o.SelectionStates.ALL,e),
this}})});