define(["../Logger","./JFreeChartComponent"],function(r,e){return e.extend({update:function(){
var e=this.chartDefinition;if(void 0==e)return void r.log("Fatal - No chartDefinition passed","error");
e.chartType="DialChart";var t=e.intervals,o=e.colors;return void 0!=o&&t.length!=o.length?void r.log("Fatal - Number of intervals differs from number of colors","error"):void this.callPentahoAction("cda"==this.dashboard.detectQueryType(e)?"jfreechartdial-cda.xaction":"jfreechartdial.xaction");
}})});