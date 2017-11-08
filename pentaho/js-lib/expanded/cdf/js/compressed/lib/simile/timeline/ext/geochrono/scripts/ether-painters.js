Timeline.GeochronoEtherPainter=function(e,t,i){this._params=e,this._intervalUnit=e.intervalUnit,
this._multiple="multiple"in e?e.multiple:1,this._theme=e.theme},Timeline.GeochronoEtherPainter.prototype.initialize=function(e,t){
this._band=e,this._timeline=t,this._backgroundLayer=e.createLayerDiv(0),this._backgroundLayer.setAttribute("name","ether-background"),
this._backgroundLayer.style.background=this._theme.ether.backgroundColors[e.getIndex()],
this._markerLayer=null,this._lineLayer=null;var i="align"in this._params&&"string"==typeof this._params.align?this._params.align:this._theme.ether.interval.marker[t.isHorizontal()?"hAlign":"vAlign"],r="showLine"in this._params?this._params.showLine:this._theme.ether.interval.line.show;
this._intervalMarkerLayout=new Timeline.GeochronoEtherMarkerLayout(this._timeline,this._band,this._theme,i,r),
this._highlight=new Timeline.EtherHighlight(this._timeline,this._band,this._theme,this._backgroundLayer);
},Timeline.GeochronoEtherPainter.prototype.setHighlight=function(e,t){this._highlight.position(e,t);
},Timeline.GeochronoEtherPainter.prototype.paint=function(){this._markerLayer&&this._band.removeLayerDiv(this._markerLayer),
this._markerLayer=this._band.createLayerDiv(100),this._markerLayer.setAttribute("name","ether-markers"),
this._markerLayer.style.display="none",this._lineLayer&&this._band.removeLayerDiv(this._lineLayer),
this._lineLayer=this._band.createLayerDiv(1),this._lineLayer.setAttribute("name","ether-lines"),
this._lineLayer.style.display="none";var e,t,i=Math.ceil(Timeline.GeochronoUnit.toNumber(this._band.getMinDate())),r=Math.floor(Timeline.GeochronoUnit.toNumber(this._band.getMaxDate()));
!function(n,o){var a;switch(n){case Timeline.GeochronoUnit.AGE:a=Timeline.Geochrono.ages;
break;case Timeline.GeochronoUnit.EPOCH:a=Timeline.Geochrono.epoches;break;case Timeline.GeochronoUnit.PERIOD:
a=Timeline.Geochrono.periods;break;case Timeline.GeochronoUnit.ERA:a=Timeline.Geochrono.eras;
break;case Timeline.GeochronoUnit.EON:a=Timeline.Geochrono.eons;break;default:return t=function(){
return i>0&&i>r},void(e=function(){i-=o})}for(var s=a.length-1;s>0&&!(i<=a[s].start);)s--;
i=a[s].start,t=function(){return s<a.length-1&&i>r},e=function(){s++,i=a[s].start;
}}(this._intervalUnit,this._multiple);for(var n=this._band.getLabeller();;){if(this._intervalMarkerLayout.createIntervalMarker(Timeline.GeochronoUnit.fromNumber(i),n,this._intervalUnit,this._markerLayer,this._lineLayer),
!t())break;e()}this._markerLayer.style.display="block",this._lineLayer.style.display="block";
},Timeline.GeochronoEtherPainter.prototype.softPaint=function(){},Timeline.GeochronoEtherMarkerLayout=function(e,t,i,r,n){
var o=e.isHorizontal();o?"Top"==r?this.positionDiv=function(e,t){e.style.left=t+"px",
e.style.top="0px"}:this.positionDiv=function(e,t){e.style.left=t+"px",e.style.bottom="0px";
}:"Left"==r?this.positionDiv=function(e,t){e.style.top=t+"px",e.style.left="0px"}:this.positionDiv=function(e,t){
e.style.top=t+"px",e.style.right="0px"};var a=i.ether.interval.marker,s=i.ether.interval.line,h=(o?"h":"v")+r,l=a[h+"Styler"],m=a[h+"EmphasizedStyler"];
this.createIntervalMarker=function(i,r,a,h,c){var y=Math.round(t.dateToPixelOffset(i));
if(n){var p=e.getDocument().createElement("div");p.style.position="absolute",s.opacity<100&&SimileAjax.Graphics.setOpacity(p,s.opacity),
o?(p.style.borderLeft="1px solid "+s.color,p.style.left=y+"px",p.style.width="1px",
p.style.top="0px",p.style.height="100%"):(p.style.borderTop="1px solid "+s.color,
p.style.top=y+"px",p.style.height="1px",p.style.left="0px",p.style.width="100%"),
c.appendChild(p)}var _=r.labelInterval(i,a),u=e.getDocument().createElement("div");
return u.innerHTML=_.text,u.style.position="absolute",(_.emphasized?m:l)(u),this.positionDiv(u,y),
h.appendChild(u),u}};