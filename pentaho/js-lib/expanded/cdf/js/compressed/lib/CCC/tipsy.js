define(["./protovis-compat!","jquery","./jquery.tipsy"],function(e,t){return!function(){
function n(t){return e.Transform.identity.translate(t.left(),t.top()).times(t.transform());
}function o(e){for(var t,o,i,r=e.instance(),a=r.left,s=r.top,u=r.width,l=r.height;i=e.parent;){
0>a&&(u+=a,a=0),0>s&&(l+=s,s=0),t=r.right,0>t&&(u+=t),o=r.bottom,0>o&&(l+=o);var d=n(i),f=d.k;
a=d.x+f*a,s=d.y+f*s,u=f*u,l=f*l,e=i,r=e.instance()}return{left:a,top:s,width:u,height:l
}}t.fn.tipsy.elementOptions=function(e,n){var o=e.$tooltipOptions;return n=t.extend({},n,o||{},{
gravity:n.gravity})};var i=0;e.Behavior.tipsy=function(n){function a(){var e=L.instance(),t=L.properties.tooltip?e.tooltip:"function"==typeof L.tooltip?L.tooltip():e.title||e.text;
return"function"==typeof t&&(t=t()),t||""}function s(){var e,t,n,i,r=L.instance();
if(L.properties.width){var a=o(L);e=a.left,t=a.top,n=a.width,i=a.height}else{var s,l=L.toScreenTransform();
if(L.properties.outerRadius){var d=r.startAngle+r.angle/2;s=r.outerRadius,e=l.x+r.left+s*Math.cos(d),
t=l.y+r.top+s*Math.sin(d)}else if(L.properties.shapeRadius){s=u().ignoreRadius?0:Math.max(2,r.shapeRadius);
var f=r.left,g=r.top;switch(r.shape){case"diamond":s*=Math.SQRT2;break;case"circle":
s/=Math.SQRT2}e=(f-s)*l.k+l.x,t=(g-s)*l.k+l.y,i=n=2*s*l.k}else e=r.left*l.k+l.x,t=r.top*l.k+l.y;
}var p=Math.ceil(e),c=Math.ceil(t),v=p-e,h=c-t;return n=Math.max(1,Math.floor((n||0)-v)),
i=Math.max(1,Math.floor((i||0)-h)),{left:p,top:c,width:n,height:i}}function u(){return L&&L.tooltipOptions||n;
}function l(){var n=u(),o=e.get(n,"gravity");return o&&"function"==typeof o&&(o=o.call(L)),
r.debug>=21&&r.log("[TIPSY] #"+q+" Update User Gravity "+o),N=o||t.fn.tipsy.defaults.gravity;
}function d(o,i){function a(e){var t=i(e);return s(e,t)}function s(t,i){var r=u(i.left,"width"),a=u(i.top,"height"),s=H&&!n.followMouse;
if(s){var l=new e.Shape.Rect(i.left,i.top,o.width,o.height);s=l.containsPoint(H)}
var d=!s&&r.fits&&a.fits,f=r.value+a.value+(2-t.length)+(s?-1e3:0);return{gravity:t,
width:r,height:a,value:f,isMouseInside:s,isTotal:d,isPartial:r.fits||a.fits}}function u(e,t){
var n=g[t],i=o[t],r=e-d[t],a=n-(r+i),s=r>=0&&a>=0,u=(r>=0?r:4*r)+(a>=0?a:4*a);return{
fits:s,value:u}}if(this!==$[0])throw new Error("Assertion failed.");var l=t(window),d={
width:l.scrollLeft(),height:l.scrollTop()},g={width:l.width(),height:l.height()},p=N;
"c"===p&&(p="w");var c=a(p);if(!c.isTotal){for(var v=J.indexOf(p),h=1,y=J.length;y>h;h++){
var I=(v+h)%y;c=f(c,a(J[I]))}r.debug>=21&&p!==c.gravity&&r.log("[TIPSY] #"+q+" Choosing gravity '"+c.gravity+"' over '"+p+"'"),
p=c.gravity}return r.debug>=21&&r.log("[TIPSY] #"+q+" Gravity '"+p+"'"),p}function f(e,t){
if(e.isTotal){if(!t.isTotal)return e}else if(t.isTotal){if(!e.isTotal)return t}else if(e.isPartial){
if(!t.isPartial)return e}else if(t.isPartial&&!e.isPartial)return t;return t.value>e.value?t:e;
}function g(e){$.css({left:e.left+parseFloat(_.css("padding-left"))+_.scrollLeft(),
top:e.top+parseFloat(_.css("padding-top"))+_.scrollTop(),width:e.width,height:e.height
})}function p(e){r.debug>=20&&r.log("[TIPSY] #"+q+" Creating _id="+U);var o=e.root.canvas();
_=t(o);var i=o.style.position;i&&"static"!==i||(o.style.position="relative"),_.mouseleave(P),
n.usesPoint&&n.followMouse&&e.root.event("mousemove",k),c(),U||(U="tipsyPvBehavior_"+(new Date).getTime());
var a=document.getElementById(U);a||(r.debug>=20&&r.log("[TIPSY] #"+q+" Creating Fake Tip Target="+U),
a=document.createElement("div"),a.id=U,a.className="fakeTipsyTarget",o.appendChild(a));
var s=a.style;s.padding="0px",s.margin="0px",s.position="absolute",s.pointerEvents="none",
s.display="block",s.zIndex=-10,$=t(a),v(),$.removeData("tipsy");var u=Object.create(n);
u.gravity=d,u.delayOut=0,u.trigger="manual",null==n.animate&&(n.animate=n.followMouse?0:400),
$[0].$tooltipOptions=e.tooltipOptions,$.tipsy(u)}function c(){if(j=_.data("tipsy-pv-shared-info")){
var e=_[0].$pvCreateId||0;if(j.createId===e)return void j.behaviors.push(S);j.behaviors.forEach(function(e){
e()})}j={createId:_[0].$pvCreateId||0,behaviors:[S]},_.data("tipsy-pv-shared-info",j);
}function v(){$&&$.css(r.debug>=22?{borderColor:"red",borderWidth:"1px",borderStyle:"solid",
zIndex:1e3}:{borderWidth:"0px",zIndex:-10})}function h(t){t||(t=e.event);var n=5,o=_.offset();
return{left:t.pageX-o.left-n,top:t.pageY-o.top-n,width:10+2*n,height:20}}function y(e){
e||(e=null);var t,n,o;if(e!==L)L=e,e?(F=e.scene,z=m(F,L.index),A=e.renderId()):(A=F=z=null,
r.debug>=20&&r.log("[TIPSY] #"+q+" Cleared Mark"));else{if(!e)return!1;if(F!==(o=e.scene))F=o,
z=m(F,L.index),A=e.renderId();else if(z!==(t=m(F,L.index)))z=t,A=e.renderId();else{
if(A===(n=e.renderId()))return!1;A=n}}return $[0].$tooltipOptions=L&&L.tooltipOptions,
e&&r.debug>=20&&r.log("[TIPSY] #"+q+" Set Mark State to "+e.type+" scenes: #"+F.length+" index: "+z+" renderId: "+A),
!0}function I(e,n){e&&n||(e=n=null);var o=!W&&e||W&&W[0]!==e;o&&(r.debug>=20&&r.log("[TIPSY] #"+q+" "+(e?"Changing target element "+e.tagName+".":"Clearing target element.")),
o&&(W&&(W.off("mousemove",E),W.off("mouseleave",P)),W=e?t(e):null),y(n),W&&(W.mousemove(E),
W.mouseleave(P)))}function b(e,t){var n=t;return"function"==typeof L.getNearestInstanceToMouse&&(t=L.getNearestInstanceToMouse(e,t),
r.debug>=20&&n!==t&&r.log("[TIPSY] #"+q+" Changing index "+n+" to Nearest index "+t)),
m(e,t)}function m(e,t){if("function"==typeof L.getOwnerInstance){var n=t;t=L.getOwnerInstance(e,t),
r.debug>=20&&n!==t&&r.log("[TIPSY] #"+q+" Changing index "+n+" to Owner index "+t);
}return t}function T(){return G++}function w(e){return e===G-1}function P(){var e=T();
r.debug>=20&&r.log("[TIPSY] #"+q+" Delayed Hide Begin opId="+e),Q>0?window.setTimeout(function(){
w(e)?(r.debug>=20&&r.log("[TIPSY] #"+q+" Hiding opId="+e),Y(e)):r.debug>=20&&r.log("[TIPSY] #"+q+" Delayed Hide Cancelled opId="+e);
},Q):(r.debug>=20&&r.log("[TIPSY] #"+q+" Hiding Immediately opId="+e),Y(e))}function S(){
r.debug>=20&&r.log("[TIPSY] #"+q+" Disposing"),x(),$&&($.removeData("tipsy"),$.each(function(e){
e.$tooltipOptions=null}),$.remove(),$=null),_&&(_.off("mouseleave",P),_=null)}function x(){
var e=T();r.debug>=20&&r.log("[TIPSY] #"+q+" Hiding as Other opId="+e),Y(e)}function Y(){
I(null,null),y(null),$&&$.data("tipsy")&&$.tipsy("leave")}function M(){var e=j&&j.behaviors;
e&&e.length>1&&(r.debug>=20&&r.group("[TIPSY] #"+q+" Hiding Others"),e.forEach(function(e){
e!==S&&e()}),r.debug>=20&&r.groupEnd())}function O(t){return H=new e.Shape.Point(t.pageX,t.pageY),
B&&H.distance2(B).cost<=8?(r.debug>=20&&r.log("[TIPSY] #"+q+" mousemove too close"),
!1):!0}function k(){r.debug>=20&&r.group("[TIPSY] #"+q+" doFollowMouse");var t=e.event;
!L||X&&!X(R,L)?(P(),r.debug>=20&&r.groupEnd()):($&&L&&O(t)&&(B=H,g(h(t)),M(),$.tipsy("update")),
r.debug>=20&&r.groupEnd())}function E(t){if($&&O(t)){var o,i=this.$scene;if(i&&(o=i.scenes)&&o.mark&&o.mark===L){
var u=L.renderId(),d=u!==A||o!==F,f=n.followMouse,p=i.index;if(("function"==typeof L.getOwnerInstance||"function"==typeof L.getNearestInstanceToMouse)&&(e.event=t,
L.context(o,p,function(){p=b(o,p)}),e.event=null),d|=p!==z,f||d){var c=T();r.debug>=20&&r.log("[TIPSY] #"+q+" Updating opId="+c),
B=H;var v;f&&(v=h(t)),d&&(A=u,F=o,z=p,L.context(o,p,function(){f||(v=s());var e=a();
r.debug>=20&&r.log("[TIPSY] #"+q+" Update text. Was hidden. Text: "+e.substr(0,50)),
$.tipsy("setTitle",e),l()})),g(v),M(),$.tipsy("update")}else r.debug>=20&&r.log("[TIPSY] #"+q+" !followMouse and same scene");
}else r.debug>=20&&r.log("[TIPSY] #"+q+" mousemove on != mark")}}function C(e){_||p(e),
e._tipsy!==R&&(r.debug>=20&&r.log("[TIPSY] #"+q+" Initializing mark"),e._tipsy=R,
n.usesPoint&&e.event("unpoint",function(){r.debug>=20&&r.group("[TIPSY] #"+q+" unpoint"),
P(),r.debug>=20&&r.groupEnd()}))}function D(t){function o(){var e=a();r.debug>=20&&r.log("[TIPSY] #"+q+" Set Text: "+e.substr(0,50)),
$.tipsy("setTitle",e),g(n.followMouse?h():s()),l()}var i=T();r.debug>=20&&r.group("[TIPSY] #"+q+" ShowTipsy opId="+i),
C(t);var u=!L;n.usesPoint?y(t):I(e.event.target,t);var d=e.event;O(d),B=H,t.index!==z?t.context(F,z,o):o(),
M(),$.tipsy(u?"enter":"update"),r.debug>=20&&r.groupEnd()}function R(){var e=this;
(!X||X(R,e))&&D(e)}n||(n={});var $,B,H,N,A,z,F,U,_,j,W=null,q=i++,G=0,L=null,Q=n.delayOut,X=n.isEnabled,J=["nw","n","ne","e","se","s","sw","w"];
return R};var r=e.Behavior.tipsy;r.debug=0,r.setDebug=function(e){r.debug=e},r.log=function(e){
"undefined"!=typeof console&&console.log(""+e)},r.group=function(e){"undefined"!=typeof console&&console.group(""+e);
},r.groupEnd=function(){"undefined"!=typeof console&&console.groupEnd()},r.disposeAll=function(e){
var n=e&&e.root;if(n&&n.scene){var o=n.canvas();if(o){var i=t(o),a=i.data("tipsy-pv-shared-info");
a&&(a.behaviors&&a.behaviors.forEach(function(e){e()}),i.removeData("tipsy-pv-shared-info"));
}}r.removeAll()},r.removeAll=function(){t(".tipsy").remove()}}(),e.Behavior.tipsy;
});