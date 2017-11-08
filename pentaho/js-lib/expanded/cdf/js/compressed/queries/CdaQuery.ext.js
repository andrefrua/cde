define(["../dashboard/Dashboard.ext","../lib/jquery"],function(e,r){return{getDoQuery:function(){
return e.getPluginBase("cda")+"/doQuery?"},getUnwrapQuery:function(n){return e.getPluginBase("cda")+"/unwrapQuery?"+r.param(n);
}}});