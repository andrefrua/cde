define(["./AnalyzerComponent.ext","../lib/jquery","../lib/moment","./BaseComponent"],function(t,e,i,o){
return o.extend({update:function(){this.clear();var i=this.getOptions(),o=this.isEditMode()?"editor":"viewer";
e.extend(i,{ts:(new Date).getTime()});var s=t.getAnalyzer({solution:this.solution,
path:this.path,action:this.action},o,i),a=this.generateIframe(s);e("#"+this.htmlObject).html(a);
},getOptions:function(){var t=this,o={command:void 0==t.command?"open":t.command,
showFieldList:void 0==t.showFieldList?!1:t.showFieldList,showRepositoryButtons:void 0==t.showRepositoryButtons?!1:t.showRepositoryButtons,
frameless:void 0==t.frameless?!1:t.frameless};void 0==t.dateFormats?{}:t.dateFormats;
var s=t.dashboard;return e.map(t.parameters,function(e){if(o[e[0]]=s.getParameterValue(e[1]),
t.dateFormats[e[0]]){var a=i(o[e[0]]).format(t.dateFormats[e[0]]);"Invalid date"!==a&&(o[e[0]]=a);
}}),o},isEditMode:function(){return void 0!=this.viewOnly?!this.viewOnly||this.editMode:this.editMode;
},generateIframe:function(t){var e=(this.height?this.height:"480px",this.width?this.width:"100%",
"<iframe id ='iframe_"+this.htmlObject+"' style='height:100%;width:100%;border:0px' frameborder='0' src='"+t+"'/>");
return e}})});