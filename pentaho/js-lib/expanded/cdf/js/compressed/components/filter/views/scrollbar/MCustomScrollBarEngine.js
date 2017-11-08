define(["./AbstractScrollBarHandler","../../../../lib/jquery","amd!../../../../lib/jquery.mCustomScrollbar"],function(l,r){
return l.extend({scrollbar:null,constructor:function(l){var o=r.extend(!0,{},l.config.view.scrollbar.options,{
callbacks:{onTotalScroll:function(){return l.trigger("scroll:reached:bottom",l.model);
},onTotalScrollBack:function(){return l.trigger("scroll:reached:top",l.model)}}});
this.scrollbar=l.$(l.config.view.slots.children).parent().mCustomScrollbar(o)},scrollToPosition:function(l){
this.scrollbar.mCustomScrollbar("scrollTo",l,{callbacks:!1})}})});