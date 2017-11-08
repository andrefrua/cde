define(["./InputBaseComponent","../Logger","../lib/jquery","amd!../lib/underscore","../dashboard/Utils","amd!../lib/jquery.chosen","amd!../lib/jquery.multiselect","amd!../lib/jquery.select2"],function(e,t,a,s,n){
return e.extend({visible:!1,draw:function(e){var i=this.placeholder();if(0===i.length)return t.warn("Placeholder not in DOM - Will not draw"),
!1;var l=this.name,r="<select",o=this._allowMultipleValues();o&&(r+=" multiple");var u=this._getPlaceholderText();
u&&(r+=" data-placeholder='"+u+"'");var c=this._getListSize(e);null!=c&&(r+=" size='"+c+"'",
e.length>c&&(r+=" style='overflow-y: scroll;' "));var h=this.externalPlugin;switch(h){
case"chosen":r+=" class='chzn-select'";break;case"hynds":r+=" class='hynds-select'";
break;case"select2":r+=" class='select2-container'"}r+=">";var d,g=this._getParameterValue(),p=n.parseMultipleValues(!s.isNaN(g)&&s.isNumber(g)?g+"":g),f={};
n.eachValuesArray(e,{valueAsId:this.valueAsId},function(e,t,a,s){r+="<option value = '"+n.escapeHtml(e)+"' >"+n.escapeHtml(t)+"</option>",
s||(d=e),f[e]=!0},this),r+="</select>",i.html(r);var m=!0;if(null!=p){for(var v=p.length;v--;)f[p[v]]!==!0&&(m=!1,
p.splice(v,1));p.length||(p=null)}var b=null==p,w=!m;switch(b&&this.defaultIfEmpty&&null!=d&&(p=[d],
w=!0),a("select",i).val(null==p?[]:p),o&&(null!=this.autoTopValue?(this.topValue(this.autoTopValue),
delete this.autoTopValue):null!=this.autoTopIndex&&(this.topIndex(this.autoTopIndex),
delete this.autoTopIndex)),this._doAutoFocus(),w&&(this.dashboard.setParameter(this.parameter,p),
this.dashboard.processChange(l)),h){case"chosen":var x=a.browser;a.browser="",i.find("select.chzn-select").chosen(this._readExtraOptions()),
a.browser=x;break;case"hynds":i.find("select.hynds-select").multiselect({multiple:o
});break;case"select2":var _=this._readExtraOptions()||{};"undefined"==typeof _.dropdownAutoWidth&&(_.dropdownAutoWidth=!0),
_.width||(_.width="off"),i.find("select.select2-container").select2(_)}this._listenElement(i);
},_allowMultipleValues:function(){return!1},_getPlaceholderText:function(){var e=this.placeholderText;
return s.isString(e)&&!s.isEmpty(e)&&e||!1},_getListSize:function(e){return this.size;
},_readExtraOptions:function(){return this.externalPlugin&&this.extraOptions?n.propertiesArrayToObject(this.extraOptions):void 0;
},_listenElement:function(e){var t,s=this,i=s.getValue(),l=function(){t&&t();var e=s.dashboard;
if(e){var a=s.getValue();n.equalValues(i,a)||(i=a,e.processChange(s.name))}},r=a("select",e);
r.keypress(function(e){13===e.which&&l()});var o=this._getChangeMode();if("timeout-focus"!==o)r.on(s._changeTrigger(),l);else{
var u=s.changeTimeoutScrollFraction;u=Math.max(0,null!=u?u:1);var c=s.changeTimeoutChangeFraction;
c=Math.max(0,null!=c?c:5/8);var h,d=Math.max(100,s.changeTimeout||2e3),g=u*d,p=c*d;
t=function(){null!=h&&(clearTimeout(h),h=null)};var f=function(e){t(),s.dashboard&&(h=setTimeout(l,e||d));
};r.change(function(){f(p)}).scroll(function(){f(g)}).focusout(l)}},_getChangeMode:function(){
var e=this.changeMode;if(e)switch(e=e.toLowerCase()){case"immediate":case"focus":
return e;case"timeout-focus":return/android|ipad|iphone/i.test(navigator.userAgent)?"focus":e;
default:t.log("Invalid 'changeMode' value: '"+e+"'.","warn")}return"immediate"},_changeTrigger:function(){
return"immediate"===this._getChangeMode()?"change":/android/i.test(navigator.userAgent)?"change":"focusout";
}})});