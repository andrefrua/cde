define(["../Logger","./UnmanagedComponent","amd!../lib/underscore","../lib/jquery","css!./AutocompleteBoxComponent"],function(e,t,i,a){
return t.extend({constructor:function(){this.base.apply(this,arguments),this.selectedValues=[];
},result:[],_queryServer:function(t,a){this.parameters||(this.parameters=[]),i.isString(t)&&(this.searchParam=t),
this.searchParam&&this.parameters.push([this.searchParam,this._getInnerParameterName()]),
this.maxResults&&(this.queryDefinition.pageSize=this.maxResults),this.dashboard.setParameter(this._getInnerParameterName(),this._getTextBoxValue()),
this.queryDefinition?this.triggerQuery(this.queryDefinition,a):e.error("No query definition found");
},_getTextBoxValue:function(){return this.textbox.val()},_getInnerParameterName:function(){
return this.parameter+"_textboxValue"},_setInitialValue:function(){var e=this.parameter,t=null;
if(e&&(t=this.dashboard.getParameterValue(e)),null!=t&&i.isArray(t))for(var a=0,s=t.length;s>a;a++)this._selectValue(t[a]);
},update:function(){if(this.lifecycle?this.lifecycle.silent=this.silent===!0:this.lifecycle={
silent:this.silent===!0},this.preExec()){if(this.isSilent()||this.block(),this.ph=this.placeholder().empty(),
0===this.ph.length)return e.warn("Placeholder not in DOM - Will not draw"),!1;this.defaultParameters=i.isArray(this.parameters)?this.parameters.slice():[];
var t=this;i.isFunction(this.processChange)||(this.processChange=function(){t.value=t.selectedValues,
t.dashboard.processChange(t.name)});var s=this.selectMulti||!1;this.dashboard.getParameterValue(this._getInnerParameterName())||this.dashboard.setParameter(this._getInnerParameterName(),""),
this.textbox=a('<input class="autocomplete-input">');var n=a('<div class="autocomplete-container">');
if(s){var o=this.tooltipMessage||"Click it to Apply",r=a('<input type="button" class="autocomplete-input-apply" style="display: none" title="'+o+'" value="'+(this.submitLabel||"S")+'"/>').click(function(){
t._endSearch()});n.append(r)}n.append(this.textbox).append('<ul class="list-data-selection">').appendTo(this.ph),
this.textbox.autocomplete(this._getOptions()),this.ph.find(".autocomplete-container .ui-autocomplete").off("menuselect"),
this.ph.find(".autocomplete-container .ui-autocomplete").on("menuselect",function(e,i){
var n=i?i.item.find("input"):a(e.target).find("input");n.length>0&&n.prop("checked",!n.is(":checked"));
var o=i?i.item.find("a").text():a(e.target).text();s?n.is(":checked")?t._selectValue(o):t._removeValue(o):(t._selectValue(o),
t._endSearch())}),this.textbox.data("ui-autocomplete")._renderItem=function(e,t){
var i=a('<li class="list-item">'),n=a("<a>"+t.label+"</a>");return s&&a('<input type="checkbox"/>').click(function(){
a(this).parent().trigger("menuselect")}).prependTo(n),n.appendTo(i),i.appendTo(e);
},this.ph.find("#"+this.externalApplyButtonId).click(function(){t._endSearch()}),
this._setInitialValue(),this.postExec(),this.isSilent()||this.unblock()}},getValue:function(){
return this.value},_getOptions:function(){var e=this,t={appendTo:this.ph.find(".autocomplete-container"),
minLength:this.minTextLength||0,source:function(t,i){e._search(t,i)},focus:function(e,t){
e.preventDefault()},open:function(t,i){var a=e.scrollHeight||0;a>0&&e.ph.find(".autocomplete-container .ui-autocomplete").css({
"max-height":a+"px","overflow-y":"auto"}),e._filterData()},close:function(t,i){e.processChange();
}};return t},_selectValue:function(e){var t=this,i=null!=this.addTextElements?this.addTextElements:!0,s=null!=this.showApplyButton?this.showApplyButton:!0,n=this.ph.find(".autocomplete-container .list-data-selection"),o=a('<li id="'+e+'"><input type="button" class="close-button" value="x"/>'+e+"</li>");
this.selectMulti?s&&(this.ph.find(".autocomplete-container").addClass("show-apply-button"),
this.ph.find(".autocomplete-input-apply").show()):(n.empty(),this.selectedValues=[]),
o.find("input").click(function(){t._removeValue(e,!0)}),i&&o.appendTo(n),this.selectedValues.push(e);
},_removeValue:function(e,t){this.selectedValues=i.without(this.selectedValues,e),
this.ph.find('.autocomplete-container .list-data-selection li[id="'+e+'"]').remove(),
t&&this.processChange()},_filterData:function(){var e=this.ph.find(".autocomplete-container .ui-autocomplete"),t=this.selectedValues||[],i=null!=this.addTextElements?this.addTextElements:!0;
t.length>0&&(e.find("li").each(function(){var e=a(this),s=e.text();t.indexOf(s)>-1&&(i?e.remove():e.find("input").prop("checked",!0));
}),0==e.find("li").length&&e.hide())},_search:function(e,t){var i=this.matchType||"fromStart",a=e.term.toLowerCase(),s=this;
this._queryServer(a,function(e){s.parameters=s.defaultParameters.slice();var n=e.resultset?e.resultset:e,o=[];
for(var r in n)if(n.hasOwnProperty(r)){var l=n[r][0];(null!=l&&"fromStart"===i&&0==l.toLowerCase().indexOf(a)||"all"===i&&l.toLowerCase().indexOf(a)>-1)&&o.push(l);
}t(o)})},_endSearch:function(){var e=this.ph.find(".autocomplete-container");e.removeClass("show-apply-button"),
e.find(".autocomplete-input-apply").hide(),this.textbox.val(""),this.textbox.autocomplete("close");
},_processAutoBoxChange:function(){this.textbox.autocomplete("change")}})});