define(["../ChartComponent","./BaseCccComponent.ext","../../lib/CCC/pvc","../../lib/CCC/def","../../lib/modernizr","../../lib/jquery","amd!../../lib/underscore","../../lib/CCC/protovis-compat!"],function(e,i,t,s,n,o,r,h){
return t.defaultCompatVersion(3),e.extend({query:null,chart:null,_cccVizName:null,
getCccVisualizationName:function(){return!this._cccVizName&&this.cccType&&(this._cccVizName=i.getVizDigestedName(s.qualNameOf(this.cccType).name,this.chartDefinition)),
this._cccVizName},_preProcessChartDefinition:function(){var e=this.chartDefinition;
if(e){var s=e.compatVersion;if(null==s&&(s="function"==typeof t.defaultCompatVersion?t.defaultCompatVersion():1),
1>=s){"showLegend"in e&&(e.legend=e.showLegend,delete e.showLegend);for(var n in e){
var o=/^barLine(.*)$/.exec(n);o&&(e["secondAxis"+(o[1]||"")]=e[n],delete e[n])}}else s>=3&&(this._vizApiStyles=i.isValidVisualization(this.getCccVisualizationName()));
}},update:function(){null==this.parameters&&(this.parameters=[]);var e=o("#"+this.htmlObject).empty(),i=this;
"undefined"==typeof this.chartDefinition.width&&(this.chartDefinition.width=e.width()),
"undefined"==typeof this.chartDefinition.height&&(this.chartDefinition.height=e.height()),
"undefined"!=typeof n&&n.svg?this.renderChart():h.listenForPageLoad(function(){i.renderChart();
})},render:function(e){this._preProcessChartDefinition(),i.getExtensionsPromise(this.getCccVisualizationName(),this._vizApiStyles).then(r.bind(this._renderInner,this,e)).then(r.bind(this.endExec,this),r.bind(this.failExec,this));
},_renderInner:function(e,t){o("#"+this.htmlObject).append('<div id="'+this.htmlObject+'protovis"></div>');
var s=o.extend({},this.chartDefinition);if(this._vizApiStyles&&(s.baseAxisLabelDesiredAngles&&0==s.baseAxisLabelDesiredAngles.length&&(s.baseAxisLabelDesiredAngles=void 0),
s.orthoAxisLabelDesiredAngles&&0==s.orthoAxisLabelDesiredAngles.length&&(s.orthoAxisLabelDesiredAngles=void 0)),
t&&(s=o.extend(t,s)),this._vizApiStyles&&(!s.colors||s.colors&&0==s.colors.length)&&((!s.continuousColorAxisColors||s.continuousColorAxisColors&&0==s.continuousColorAxisColors.length)&&(s.continuousColorAxisColors=i.getColors("blue-3")),
s.discreteColorAxisColors=i.getColors()),s.canvas=this.htmlObject+"protovis",s.extensionPoints){
var n={};s.extensionPoints.forEach(function(e){n[e[0]]=e[1]}),s.extensionPoints=n;
}this.chart=new this.cccType(s),arguments.length>0&&this.chart.setData(e,{crosstabMode:this.crosstabMode,
seriesInRows:this.seriesInRows}),this.chart.render()}})});