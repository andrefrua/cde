if("i"!=="I".toLowerCase())throw"I/i problem";var html=function(e){function t(e){
if(x.hasOwnProperty(e))return x[e];var t=e.match(C);if(t)return String.fromCharCode(parseInt(t[1],10));
if(t=e.match(N))return String.fromCharCode(parseInt(t[1],16));if(O&&k.test(e)){O.innerHTML="&"+e+";";
var a=O.textContent;return x[e]=a,a}return"&"+e+";"}function a(e,a){return t(a)}function r(e){
return e.replace(R,"")}function n(e){return e?e.replace(I,a):e}function i(e){return e?(""+e).replace($,"&amp;").replace(F,"&lt;").replace(Y,"&gt;").replace(j,"&#34;"):e;
}function o(e){return e?e.replace(_,"&amp;$1").replace(F,"&lt;").replace(Y,"&gt;"):e;
}function s(e){var t={cdata:e.cdata||e.cdata,comment:e.comment||e.comment,endDoc:e.endDoc||e.endDoc,
endTag:e.endTag||e.endTag,pcdata:e.pcdata||e.pcdata,rcdata:e.rcdata||e.rcdata,startDoc:e.startDoc||e.startDoc,
startTag:e.startTag||e.startTag};return function(e,a){return c(e,t,a)}}function c(e,t,a){
var r=f(e),n={noMoreGT:!1,noMoreEndComments:!1};u(t,r,0,n,a)}function l(e,t,a,r,n){
return function(){u(e,t,a,r,n)}}function u(t,a,r,n,i){try{t.startDoc&&0==r&&t.startDoc(i);
for(var o,s,c,u=r,f=a.length;f>u;){var h=a[u++],m=a[u];switch(h){case"&":G.test(m)?(t.pcdata&&t.pcdata("&"+m,i,X,l(t,a,u,n,i)),
u++):t.pcdata&&t.pcdata("&amp;",i,X,l(t,a,u,n,i));break;case"</":(o=/^([-\w:]+)[^\'\"]*/.exec(m))?o[0].length===m.length&&">"===a[u+1]?(u+=2,
c=o[1].toLowerCase(),t.endTag&&t.endTag(c,i,X,l(t,a,u,n,i))):u=p(a,u,t,i,X,n):t.pcdata&&t.pcdata("&lt;/",i,X,l(t,a,u,n,i));
break;case"<":if(o=/^([-\w:]+)\s*\/?/.exec(m))if(o[0].length===m.length&&">"===a[u+1]){
u+=2,c=o[1].toLowerCase(),t.startTag&&t.startTag(c,[],i,X,l(t,a,u,n,i));var T=e.ELEMENTS[c];
if(T&H){var E={name:c,next:u,eflags:T};u=g(a,E,t,i,X,n)}}else u=d(a,u,t,i,X,n);else t.pcdata&&t.pcdata("&lt;",i,X,l(t,a,u,n,i));
break;case"<!--":if(!n.noMoreEndComments){for(s=u+1;f>s&&(">"!==a[s]||!/--$/.test(a[s-1]));s++);
if(f>s){if(t.comment){var v=a.slice(u,s).join("");t.comment(v.substr(0,v.length-2),i,X,l(t,a,s+1,n,i));
}u=s+1}else n.noMoreEndComments=!0}n.noMoreEndComments&&t.pcdata&&t.pcdata("&lt;!--",i,X,l(t,a,u,n,i));
break;case"<!":if(/^\w/.test(m)){if(!n.noMoreGT){for(s=u+1;f>s&&">"!==a[s];s++);f>s?u=s+1:n.noMoreGT=!0;
}n.noMoreGT&&t.pcdata&&t.pcdata("&lt;!",i,X,l(t,a,u,n,i))}else t.pcdata&&t.pcdata("&lt;!",i,X,l(t,a,u,n,i));
break;case"<?":if(!n.noMoreGT){for(s=u+1;f>s&&">"!==a[s];s++);f>s?u=s+1:n.noMoreGT=!0;
}n.noMoreGT&&t.pcdata&&t.pcdata("&lt;?",i,X,l(t,a,u,n,i));break;case">":t.pcdata&&t.pcdata("&gt;",i,X,l(t,a,u,n,i));
break;case"":break;default:t.pcdata&&t.pcdata(h,i,X,l(t,a,u,n,i))}}t.endDoc&&t.endDoc(i);
}catch(S){if(S!==X)throw S}}function f(e){var t=/(<\/|<\!--|<[!?]|[&<>])/g;if(e+="",
U)return e.split(t);for(var a,r=[],n=0;null!==(a=t.exec(e));)r.push(e.substring(n,a.index)),
r.push(a[0]),n=a.index+a[0].length;return r.push(e.substring(n)),r}function p(e,t,a,r,n,i){
var o=h(e,t);return o?(a.endTag&&a.endTag(o.name,r,n,l(a,e,t,i,r)),o.next):e.length;
}function d(e,t,a,r,n,i){var o=h(e,t);return o?(a.startTag&&a.startTag(o.name,o.attrs,r,n,l(a,e,o.next,i,r)),
o.eflags&H?g(e,o,a,r,n,i):o.next):e.length}function g(t,a,r,n,i,s){var c=t.length;
W.hasOwnProperty(a.name)||(W[a.name]=new RegExp("^"+a.name+"(?:[\\s\\/]|$)","i"));
for(var u=W[a.name],f=a.next,p=a.next+1;c>p&&("</"!==t[p-1]||!u.test(t[p]));p++);
c>p&&(p-=1);var d=t.slice(f,p).join("");if(a.eflags&e.eflags.CDATA)r.cdata&&r.cdata(d,n,i,l(r,t,p,s,n));else{
if(!(a.eflags&e.eflags.RCDATA))throw new Error("bug");r.rcdata&&r.rcdata(o(d),n,i,l(r,t,p,s,n));
}return p}function h(t,a){var r=/^([-\w:]+)/.exec(t[a]),n={};n.name=r[1].toLowerCase(),
n.eflags=e.ELEMENTS[n.name];for(var i=t[a].substr(r[0].length),o=a+1,s=t.length;s>o&&">"!==t[o];o++)i+=t[o];
if(o>=s)return void 0;for(var c=[];""!==i;)if(r=B.exec(i)){if(r[4]&&!r[5]||r[6]&&!r[7]){
for(var l=r[4]||r[6],u=!1,f=[i,t[o++]];s>o;o++){if(u){if(">"===t[o])break}else 0<=t[o].indexOf(l)&&(u=!0);
f.push(t[o])}if(o>=s)break;i=f.join("");continue}var p=r[1].toLowerCase(),d=r[2]?m(r[3]):"";
c.push(p,d),i=i.substr(r[0].length)}else i=i.replace(/^[\s\S][^a-z\s]*/,"");return n.attrs=c,
n.next=o+1,n}function m(e){var t=e.charCodeAt(0);return(34===t||39===t)&&(e=e.substr(1,e.length-2)),
n(r(e))}function T(t){var a,r,n=function(e,t){r||t.push(e)};return s({startDoc:function(e){
a=[],r=!1},startTag:function(n,o,s){if(!r&&e.ELEMENTS.hasOwnProperty(n)){var c=e.ELEMENTS[n];
if(!(c&e.eflags.FOLDABLE)){var l=t(n,o);if(!l)return void(r=!(c&e.eflags.EMPTY));if("object"!=typeof l)throw new Error("tagPolicy did not return object (old API?)");
if(!("attribs"in l))throw new Error("tagPolicy gave no attribs");o=l.attribs;var u,f;
if("tagName"in l?(f=l.tagName,u=e.ELEMENTS[f]):(f=n,u=c),c&e.eflags.OPTIONAL_ENDTAG){
var p=a[a.length-1];!p||p.orig!==n||p.rep===f&&n===f||s.push("</",p.rep,">")}c&e.eflags.EMPTY||a.push({
orig:n,rep:f}),s.push("<",f);for(var d=0,g=o.length;g>d;d+=2){var h=o[d],m=o[d+1];
null!==m&&void 0!==m&&s.push(" ",h,'="',i(m),'"')}s.push(">"),c&e.eflags.EMPTY&&!(u&e.eflags.EMPTY)&&s.push("</",f,">");
}}},endTag:function(t,n){if(r)return void(r=!1);if(e.ELEMENTS.hasOwnProperty(t)){
var i=e.ELEMENTS[t];if(!(i&(e.eflags.EMPTY|e.eflags.FOLDABLE))){var o;if(i&e.eflags.OPTIONAL_ENDTAG)for(o=a.length;--o>=0;){
var s=a[o].orig;if(s===t)break;if(!(e.ELEMENTS[s]&e.eflags.OPTIONAL_ENDTAG))return;
}else for(o=a.length;--o>=0&&a[o].orig!==t;);if(0>o)return;for(var c=a.length;--c>o;){
var l=a[c].rep;e.ELEMENTS[l]&e.eflags.OPTIONAL_ENDTAG||n.push("</",l,">")}o<a.length&&(t=a[o].rep),
a.length=o,n.push("</",t,">")}}},pcdata:n,rcdata:n,cdata:n,endDoc:function(e){for(;a.length;a.length--)e.push("</",a[a.length-1].rep,">");
}})}function E(e,t,a,r,n){if(!n)return null;try{var i=URI.parse(""+e);if(i&&(!i.hasScheme()||V.test(i.getScheme()))){
var o=n(i,t,a,r);return o?o.toString():null}}catch(s){return null}return null}function v(e,t,a,r,n){
if(a||e(t+" removed",{change:"removed",tagName:t}),r!==n){var i="changed";r&&!n?i="removed":!r&&n&&(i="added"),
e(t+"."+a+" "+i,{change:i,tagName:t,attribName:a,oldValue:r,newValue:n})}}function S(e,t,a){
var r;return r=t+"::"+a,e.hasOwnProperty(r)?e[r]:(r="*::"+a,e.hasOwnProperty(r)?e[r]:void 0);
}function w(t,a){return S(e.LOADERTYPES,t,a)}function A(t,a){return S(e.URIEFFECTS,t,a);
}function z(t,a,r,n,i){for(var o=0;o<a.length;o+=2){var s,c=a[o],l=a[o+1],u=l,f=null;
if(s=t+"::"+c,(e.ATTRIBS.hasOwnProperty(s)||(s="*::"+c,e.ATTRIBS.hasOwnProperty(s)))&&(f=e.ATTRIBS[s]),
null!==f)switch(f){case e.atype.NONE:break;case e.atype.SCRIPT:l=null,i&&v(i,t,c,u,l);
break;case e.atype.STYLE:if("undefined"==typeof M){l=null,i&&v(i,t,c,u,l);break}var p=[];
M(l,{declaration:function(t,a){var n=t.toLowerCase();L(n,a,r?function(t){return E(t,e.ueffects.SAME_DOCUMENT,e.ltypes.SANDBOXED,{
TYPE:"CSS",CSS_PROP:n},r)}:null),a.length&&p.push(n+": "+a.join(" "))}}),l=p.length>0?p.join(" ; "):null,
i&&v(i,t,c,u,l);break;case e.atype.ID:case e.atype.IDREF:case e.atype.IDREFS:case e.atype.GLOBAL_NAME:
case e.atype.LOCAL_NAME:case e.atype.CLASSES:l=n?n(l):l,i&&v(i,t,c,u,l);break;case e.atype.URI:
l=E(l,A(t,c),w(t,c),{TYPE:"MARKUP",XML_ATTR:c,XML_TAG:t},r),i&&v(i,t,c,u,l);break;
case e.atype.URI_FRAGMENT:l&&"#"===l.charAt(0)?(l=l.substring(1),l=n?n(l):l,null!==l&&void 0!==l&&(l="#"+l)):l=null,
i&&v(i,t,c,u,l);break;default:l=null,i&&v(i,t,c,u,l)}else l=null,i&&v(i,t,c,u,l);a[o+1]=l;
}return a}function b(t,a,r){return function(n,i){return e.ELEMENTS[n]&e.eflags.UNSAFE?void(r&&v(r,n,void 0,void 0,void 0)):{
attribs:z(n,i,t,a,r)}}}function y(e,t){var a=[];return T(t)(e,a),a.join("")}function P(e,t,a,r){
var n=b(t,a,r);return y(e,n)}var M,L,D;"undefined"!=typeof window&&(M=window.parseCssDeclarations,
L=window.sanitizeCssProperty,D=window.cssSchema);var x={lt:"<",LT:"<",gt:">",GT:">",
amp:"&",AMP:"&",quot:'"',apos:"'",nbsp:" "},C=/^#(\d+)$/,N=/^#x([0-9A-Fa-f]+)$/,k=/^[A-Za-z][A-za-z0-9]+$/,O="undefined"!=typeof window&&window.document?window.document.createElement("textarea"):null,R=/\0/g,I=/&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g,G=/^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/,$=/&/g,_=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,F=/[<]/g,Y=/>/g,j=/\"/g,B=new RegExp("^\\s*([-.:\\w]+)(?:\\s*(=)\\s*((\")[^\"]*(\"|$)|(')[^']*('|$)|(?=[a-z][-\\w]*\\s*=)|[^\"'\\s]*))?","i"),U=3==="a,b".split(/(,)/).length,H=e.eflags.CDATA|e.eflags.RCDATA,X={},W={},V=/^(?:https?|mailto)$/i,Z={};
return Z.escapeAttrib=Z.escapeAttrib=i,Z.makeHtmlSanitizer=Z.makeHtmlSanitizer=T,
Z.makeSaxParser=Z.makeSaxParser=s,Z.makeTagPolicy=Z.makeTagPolicy=b,Z.normalizeRCData=Z.normalizeRCData=o,
Z.sanitize=Z.sanitize=P,Z.sanitizeAttribs=Z.sanitizeAttribs=z,Z.sanitizeWithPolicy=Z.sanitizeWithPolicy=y,
Z.unescapeEntities=Z.unescapeEntities=n,Z}(html4),html_sanitize=html.sanitize;"undefined"!=typeof window&&(window.html=html,
window.html_sanitize=html_sanitize);var Sanitizer={};Sanitizer.escapeAttrib=html.escapeAttrib,
Sanitizer.makeHtmlSanitizer=html.makeHtmlSanitizer,Sanitizer.makeSaxParser=html.makeSaxParser,
Sanitizer.makeTagPolicy=html.makeTagPolicy,Sanitizer.normalizeRCData=html.normalizeRCData,
Sanitizer.sanitizeAttribs=html.sanitizeAttribs,Sanitizer.sanitizeWithPolicy=html.sanitizeWithPolicy,
Sanitizer.unescapeEntities=html.unescapeEntities,Sanitizer.escape=html.escapeAttrib,
Sanitizer.sanitize=function(e,t,a,r){return"string"==typeof e&&(e=e.replace(/<([a-zA-Z]+)([^>]*)\/>/g,"<$1$2></$1>")),
e?html.sanitize(e,t,a,r):e},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=Sanitizer),
exports.Sanitizer=Sanitizer):this.Sanitizer=Sanitizer;