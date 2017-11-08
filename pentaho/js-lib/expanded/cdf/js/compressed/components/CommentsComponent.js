define(["./CommentsComponent.ext","../lib/mustache","amd!../lib/underscore","amd!../lib/backbone","./BaseComponent","../Logger","../lib/jquery","css!./CommentsComponent"],function(e,t,i,n,s,o,a){
return s.extend({processing:function(){var s={};return s.defaults={dataTemplates:{
comments:'<div class="commentsDetails"> {{#user}} {{{user}}}, {{/user}} {{{createdOn}}}</div><div class="commentsBody"> <div class="comment">   {{{comment}}} </div> {{#user}} <div class="operation"> {{#permissions.deletePermission}}   <div class="delete">X</div> {{/permissions.deletePermission}} {{#permissions.archive}}  <div class="archive">X</div> {{/permissions.archive}} </div> {{/user}}</div>',
addComments:'<div class="commentsAdd">{{#add}} <div class="addComment">Add Comment</div> <div class="addCommentWrapper">   <textarea class=addCommentText></textarea>   <div class="commentsButtons">   <div class="saveComment disabled">Save</div>   <div class="cancelComment">Cancel</div>   </div> </div>{{/add}}</div>',
paginateComments:'<div class="paginate commentPaginate"> {{#active}} <div class="navigateRefresh"> Refresh </div> <div class="navigatePrevious"> Newest Comments </div> <div class="navigateNext"> Oldest Comments </div>{{/active}}</div>'
}},s.operations={processOperation:function(e,t,i,n,s){var o={};switch(e){case"LIST_ALL":
o={data:{action:"list",page:s.page,firstResult:s.paginate.firstResult,maxResults:s.paginate.maxResults,
where:!1}};break;case"LIST_ACTIVE":o={data:{action:"list",page:s.page,firstResult:s.paginate.firstResult,
maxResults:s.paginate.maxResults}};break;case"GET_LAST":o={data:{action:"list",page:s.page,
firstResult:0,maxResults:1}};break;case"DELETE_COMMENT":o={data:{action:"delete",
page:s.page,commentId:t}};break;case"ARCHIVE_COMMENT":o={data:{action:"archive",page:s.page,
commentId:t}};break;case"ADD_COMMENT":o={data:{action:"add",page:s.page,comment:t
}}}this.requestProcessing(o,e,i,n)},requestProcessing:function(t,n,s,o){var m=this;
t=t||{};var l={type:"GET",url:e.getComments(n),success:function(e){m.requestResponse(e,n,s,o);
},dataType:"json"};l=i.extend({},l,t),a.ajax(l)},resetCollection:function(e){for(var t=s.options.paginate,i=t.activePageNumber*t.pageCommentsSize,n=i+t.pageCommentsSize<e.length?i+t.pageCommentsSize:e.length,o=[],a=i;n>a;a++){
var m=new s.CommentModel(e[a]);o.push(m)}return o},requestResponse:function(e,t,i,n){
if("LIST_ALL"==t||"LIST_ACTIVE"==t){var o=s.options.paginate;o.activePageNumber>0&&o.activePageNumber+1>Math.ceil(e.result.length/o.pageCommentsSize)&&o.activePageNumber--,
s.options.queryResult=e.result,i.reset(this.resetCollection(e.result)),0==o.activePageNumber&&e&&"undefined"!=typeof e.result&&0==e.result.length&&(e.result=[{
id:0,comment:"No Comments to show!",createdOn:"",elapsedMinutes:"",isArchived:!1,
isDeleted:!1,isMe:!0,page:"",user:"",permissions:{add:!1,archive:!1,remove:!1}}],
i&&"undefined"!=typeof i&&i.reset(this.resetCollection(e.result)))}n&&"undefined"!=typeof n&&n.apply(this,[e,i]);
}},s.CommentModel=n.Model.extend({defaults:{id:0,comment:"Guest User",createdOn:"",
elapsedMinutes:"",isArchived:!1,isDeleted:!1,isMe:!0,page:"comments",user:"comments",
permissions:{}},initialize:function(){this.set("permissions",s.options.permissions);
}}),s.CommentView=n.View.extend({tagName:"div",className:"commentView",events:{"click .delete":"deleteComment",
"click .archive":"archiveComment"},initialize:function(e){i.bindAll(this,"render","deleteComment","archiveComment"),
this.model=e},render:function(){return this.$el.append(t.render(s.defaults.dataTemplates.comments,this.attributes)),
this.$el},deleteComment:function(){var e=function(e,t){s.operations.processOperation("LIST_ACTIVE",null,t,null,s.options);
};s.operations.processOperation("DELETE_COMMENT",this.model.get("id"),this.model.collection,e,s.options);
},archiveComment:function(){var e=function(e,t){s.operations.processOperation("LIST_ACTIVE",null,t,null,s.options);
};s.operations.processOperation("ARCHIVE_COMMENT",this.model.get("id"),this.model.collection,e,s.options);
}}),s.CommentsCollection=n.Collection.extend({model:s.CommentModel}),s.CommentsView=n.View.extend({
tagName:"div",className:"commentComponent",events:{"click .addComment":"addComment",
"click .saveComment.enabled":"saveComment","click .cancelComment":"cancelComment",
"click .navigatePrevious.enabled":"navigatePrevious","click .navigateNext.enabled":"navigateNext",
"click .navigateRefresh":"navigateRefresh"},initialize:function(e){i.bindAll(this,"render","addComment","saveComment","cancelComment","renderComments","renderSingeComment","addComment","saveComment","cancelComment","navigateNext","navigatePrevious","commentsUpdateNotification"),
this.collection=e,this.collection.on("reset",this.renderComments),this.collection.on("commentsUpdateNotification",this.commentsUpdateNotification),
this.render()},render:function(){var e=a("#"+s.options.htmlObject),n=a("<div/>").addClass("commentsGroup");
i(this.collection.models).each(function(e){n.append(this.renderSingeComment(e))},this);
var o=a(t.render(s.defaults.dataTemplates.addComments,s.options.permissions));this.bindSaveToTextArea(o);
var m=a(t.render(s.defaults.dataTemplates.paginateComments,s.options.paginate));this.$el.empty().append(n,o,m),
e.html(this.$el),this.updateNavigateButtons()},bindSaveToTextArea:function(e){var t=e.find(".addCommentText"),i=e.find(".saveComment"),n=this;
t.keyup(function(e){0!=t.val().length?n.toggleElement(i,!0):n.toggleElement(i,!1);
})},renderComments:function(){var e=a("#"+s.options.htmlObject+" > div .commentsGroup");
e.empty(),i(this.collection.models).each(function(t){e.append(this.renderSingeComment(t));
},this)},renderSingeComment:function(e){var t=new s.CommentView(e);return t.render();
},addComment:function(){this.showAddComment()},saveComment:function(){var e=this,t=this.$el.find(".addCommentText").val(),i=function(t,i){
e.hideAddComment();var n=s.options.paginate;n.activePageNumber=0,s.operations.processOperation("LIST_ACTIVE",null,i,null,s.options);
};s.operations.processOperation("ADD_COMMENT",t,this.collection,i,s.options)},cancelComment:function(){
this.hideAddComment()},navigateNext:function(){var e=s.options.paginate,t=e.activePageNumber*e.pageCommentsSize;
t+e.pageCommentsSize<s.options.queryResult.length&&(e.activePageNumber++,this.collection.reset(s.operations.resetCollection(s.options.queryResult))),
this.commentsUpdateNotification(),this.updateNavigateButtons()},navigatePrevious:function(){
var e=s.options.paginate;e.activePageNumber;e.activePageNumber>0&&(e.activePageNumber--,
this.collection.reset(s.operations.resetCollection(s.options.queryResult))),this.commentsUpdateNotification(),
this.updateNavigateButtons()},navigateRefresh:function(){s.options.paginate;s.options.paginate.activePageNumber=0,
s.operations.processOperation("LIST_ACTIVE",null,this.collection,null,s.options),
this.$el.find("div.navigateRefreshPopup:first").remove(),this.$el.find("div.navigateRefresh:first").stop();
},updateNavigateButtons:function(){var e=s.options.paginate;this.toggleElement(this.$el.find(".navigatePrevious"),!1),
this.toggleElement(this.$el.find(".navigateNext"),!1),e.activePageNumber>0&&this.toggleElement(this.$el.find(".navigatePrevious"),!0),
e.activePageNumber+1<Math.ceil(s.options.queryResult.length/e.pageCommentsSize)&&this.toggleElement(this.$el.find(".navigateNext"),!0);
},toggleElement:function(e,t){e.toggleClass("disabled",!t),e.toggleClass("enabled",!!t);
},commentsUpdateNotification:function(){if(s.options.queryResult.length>0){var e=s.options.queryResult[0].createdOn,t=function(t){
if(t.result.length>0)if(t.result[0].createdOn==e);else{var i=this.$el.find("div.navigateRefresh:first");
if(!this.$el.find("div.navigateRefreshPopup:first").length){var n=a("<div>").attr("class","navigateRefreshPopup").css("position","absolute").html("New comments, please refresh!").hide();
i.prepend(n);var s=i.position();n.offset({top:s.top-(n.height()+i.height()/2),left:s.left+i.width()/2-n.width()/2
}).toggle("bounce",{times:3},"slow");var o=setInterval(function(){i.effect("highlight",{
color:"#c0c0c0"},2e3)},4e3);i.on("click",function(){clearInterval(o)})}}};s.operations.processOperation("GET_LAST",null,null,i.bind(t,this),s.options);
}},showAddComment:function(){this.$el.find(".addCommentWrapper").show(),this.$el.find(".paginate").hide(),
this.$el.find(".addCommentText").val(""),this.toggleElement(this.$el.find(".saveComment"),!1);
},hideAddComment:function(){this.$el.find(".addCommentWrapper").hide(),this.$el.find(".paginate").show(),
this.$el.find(".addCommentText").val(""),this.toggleElement(this.$el.find(".saveComment"),!1);
}}),s.start=function(e){if(s.options=e,s.defaults=i.extend({},s.defaults,e.defaults),
s.commentsCollection=new s.CommentsCollection,s.operations.processOperation("LIST_ACTIVE",null,s.commentsCollection,null,s.options),
s.commentsView=new s.CommentsView(s.commentsCollection),s.options.intervalActive){
setInterval(function(){s.commentsCollection.trigger("commentsUpdateNotification");
},s.options.interval)}},s},update:function(){return this.paginateActive="undefined"==typeof this.paginate?!0:this.paginate,
this.pageCommentsSize="undefined"==typeof this.pageCommentsSize?10:this.pageCommentsSize,
this.firstResult="undefined"==typeof this.firstResult?0:this.firstResult,this.maxResults="undefined"==typeof this.maxResults?100:this.maxResults,
this.interval="undefined"==typeof this.interval?6e4:this.interval,this.intervalActive="undefined"==typeof this.intervalActive?!0:this.intervalActive,
this.addPermission="undefined"==typeof this.addPermission?!0:this.addPermission,this.deletePermission="undefined"==typeof this.deletePermission?!1:this.deletePermission,
this.archivePermission="undefined"==typeof this.archivePermission?!0:this.archivePermission,
this.options="undefined"==typeof this.options?{}:this.options,void 0==this.page?void o.error("Fatal - no page definition passed"):void this.processing().start({
htmlObject:this.htmlObject,page:this.page,intervalActive:this.intervalActive,interval:this.interval,
paginate:{active:this.paginateActive,activePageNumber:0,pageCommentsSize:this.pageCommentsSize,
firstResult:this.firstResult,maxResults:this.maxResults},permissions:{add:this.addPermission,
deletePermission:this.deletePermission,archive:this.archivePermission},defaults:this.options
})}})});