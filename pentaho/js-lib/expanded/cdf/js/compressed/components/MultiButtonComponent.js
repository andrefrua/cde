define(["../lib/jquery","./ToggleButtonBaseComponent","../dashboard/Utils","css!./MultiButtonComponent.css"],function(t,e,n){
function o(t){return"pentaho-toggle-button pentaho-toggle-button-up "+(t?"pentaho-toggle-button-vertical":"pentaho-toggle-button-horizontal");
}function i(t){return"pentaho-toggle-button pentaho-toggle-button-down "+(t?"pentaho-toggle-button-vertical":"pentaho-toggle-button-horizontal");
}function l(t){return"pentaho-toggle-button pentaho-toggle-button-up "+(t?"pentaho-toggle-button-vertical":"pentaho-toggle-button-horizontal");
}function a(t,e,n){return 0==t&&1==e?" pentaho-toggle-button-single":0==t?n?" pentaho-toggle-button-vertical-first":" pentaho-toggle-button-horizontal-first":t==e-1?n?" pentaho-toggle-button-vertical-last":" pentaho-toggle-button-horizontal-last":"";
}function r(){return"pentaho-toggle-button"}function u(){return"pentaho-toggle-button-up-hovering";
}return e.extend({indexes:[],draw:function(e){this.cachedArray=e;var i,l=this,s=o(l.verticalOrientation),h="",c=l.valueAsId?1:0,g=1;
void 0==l.isMultiple&&(l.isMultiple=!1);var p=t("<div>");p.appendTo(l.placeholder().empty());
for(var d=0,f=e.length;f>d;d++){var v,b=e[d][c],m=e[d][g],x=s+a(d,f,l.verticalOrientation);
b=null==b?null:b.replace('"',"&quot;"),m=null==m?null:m.replace('"',"&quot;"),0==d&&(i=b),
h="<div class='"+x+"'><button type='button' name='"+l.name+"'>"+m+"</button  ></div>",
v=t(h),function(t){v.click(function(){l.clickButton(l.htmlObject,l.name,t,l.isMultiple,l.verticalOrientation);
})}(d),p.append(v);var y=l.separator;void 0!=y&&null!=y&&"null"!=y&&d!=e.length-1&&p.append(y);
}var A,B=n.ev(l.dashboard.getParameterValue(l.parameter)),M=!1;A=null==B||void 0==B?[]:B instanceof Array||"object"==typeof B&&B.join?B:B.toString().split("|");
var I=!1;l.clearSelections(l.htmlObject,l.name,l.verticalOrientation);for(var d=0;d<e.length;d++){
M=!1;for(var O=0,j=A.length;j>O&&!(M=A[O]==e[d][c]);O++);if((t.isArray(B)&&M||M||e[d][c]==B||e[d][g]==B)&&(l.clickButton(l.htmlObject,l.name,d,l.isMultiple,l.verticalOrientation,!0),
I=!0,!l.isMultiple))break}(!I&&!l.isMultiple||!I&&l.isMultiple&&l.defaultIfEmpty)&&e.length>0&&((null==B||""==B||B!==i&&1==e.length||"object"==typeof B&&0==B.length)&&l.parameter&&l.dashboard.fireChange(l.parameter,l.isMultiple?[i]:i),
l.clickButton(l.htmlObject,l.name,0,l.isMultiple,l.verticalOrientation,!0)),t("."+r()).hover(function(){
t(l).addClass(u())},function(){t(l).removeClass(u())}),t("."+r()+" button").hover(function(){
t(l).parent().addClass(u())},function(){}),l._doAutoFocus()},getValue:function(){
var t=this;if(t.isMultiple){var e=t.getSelectedIndex(t.name),n=new Array;if(void 0==e.length)n.push(t.getValueByIdx(e));else for(var o=0;o<e.length;o++)n.push(t.getValueByIdx(e[o]));
return n}return t.getValueByIdx(t.getSelectedIndex(t.name))},getValueByIdx:function(t){
return this.cachedArray[t][this.valueAsId?1:0]},clickButton:function(e,n,o,r,u,s){
var h=l(u),c=i(u),g=t("#"+e+" button");if(r){void 0==this.indexes[n]?this.indexes[n]=[]:t.isArray(this.indexes[n])||(this.indexes[n]=[this.indexes[n]]);
for(var p=!1,d=0;d<this.indexes[n].length;++d)if(this.indexes[n][d]==o){p=!0,this.indexes[n].splice(d,1);
break}p?g[o].parentNode.className=h+a(o,g.length,u):(g[o].parentNode.className=c+a(o,g.length,u),
this.indexes[n].push(o))}else{if(this.indexes[n]===o)return!1;this.clearSelections(e,n,u),
this.indexes[n]=o,g[o].parentNode.className=c+a(o,g.length,u)}s||this.callAjaxAfterRender(this,n);
},clearSelections:function(e,n,o){for(var i=t("#"+e+" button"),r=l(o),u=0;u<i.length;u++)i[u].parentNode.className=r+a(u,i.length,o);
this.indexes[n]=[]},getSelectedIndex:function(t){return this.indexes[t]}})});