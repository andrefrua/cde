define([],function(){return{selectedOnTop:function(e,n){var r;return r=e.getSelection()?"A":"Z",
r+=n},sameOrder:function(e,n){var r;return r=n},sortAlphabetically:function(e,n){
var r;return r=e.get("label")},sortByValue:function(e,n){var r;return r=-e.get("value")||0;
}}});