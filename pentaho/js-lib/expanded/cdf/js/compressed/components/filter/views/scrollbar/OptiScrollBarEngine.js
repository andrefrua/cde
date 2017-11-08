define(["./AbstractScrollBarHandler","../../../../lib/jquery"],function(o,r){return o.extend({
scrollbar:null,constructor:function(o){this.scrollbar=o.$(o.config.view.slots.children).addClass("optiscroll-content").parent().addClass("optiscroll").optiscroll().off("scrollreachbottom").on("scrollreachbottom",function(r){
return o.trigger("scroll:reached:bottom",o.model,r)}).off("scrollreachtop").on("scrollreachtop",function(r){
return o.trigger("scroll:reached:top",o.model,r)}).data("optiscroll")},scrollToPosition:function(o){
this.scrollbar.scrollIntoView(o)}})});