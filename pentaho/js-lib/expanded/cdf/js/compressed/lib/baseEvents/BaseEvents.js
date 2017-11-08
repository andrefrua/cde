define(["amd!cdf/lib/underscore","amd!cdf/lib/backbone","cdf/lib/Base"],function(n,e,t){
function r(n){return t.extend.apply(n,a(arguments))}function u(n){return r(n,{},{
extend:t.extend})}function d(n){return r(n,e.Events)}function s(n){return r(d(u(n)),arguments[1],arguments[2]);
}var a=n.rest,c=s(t);return c.extendClass=r,c.convertClass=s,c.extendWithEvents=s,
c});