define(["./ChartComponent","../lib/jquery","../lib/CCC/protovis-compat!"],function(t,i,e){
return t.extend({update:function(){void 0==this.parameters&&(this.parameters=[]),
this.renderChart()},render:function(t){i("#"+this.htmlObject).html('<div id="'+this.htmlObject+'protovis"></div>'),
this.vis=(new e.Panel).canvas(this.htmlObject+"protovis").width(this.width).height(this.height),
this.customfunction(this.vis,t),this.vis.root.render()},processdata:function(t){this.render(t);
}})});