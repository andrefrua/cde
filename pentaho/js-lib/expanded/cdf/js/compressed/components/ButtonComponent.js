define(["amd!../lib/underscore","../lib/jquery","./ActionComponent","css!./ButtonComponent"],function(t,e,n){
return n.extend({_docstring:function(){return"Button Component that triggers a server action when clicked";
},render:function(){var n=this;if(e.fn.button.noConflict&&e.fn.button.noConflict(),
"function"==typeof this.successCallback){var s=this.successCallback;this.successCallback=function(){
n.enable(),s.apply(n,arguments)}}else this.successCallback=function(){n.enable()};
if("function"==typeof this.failureCallback){var i=this.failureCallback;this.failureCallback=function(){
n.enable(),i.apply(n,arguments)}}else this.failureCallback=function(){n.enable()};
"undefined"==typeof this.buttonStyle&&(this.buttonStyle="bootstrap"===this.dashboard.getWcdfSettings().rendererType?"bootstrap":"themeroller");
var l=this.cssClass||"";"bootstrap"===this.buttonStyle&&(l="btn-default "+l);var o=e("<button type='button'/>").addClass("buttonComponent "+l).unbind("click").bind("click",function(){
var e=!0;return n.disable(),t.isFunction(n.expression)?(e=n.expression.apply(n,arguments),
n.hasAction()||n.enable()):n.expression||n.hasAction()||n.enable(),n.hasAction()&&e!==!1?n.triggerAction.apply(n):void 0;
});this._isJQueryUiButton()&&o.button(),o.appendTo(this.placeholder().empty()),this.setLabel(this.label),
this.enable(),this._doAutoFocus()},disable:function(){this.placeholder("button").attr("disabled","disabled"),
this.placeholder("button").removeClass("enabled").addClass("disabled")},enable:function(){
this.placeholder("button").removeAttr("disabled"),this.placeholder("button").removeClass("disabled").addClass("enabled");
},setLabel:function(t){var e="function"==typeof t?t.call(this):t||"";this.label=e.toString(),
this._isJQueryUiButton()?this.placeholder("button").button("option","label",this.label):this.placeholder("button").text(this.label);
},_isJQueryUiButton:function(){return t.isUndefined(this.buttonStyle)||"themeroller"===this.buttonStyle;
}})});