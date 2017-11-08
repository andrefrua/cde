define(["./OptiScrollBarEngine","./MCustomScrollBarEngine"],function(r,n){return{
createScrollBar:function(e,c){switch(e){case"optiscroll":return new r(c);case"mCustomScrollbar":
return new n(c)}}}});