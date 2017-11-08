define(["../../../AddIn","../trendArrowBase","../../../Dashboard","../../../lib/jquery","css!./trendArrow"],function(e,r,d,a){
var s=new e(a.extend(!0,{},r,{defaults:{cssClass:"arrow",layout:'<div><div class="arrow"></div></div>'
}}));return d.registerGlobalAddIn("Template","templateType",s),s});