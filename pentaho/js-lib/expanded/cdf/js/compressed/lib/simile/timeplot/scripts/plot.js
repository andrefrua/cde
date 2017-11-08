var buttonGap=22;Timeplot.Plot=function(e,t){this._timeplot=e,this._canvas=e.getCanvas(),
this._plotInfo=t,this._id=t.id,this._name=t.name,this._timeGeometry=t.timeGeometry,
this._valueGeometry=t.valueGeometry,this._theme=new Timeline.getDefaultTheme,this._dataSource=t.dataSource,
this._eventSource=t.eventSource,this._bubble=null,this._toolTipFormat=t.toolTipFormat,
this._headerFormat=t.headerFormat,this._hideZeroToolTipValues=t.hideZeroToolTipValues,
this._getSelectedRegion=t.getSelectedRegion,this._showValuesMode=t.showValuesMode,
this._rangeColor=t.rangeColor},Timeplot.Plot.prototype={initialize:function(){this._timeFlag=this._timeplot.putDiv("timeflag","timeplot-timeflag"),
this._valueFlag=this._timeplot.putDiv(this._id+"valueflag","timeplot-valueflag"),
this._valueFlagLineLeft=this._timeplot.putDiv(this._id+"valueflagLineLeft","timeplot-valueflag-line"),
this._valueFlagLineRight=this._timeplot.putDiv(this._id+"valueflagLineRight","timeplot-valueflag-line"),
this._valueFlagLineLeft.firstChild||(this._valueFlagLineLeft.appendChild(SimileAjax.Graphics.createTranslucentImage(Timeplot.urlPrefix+"images/line_left.png")),
this._valueFlagLineRight.appendChild(SimileAjax.Graphics.createTranslucentImage(Timeplot.urlPrefix+"images/line_right.png"))),
this._valueFlagPole=this._timeplot.putDiv(this._id+"valuepole","timeplot-valueflag-pole");
var e=this._plotInfo.valuesOpacity;SimileAjax.Graphics.setOpacity(this._timeFlag,e),
SimileAjax.Graphics.setOpacity(this._valueFlag,e),SimileAjax.Graphics.setOpacity(this._valueFlagLineLeft,e),
SimileAjax.Graphics.setOpacity(this._valueFlagLineRight,e),SimileAjax.Graphics.setOpacity(this._valueFlagPole,e);
var t=this,i=function(e,i,l){t._plotInfo.showValues&&(t._valueFlag.style.display="block",
a(e,i,l))},l=864e5,o=30*l,a=function(e,i,a){if(t._plotInfo.showValues&&!t._mouseDown){
var n=t._canvas,s=Math.round(SimileAjax.DOM.getEventRelativeCoordinates(i,t._canvas).x);
s>n.width&&(s=n.width),s=isNaN(s)||0>s?0:s;var r=t._timeGeometry.fromScreen(s),h=t._timeGeometry.getPeriod(),v=t._dataSource.getValue(r);
if(0==r||"tooltip"==t._showValuesMode&&t._hideZeroToolTipValues&&0==Math.round(v))return void(t._valueFlag.style.display="none");
var v=t._dataSource.getValue(r);t._plotInfo.roundValues&&(v=Math.round(v));var _=new Date(r);
l>h?t._timeFlag.innerHTML=_.toLocaleTimeString():h>o?t._timeFlag.innerHTML=_.toLocaleDateString():t._timeFlag.innerHTML=_.toLocaleString();
var u=t._timeFlag.clientWidth,m=t._timeFlag.clientHeight,p=Math.round(u/2),g=t._valueFlag.clientWidth,c=t._valueFlag.clientHeight,d=t._valueGeometry.toScreen(v);
if(s+p>n.width)var f=n.width-p;else if(0>s-p)var f=p;else var f=s;"top"==t._timeGeometry._timeValuePosition?(t._timeplot.placeDiv(t._valueFlagPole,{
left:s,top:m-5,height:n.height-d-m+6,display:"block"}),t._timeplot.placeDiv(t._timeFlag,{
left:f-p,top:-6,display:"block"})):(t._timeplot.placeDiv(t._valueFlagPole,{left:s,
bottom:m-5,height:d-m+6,display:"block"}),t._timeplot.placeDiv(t._timeFlag,{left:f-p,
bottom:-6,display:"block"}));var S=v;if("tooltip"==t._showValuesMode&&void 0!=t._toolTipFormat&&"function"==typeof t._toolTipFormat&&(S=t._toolTipFormat(v,t)),
"header"==t._showValuesMode)return void 0!=t._headerFormat&&"function"==typeof t._headerFormat&&(S=t._headerFormat(v,t)),
$("#"+t._id+"Header").html(S),void(t._valueFlag.style.display="none");t._valueFlag.innerHTML=S,
s+g+14>n.width&&d+c+4>n.height?(t._valueFlagLineLeft.style.display="none",t._timeplot.placeDiv(t._valueFlagLineRight,{
left:s-14,bottom:d-14,display:"block"}),t._timeplot.placeDiv(t._valueFlag,{left:s-g-13,
bottom:d-c-13,display:"block"})):s+g+14>n.width&&d+c+4<n.height?(t._valueFlagLineRight.style.display="none",
t._timeplot.placeDiv(t._valueFlagLineLeft,{left:s-14,bottom:d,display:"block"}),t._timeplot.placeDiv(t._valueFlag,{
left:s-g-13,bottom:d+13,display:"block"})):s+g+14<n.width&&d+c+4>n.height?(t._valueFlagLineLeft.style.display="none",
t._timeplot.placeDiv(t._valueFlagLineRight,{left:s,bottom:d,display:"block"}),t._timeplot.placeDiv(t._valueFlag,{
left:s+13,bottom:d,display:"block"})):(t._valueFlagLineLeft.style.display="none",
t._timeplot.placeDiv(t._valueFlagLineRight,{left:s,bottom:d,display:"block"}),t._timeplot.placeDiv(t._valueFlag,{
left:s+13,bottom:d+13,display:"block"})),d=parseFloat(t._valueFlag.style.bottom.replace(/px/g,"")),
0==t._dataSource._column?(timeplot.previousArray=new Array,timeplot.previousArray[0]=[t._id,v,d]):timeplot.previousArray[timeplot.previousArray.length]=[t._id,v,t._resolveDivConflit(d,v,!1,timeplot.previousArray)];
}else if(t._mouseDown){var s=Math.round(SimileAjax.DOM.getEventRelativeCoordinates(i,t._canvas).x),y=s>t.startSelectEventPos?s-t.startSelectEventPos:t.startSelectEventPos-s;
y>10&&(s<t._canvas.width?t._addSelectEvent(t.startSelectEvent,t.getSelectedDate(i,s),t._eventSource,void 0,void 0,void 0):t._mouseDown=!1);
}},n=function(e,i,l){var o=Math.round(SimileAjax.DOM.getEventRelativeCoordinates(i,t._canvas).x),a=t.getSelectedDate(i,o);
t.startSelectEvent=a,t.startSelectEventPos=o,t._mouseDown=!0},s=function(e,i,l){var o=Math.round(SimileAjax.DOM.getEventRelativeCoordinates(i,t._canvas).x),a=o>t.startSelectEventPos?o-t.startSelectEventPos:t.startSelectEventPos-o;
a>10&&t._getSelectedRegion(t.startSelectEvent,t.getSelectedDate(i,o)),t._mouseDown=!1;
},r=this._timeplot.getElement();SimileAjax.DOM.registerEvent(r,"mouseover",i),SimileAjax.DOM.registerEvent(r,"mousemove",a),
"eventPlot"==t._id&&(SimileAjax.DOM.registerEvent(r,"mousedown",n),SimileAjax.DOM.registerEvent(r,"mouseup",s));
},dispose:function(){this._dataSource&&(this._dataSource.removeListener(this._paintingListener),
this._paintingListener=null,this._dataSource.dispose(),this._dataSource=null)},hideValues:function(){
this._valueFlag&&(this._valueFlag.style.display="none"),this._timeFlag&&(this._timeFlag.style.display="none"),
this._valueFlagLineLeft&&(this._valueFlagLineLeft.style.display="none"),this._valueFlagLineRight&&(this._valueFlagLineRight.style.display="none"),
this._valueFlagPole&&(this._valueFlagPole.style.display="none")},getDataSource:function(){
return this._dataSource?this._dataSource:this._eventSource},getTimeGeometry:function(){
return this._timeGeometry},getValueGeometry:function(){return this._valueGeometry;
},paint:function(){var e=this._canvas.getContext("2d");if(e.lineWidth=this._plotInfo.lineWidth,
e.lineJoin="miter",this._dataSource){if(this._plotInfo.fillColor){if(this._plotInfo.fillGradient){
var t=e.createLinearGradient(0,this._canvas.height,0,0);t.addColorStop(0,this._plotInfo.fillColor.toString()),
t.addColorStop(.5,this._plotInfo.fillColor.toString()),t.addColorStop(1,"rgba(255,255,255,0)"),
e.fillStyle=t}else e.fillStyle=this._plotInfo.fillColor.toString();e.beginPath(),
e.moveTo(0,0),this._plot(function(t,i){isNaN(t)||isNaN(i)||e.lineTo(t,i)}),this._plotInfo.fillFrom==Number.NEGATIVE_INFINITY?e.lineTo(this._canvas.width,0):this._plotInfo.fillFrom==Number.POSITIVE_INFINITY?(e.lineTo(this._canvas.width,this._canvas.height),
e.lineTo(0,this._canvas.height)):(e.lineTo(this._canvas.width,this._valueGeometry.toScreen(this._plotInfo.fillFrom)),
e.lineTo(0,this._valueGeometry.toScreen(this._plotInfo.fillFrom))),e.fill()}if(this._plotInfo.lineColor){
e.strokeStyle=this._plotInfo.lineColor.toString(),e.beginPath();var i=!0;this._plot(function(t,l){
isNaN(t)||isNaN(l)||(i&&(i=!1,e.moveTo(t,l)),e.lineTo(t,l))}),e.stroke()}if(this._plotInfo.dotColor){
e.fillStyle=this._plotInfo.dotColor.toString();var l=this._plotInfo.dotRadius;this._plot(function(t,i){
e.beginPath(),e.arc(t,i,l,0,2*Math.PI,!0),e.fill()})}}if(this._eventSource){var t=e.createLinearGradient(0,0,0,this._canvas.height);
t.addColorStop(1,"rgba(255,255,255,0)"),e.strokeStyle=t,e.fillStyle=t,e.lineWidth=this._plotInfo.eventLineWidth,
e.lineJoin="miter";for(var o=this._eventSource.getAllEventIterator();o.hasNext();){
var a=o.next(),n=a.getColor();n=n?new Timeplot.Color(n):this._plotInfo.lineColor;var s=a.getStart().getTime(),r=a.getEnd().getTime();
if(s==r){var h=n.toString();t.addColorStop(0,h);var v=this._timeGeometry.toScreen(s);
v=Math.floor(v)+.5;var _=v;e.beginPath(),e.moveTo(v,0),e.lineTo(v,this._canvas.height),
e.stroke();var u=v-4,m=7}else{var h=n.toString(.5);t.addColorStop(0,h);var v=this._timeGeometry.toScreen(s);
v=Math.floor(v)+.5;var _=this._timeGeometry.toScreen(r);_=Math.floor(_)+.5,e.fillRect(v,0,_-v,this._canvas.height);
var u=v,m=_-v-1}var p=this._timeplot.putDiv(a.getID(),"selectEvent"!=a.getID()?"timeplot-event-box":"timeplot-selectevent-box",{
left:Math.round(u),width:Math.round(m),top:0,height:this._canvas.height-1}),g=this,c=function(e){
return function(t,i,l){if("selectEvent"!=e._id){g._timeplot.getDocument();g._closeBubble();
var o=SimileAjax.DOM.getEventPageCoordinates(i),a=SimileAjax.DOM.getPageCoordinates(t);
g._bubble=SimileAjax.Graphics.createBubbleForPoint(o.x,a.top+g._canvas.height,g._plotInfo.bubbleWidth,g._plotInfo.bubbleHeight,"bottom"),
e.fillInfoBubble(g._bubble.content,g._theme,g._timeGeometry.getLabeler())}}},d=function(e,t,i){
e.oldClass=e.className,e.className=e.className+" timeplot-event-box-highlight"},f=function(e,t,i){
e.className=e.oldClass,e.oldClass=null};p.instrumented||(SimileAjax.DOM.registerEvent(p,"click",c(a)),
SimileAjax.DOM.registerEvent(p,"mouseover",d),SimileAjax.DOM.registerEvent(p,"mouseout",f),
p.instrumented=!0)}}},_plot:function(e){var t=this._dataSource.getData();if(t)for(var i=t.times,l=t.values,o=i.length,a=0;o>a;a++){
var n=this._timeGeometry.toScreen(i[a]),s=this._valueGeometry.toScreen(l[a]);e(n,s);
}},_closeBubble:function(){null!=this._bubble&&(this._bubble.close(),this._bubble=null);
},_resolveDivConflit:function(e,t,l,o){for(i=0;i<o.length;i++){var a=o[i][1],n=o[i][2],s=n+buttonGap;
if(this._id!=o[i][0]&&s>=e&&(e>=n||e+buttonGap>=n)){if(e=a>t?n-buttonGap-1>0?n-buttonGap-1:e:s+1,
this._valueFlag.style.bottom=e+"px",!l)return this._resolveDivConflit(e,t,!0,o);(l&&a>t||0>e)&&(this._valueFlag.style.zIndex="0");
}}return e},_addSelectEvent:function(e,t,i,l,o,a){if(void 0!=l){var n=i._events.getUnit().getParser(l);
e=n(e),t=n(t)}void 0!=o&&void 0!=a&&(e=o>e?new Date(o):e,t=t>a?new Date(a):t);var s=new Timeline.DefaultEventSource.Event("selectEvent",e,t,e,t,!1,null,null,null,null,null,this._rangeColor,null,null,null),r=i.getEvent("selectEvent");
if(void 0!=r)for(;i._events._events.remove(r););return i.add(s),!0},getSelectedDate:function(e,t){
var t=Math.round(SimileAjax.DOM.getEventRelativeCoordinates(e,this._canvas).x),i=this._timeGeometry.fromScreen(t);
return new Date(i)}};