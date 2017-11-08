define(["../../PentahoTypeContext","pentaho/visual/color/paletteRegistry","amd!../../lib/underscore","../../lib/jquery","pentaho/shim/es6-promise"],function(e,t,a,r,n){
var i=/^(.*)Chart$/,o=e.getInstance(),s=["bullet"],c=["waterfall","treemap","boxplot","heatGrid","line","scatter","pie","pointAbstract","sunburst"],l=["barNormalized","area","areaStacked"],d=["barNormalized","areaStacked"],u=["area","areaStacked"],b=function(e,t){
var r,n=i.exec(e);if(n){switch(r=n[1].charAt(0).toLowerCase()+n[1].substr(1)){case"metricDot":
r="bubble";break;case"metricLine":r="scatter";break;case"normalizedBar":r="barNormalized";
break;case"dot":case"stackedDot":r="pointAbstract";break;case"stackedLine":r="line";
break;case"stackedArea":r="areaStacked"}return t&&!a.contains(c,r)&&(t.valuesNormalized&&!a.contains(l,r)&&(r+="Normalized"),
t.stacked&&!a.contains(d,r)&&(r+="Stacked"),"horizontal"!==(t.orientation||"").toLowerCase()||a.contains(u,r)||(r+="Horizontal")),
r}},k=function(e){return!!e&&""!=e&&!a.contains(s,e)},m=function(e,t){return t?o.getAsync("pentaho/ccc/visual/"+e).then(function(e){
return r.extend({},e.type.extensionEffective)}):n.resolve(null)},p=function(e){return t.get(e?e:void 0).colors;
};return{getVizDigestedName:b,isValidVisualization:k,getExtensionsPromise:m,getColors:p
}});