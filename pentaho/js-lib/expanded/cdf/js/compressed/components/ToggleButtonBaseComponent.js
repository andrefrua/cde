define(["../lib/jquery","./InputBaseComponent"],function(e,a){return a.extend({draw:function(a){
var r=this,t=r.dashboard.getParameterValue(r.parameter);t="function"==typeof t?t():t;
var o=!1,n=[];null==t||void 0==t?n=[]:t instanceof Array||"object"==typeof t&&t.join?n=t:"string"==typeof t&&(n=t.split("|"));
var l=0==r.valueAsId?0:1,p=!1;e:for(var c=0;c<n.length;c++)for(var d=0;d<a.length;d++)if(n[c]==a[d][l]){
p=!0;break e}!p&&r.defaultIfEmpty&&(n=[a[0][l]],r.currentVal=n,r.dashboard.setParameter(r.parameter,n),
r.dashboard.processChange(r.name));for(var i=r.verticalOrientation?"toggleGroup vertical":"toggleGroup horizontal",s=e("<ul/>").attr({
"class":i}),c=0,u=a.length;u>c;c++){var f=e("<li/>").attr({"class":i}),h=e("<input/>").click(function(){
r.callAjaxAfterRender(r,r.name)});o=!1;for(var m=0,v=n.length;v>m&&!(o=n[m]==a[c][l]);m++);
"radio"==r.type||"radiocomponent"==r.type.toLowerCase()?((0==c&&!p||p&&a[c][l]==t)&&h.prop("checked",!0),
h.attr({type:"radio"})):((0==c&&!p&&r.defaultIfEmpty||p&&o)&&h.prop("checked",!0),
h.attr({type:"checkbox"})),h.attr({"class":r.name,name:r.name,id:r.name+c,value:a[c][l]
}),h.appendTo(f),f.append(e("<label/>").attr({"for":r.name+c}).html(a[c][1])),s.append(f).append(void 0==r.separator||null==r.separator||"null"==r.separator?"":r.separator);
}r.placeholder().html(s),r.currentVal=null,r._doAutoFocus()},callAjaxAfterRender:function(e,a){
var r=e;setTimeout(function(){r.dashboard.processChange(a)},1)}})});