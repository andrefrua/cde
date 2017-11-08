define(["../dashboard/Utils","../Logger","./BaseComponent"],function(t,e,n){return n.extend({},{
path:t.getQueryParameter("path"),solution:t.getQueryParameter("solution"),template:t.getQueryParameter("template"),
navigatorResponse:-1,getSolutionJSON:function(t){for(var n=this.navigatorResponse.solution.folders,o=0;o<n.length;o++)if(""==this.solution||n[o].solution==this.solution){
var r=[],a=n[o].folders;void 0!=a&&void 0==a.length?r.push(a):void 0!=a&&a.length>0&&(r=r.concat(a));
var i=n[o].files;return void 0!=i&&void 0==i.length?r.push(i):void 0!=i&&i.length>0&&(r=r.concat(i)),
r}e.error("Fatal: Solution "+t+" not found in navigation object")},browseContent:function(n,o){
for(var r=0;r<n.length;r++){var a=n[r];if("FOLDER"==a.type&&a.path==o)return n=a.folders,
void 0==n?[]:(void 0==n.length&&(n=[n]),n)}e.error("Fatal: path "+(this.path||t.getPathParameter(this.path))+" not found in navigation object");
},getParentSolution:function(){return(this.path||t.getPathParameter(this.path)).length>0?this.solution:"";
},getParentPath:function(){var e=this.path||t.getPathParameter(this.path),n=e.lastIndexOf("/");
if(-1==n)return"";var o=e.substring(0,n);return o},isAncestor:function(t,e){return t!=this.solution?!1:!0;
}})});