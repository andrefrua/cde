define(["./SchedulePrptComponent.ext","./PrptComponent","../lib/jquery","amd!../lib/underscore","amd!../lib/jquery.impromptu","css!./SchedulePrptComponent"],function(e,t,a,r){
return t.extend({visible:!1,update:function(){var e=this,t=this.placeholder();t[0]&&a.inArray(t[0].tagName.toUpperCase(),["SPAN","DIV"])>-1&&(t=a("<button/>").appendTo(t.empty()),
"DIV"==t[0].tagName&&t.wrap("<span/>"),void 0!=this.label&&t.text(this.label),t.button(),
t.addClass("scheduler_button")),t.unbind("click"),t.bind("click",function(){var t="undefined"==typeof e.preChange?!0:e.preChange();
t&&e.schedulePrptComponent(),"undefined"!=typeof e.postChange&&e.postChange()})},
createJobParameter:function(e,t,a,r,n){return r||void 0==this.getReportOptions()[e]?{
name:e,stringValue:n?t:new Array(""+t),type:a}:{name:e,stringValue:n?this.getReportOptions()[e]:new Array(""+this.getReportOptions()[e]),
type:a}},scheduleRequest:function(t){var n=this.outputTarget?this.outputTarget:"table/html;page-mode=page",i=new Array,o=0;
i[o++]=this.createJobParameter("output-target",n,"string",!0),i[o++]=this.createJobParameter("accepted-page","0","string"),
i[o++]=this.createJobParameter("showParameters","true","string"),i[o++]=this.createJobParameter("renderMode","XML","string"),
i[o++]=this.createJobParameter("htmlProportionalWidth","false","string"),t&&(i[o++]=this.createJobParameter("_SCH_EMAIL_TO",a("#toInput").val(),"string"),
i[o++]=this.createJobParameter("_SCH_EMAIL_CC","","string"),i[o++]=this.createJobParameter("_SCH_EMAIL_BCC","","string"),
i[o++]=this.createJobParameter("_SCH_EMAIL_SUBJECT",a("#subjectInput").val(),"string"),
i[o++]=this.createJobParameter("_SCH_EMAIL_MESSAGE",a("#messageInput").val(),"string"),
i[o++]=this.createJobParameter("_SCH_EMAIL_ATTACHMENT_NAME",a("#attachmentNameInput").val(),"string"));
for(var s=0;s<this.parameters.length;s++){var l=this.extractParameter(this.parameters[s]),d=r.isArray(l.value);
i[o++]=this.createJobParameter(l.name,l.value,d?"string[]":"string",!0,d)}this.scheduleParameters=this.scheduleParameters||{},
this.scheduleParameters.jobParameters=i;var c=!1;return a.ajax({url:e.getScheduledJob(),
async:!1,type:"POST",data:JSON.stringify(this.scheduleParameters),contentType:"application/json",
success:function(e){alert("Successfully scheduled."),c=!0,this.scheduleParameters={};
},error:function(e){alert(e.responseText),c=!1,this.scheduleParameters={}}}),c},schedulePrptComponent:function(){
this.scheduleParameters={};var t,r=!1,n=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){
var t=16*Math.random()|0,a="x"==e?t:3&t|8;return a.toString(16)})},i=function(e,t){
r=!0,a(t).css("backgroundColor","rgb(255,159,159)");var n=a(t).val();a(t).val(e),
setTimeout(function(){a(t).css("backgroundColor","white"),a(t).val(n)},2e3)},o=function(){
var e=P.path;return e.substring(e.lastIndexOf("/")+1,e.lastIndexOf("."))},s=function(){
return"/home/"+P.dashboard.context.user},l=function(){var e=a("#hours").val();return"pm"==a("#amPm").val()?(e=parseInt(e,10)+12,
24==e&&(e=12)):"12"==e&&(e=0),e},d=function(e,t){var a=e.split("/");return t?new Date(a[2],a[0]-1,a[1],23,59,59,0).getTime():new Date(a[2],a[0]-1,a[1],0,0,0,0).getTime();
},c=function(e){var t=e.split("/");return new Date(t[2],t[0]-1,t[1],0,0,0,0).toISOString();
},p=function(e,t,a,r){for(var n='<select id ="'+r+'">',i=e;t>=i;i+=a)n+=10>i?'<option value="'+i+'">0'+i+"</option>":'<option value="'+i+'">'+i+"</option>";
return n+="</select>"},u=function(e,t){var a=new Date;(isNaN(e)||e<a.getTime())&&i("Incorrect Date, pick date from calendar",t);
},m=function(e,t){if(a("#endByRadio").is(":checked")){var r=new Date,n=a("#rangeStartIn").val(),o=d(n);
isNaN(o)||(o>e?i("End Date > Start Date",t):(isNaN(e)||e<r.getTime())&&i("Incorrect Date",t));
}},y=function(e){""==e&&i("You must choose a name","#nameIn");var t=/[^0-9a-zA-Z ]/;
e.match(t)&&i("Invalid characters, alpha-numeric text only.","#nameIn")},h=function(e){
var t,r=l(),n=a("#minutes").val(),i=6e4*n+36e5*r;return void 0!=e?(t=d(a(e).val())+i,
u(t,e)):(t=d(a("#rangeStartIn").val())+i,u(t,"#rangeStartIn")),new Date(t).toISOString();
},v=function(){var e=d(a("#endByIn").val(),!0);return m(e,"#endByIn"),new Date(e).toISOString();
},b=function(){var e=new Array,t=0;return a("#sunday").is(":checked")&&(e[t++]=0),
a("#monday").is(":checked")&&(e[t++]=1),a("#tuesday").is(":checked")&&(e[t++]=2),
a("#wednesday").is(":checked")&&(e[t++]=3),a("#thursday").is(":checked")&&(e[t++]=4),
a("#friday").is(":checked")&&(e[t++]=5),a("#saturday").is(":checked")&&(e[t++]=6),
e},f=function(){var e=a("#recurrPatternIn").val();return 1>e?i(">0","#recurrPatternIn"):e>31&&i("<=31","#recurrPatternIn"),
e},g=function(){P.scheduleParameters={inputFile:P.path,jobName:a("#nameIn").val(),
outputFile:a("#locationIn").val()},r=!1;var e=a("#recurrId").val(),t=a("#nameIn").val();
switch(y(t),e){case"once":var n=h("#startDateIn"),o={repeatCount:0,repeatInterval:0,
startTime:n,uiPassParam:"RUN_ONCE"};P.scheduleParameters.simpleJobTrigger=o;break;
case"seconds":var n=h(),s=a("#recurrPatternInSec").val();if(1>s&&i(">0","#recurrPatternInSec"),
a("#endByRadio").is(":checked"))var l=v();var o={endTime:l,repeatCount:-1,repeatInterval:s,
startTime:n,uiPassParam:"SECONDS"};P.scheduleParameters.simpleJobTrigger=o;break;case"minutes":
var n=h(),d=a("#recurrPatternInMin").val();if(1>d&&i(">0","#recurrPatternInMin"),
a("#endByRadio").is(":checked"))var l=v();var o={endTime:l,repeatCount:-1,repeatInterval:60*d,
startTime:n,uiPassParam:"MINUTES"};P.scheduleParameters.simpleJobTrigger=o;break;case"hours":
var n=h(),p=a("#recurrPatternInHour").val();if(1>p&&i(">0","#recurrPatternInHour"),
a("#endByRadio").is(":checked"))var l=v();var o={endTime:l,repeatCount:-1,repeatInterval:3600*p,
startTime:n,uiPassParam:"HOURS"};P.scheduleParameters.simpleJobTrigger=o;break;case"daily":
if(a("#endByRadio").is(":checked"))var l=v();var n=h();if(a("#weekDayRadio").is(":checked")){
var u={daysOfWeek:[1,2,3,4,5],endTime:l,startTime:n,uiPassParam:"DAILY"};P.scheduleParameters.complexJobTrigger=u;
}else if(a("#dayRadio").is(":checked")){var m=a("#recurrPatternInDay").val();1>m&&i(">0","#recurrPatternInDay");
var o={entTime:l,repeatCount:-1,repeatInterval:86400*m,startTime:n,uiPassParam:"DAILY"
};P.scheduleParameters.simpleJobTrigger=o}break;case"weekly":var n=h();if(a("#endByRadio").is(":checked"))var l=v();
var u={daysOfWeek:b(),endTime:l,startTime:n,uiPassParam:"WEEKLY"};P.scheduleParameters.complexJobTrigger=u;
break;case"monthly":var n=h();if(a("#endByRadio").is(":checked"))var l=v();var u={
endTime:l,startTime:n,uiPassParam:"MONTHLY"};a("#monthRadio").is(":checked")?u.daysOfMonth=f():(u.daysOfWeek=a("#monthOpt2Select").val(),
u.weeksOfMonth=a("#monthOpt1Select").val()),P.scheduleParameters.complexJobTrigger=u;
break;case"yearly":var n=h();if(a("#endByRadio").is(":checked"))var l=v();var u={
endTime:l,startTime:n,uiPassParam:"YEARLY"};a("#yearRadio").is(":checked")?(u.daysOfMonth=f(),
u.monthsOfYear=a("#yearEveryMonth").val()):(u.daysOfWeek=a("#yearOpt2Select").val(),
u.monthsOfYear=a("#yearMonthSelect").val(),u.weeksOfMonth=a("#yearOpt1Select").val()),
P.scheduleParameters.complexJobTrigger=u;break;case"cron":var g=a("#cronString").val();
k(g);var n=c(a("#rangeStartIn").val());a("#endByRadio").is(":checked")&&(l=v());var w={
cronString:g,endTime:l,startTime:n,uiPassParam:"CRON"};P.scheduleParameters.cronJobTrigger=w;
}},k=function(e){var t=e.split(" ");t.length<7?i("Cron Expression too short","#cronString"):t.length>7?i("Cron Expression too long","#cronString"):"?"!=t[3]&&"*"!=t[3]&&"?"!=t[5]&&"*"!=t[5]&&i("M+W unsupported.(M+? or W+?)","#cronString");
},w=function(){a("#rangeOfRecurrDiv").hide(),a("#cronDiv").hide(),a("#recurrPatternDiv").hide(),
a("#startTimeDiv").hide(),a("#rangeOfRecurrOnceDiv").hide(),a("#patternSec").hide(),
a("#patternMin").hide(),a("#patternHour").hide(),a("#patternDay").hide(),a("#patternWeek").hide(),
a("#patternMonth").hide(),a("#patternYear").hide()},x=function(){var e=a("#recurrId").val();
switch(w(),e){case"once":a("#startTimeDiv").show(),a("#rangeOfRecurrOnceDiv").show();
break;case"seconds":a("#startTimeDiv").show(),a("#recurrPatternDiv").show(),a("#patternSec").show(),
a("#rangeOfRecurrDiv").show();break;case"minutes":a("#startTimeDiv").show(),a("#recurrPatternDiv").show(),
a("#patternMin").show(),a("#rangeOfRecurrDiv").show();break;case"hours":a("#startTimeDiv").show(),
a("#recurrPatternDiv").show(),a("#patternHour").show(),a("#rangeOfRecurrDiv").show();
break;case"daily":a("#startTimeDiv").show(),a("#recurrPatternDiv").show(),a("#patternDay").show(),
a("#rangeOfRecurrDiv").show();break;case"weekly":a("#startTimeDiv").show(),a("#recurrPatternDiv").show(),
a("#patternWeek").show(),a("#rangeOfRecurrDiv").show();break;case"monthly":a("#startTimeDiv").show(),
a("#recurrPatternDiv").show(),a("#patternMonth").show(),a("#rangeOfRecurrDiv").show();
break;case"yearly":a("#startTimeDiv").show(),a("#recurrPatternDiv").show(),a("#patternYear").show(),
a("#rangeOfRecurrDiv").show();break;case"cron":a("#cronDiv").show(),a("#rangeOfRecurrDiv").show();
}},P=this,D='<option value="0">January</option><option value="1">February</option><option value="2">March</option><option value="3">April</option><option value="4">May</option><option value="5">June</option><option value="6">July</option><option value="7">August</option><option value="8">September</option><option value="9">October</option><option value="10">November</option><option value="11">December</option>',I='<option value="0">sunday</option><option value="1">monday</option><option value="2">tuesday</option><option value="3">wednesday</option><option value="4">thursday</option><option value="5">friday</option><option value="6">saturday</option>',S='<option value="0">first</option><option value="1">second</option><option value="2">third</option><option value="3">fourth</option><option value="4">last</option>',T='<div id="nameDiv"><form style="display:inline-block" id="nameForm"><span class="dialog-label">Name:</span><input id="nameIn" type="text" value="'+o()+'"></form></div>',O='<div id="locationDiv"><form style="display:inline-block" id="nameForm"><span class="dialog-label">Location:</span><input id="locationIn" type="text" value="'+s()+'"></form></div>',R='<div id = "recurrenceDiv"><br><span class="dialog-title" style="width: 100px; display: inline-block;">Recurrence:</span><select id="recurrId" style="margin-left: 0px;"><option value = "once" selected>Run Once</option><option value = "seconds">Seconds</option><option value = "minutes">Minutes</option><option value = "hours">Hours</option><option value = "daily">Daily</option><option value = "weekly">Weekly</option><option value = "monthly">Monthly</option><option value = "yearly">Yearly</option><option value = "cron">Cron</option></select></br></div>',M='<div id="cronDiv"  style="display:none"><form><span class="dialog-label">Cron String:</span><input id="cronString" type="text" value=""></form></div>',C=p(1,12,1,"hours"),E=p(0,59,1,"minutes"),J='<select id = "amPm"><option value="am">AM</option><option value="pm">PM</option></select>',N='<div id="startTimeDiv"><br><span class="dialog-title" style="width: 100px; display: inline-block;">Start Time:</span>'+C+E+J+"</div>",A='<div id="recurrPatternDiv" style = "display:none"><div id="patternSec" ><label style="display:inline-block; margin-left: 100px; font-weight: 500;">Every</label>&nbsp;&nbsp;<form style="display:inline-block"><input id= "recurrPatternInSec" type="text" size="3" style="width:30px;"></form><label style="display:inline-block; font-weight: 500;"> second(s)</label></div><div id="patternMin" ><label style="display:inline-block; margin-left: 100px; font-weight: 500;">Every</label>&nbsp;&nbsp;<form style="display:inline-block"><input id= "recurrPatternInMin" type="text" size="3" style="width:30px;"></form><label style="display:inline-block; font-weight: 500;"> minute(s)</label></div><div id="patternHour" ><label style="display:inline-block; margin-left: 100px; font-weight: 500;">Every</label>&nbsp;&nbsp;<form style="display:inline-block"><input id= "recurrPatternInHour" type="text" size="3" style="width:30px;"></form><label style="display:inline-block; font-weight: 500;"> hour(s)</label></div><div id="patternDay" ><input type="radio" name ="day" value="day" id="dayRadio" style="margin-left: 100px; font-weight: 500;" checked> <label style="display:inline-block">Every</label>&nbsp;&nbsp;<form style="display:inline-block"><input id= "recurrPatternInDay" type="text" size="3" style="width:30px;"></form><label style="display:inline-block; font-weight: 500;"> day(s)</label></br><input type="radio" name ="day" value="weekDay" id="weekDayRadio" style="margin-left: 100px;"> Every weekday</div><div id="patternWeek" ><form><div id="errorCheckboxes" style="display:none"><label id="errWeek">Choose at least one week</label></div><input type="checkbox" name="weekday" value="monday" id="monday" style="margin-left: 100px;"> Monday<input type="checkbox" name="weekday" value="tuesday" id="tuesday"> Tuesday<input type="checkbox" name="weekday" value="wednesday" id="wednesday"> Wednesday<input type="checkbox" name="weekday" value="thursday" id="thursday"> Thursday</br><input type="checkbox" name="weekday" value="friday" id="friday" style="margin-left: 100px;"> Friday<input type="checkbox" name="weekday" value="saturday" id="saturday"> Saturday<input type="checkbox" name="weekday" value="sunday" id="sunday"> Sunday</form></div><div id="patternMonth" ><input id="monthRadio" type="radio" name ="month" value="day" style="margin-left: 100px;" checked> <label style="display:inline-block; font-weight: 500;">Day</label>&nbsp;&nbsp;<form style="display:inline-block"><input id= "recurrPatternIn" type="text" size="3" style="width:205px;"></form><label style="display:inline-block; font-weight: 500;"> of every month</label></br><input type="radio" name ="month" value="the" style="margin-left: 100px;"> <label style="display:inline-block; font-weight: 500;">The</label>&nbsp;&nbsp;<select id="monthOpt1Select">'+S+'</select><select id="monthOpt2Select">'+I+'</select><label style=" font-weight: 500;"> of every month</label></div><div id="patternYear" ><input id ="yearRadio" type="radio" name ="year" value="month" style="margin-left: 100px;" checked> <label style="display:inline-block; font-weight: 500;">Every</label>&nbsp;<select id="yearEveryMonth">'+D+'</select><input id="yearDayMonth"type="text" size="3"></br><input type="radio" name ="year" value="the" style="margin-left: 100px;"> <label style="display:inline-block; font-weight: 500;">The</label>&nbsp;<select id="yearOpt1Select">'+S+'</select><select id="yearOpt2Select">'+I+'</select><label style=" font-weight: 500;">of&nbsp;&nbsp;</label><select id="yearMonthSelect">'+D+"</select></div></div>",_='<div id="rangeOfRecurrDiv" style="display:none"><br><span class="dialog-title"><strong>Range of Recurrence:</strong> </span><form><span class="dialog-label">Start:</span><input type="text" id="rangeStartIn"></form><form><span class="dialog-label">End:</span><input type="radio" name ="end" value="noEnd" checked> No end date</br><input type="radio" name ="end" value ="endBy" id="endByRadio" style="margin-left:100px;"> End by:&nbsp;&nbsp;<input id= "endByIn" type="text" style="width:187px;"></form></div>',B='<div id="rangeOfRecurrOnceDiv"><form><span class="dialog-label">Start Date:</span><input id= "startDateIn" type="text" value=""></form></div>',H='<div id="mailQuestionDiv"><label>Would you like to email a copy when the schedule runs?</label><br><input type="radio" name="mailRadio" value="no" id="mailRadioNo" checked onclick=\'showHideMailDiv()\'>&nbsp;No&nbsp;&nbsp;</input><input type="radio" name="mailRadio" value="yes" id="mailRadioYes" onclick=\'showHideMailDiv(true)\'>&nbsp;Yes&nbsp;&nbsp;</input></div>',Y='<div id="mailInfoDiv" style="display:none"><label>To: (Use a semi-colon or comma to separate multiple email adresses.)</label><form><input id="toInput" style="width:100%" type="text"></input></form><label>Subject:</label><form><input id="subjectInput" style="width:100%" type="text" value="'+o()+' schedule has successfully run."></input></form><label>Attachment Name:</label><form><input id="attachmentNameInput" style="width:100%" type="text" value="'+a("#nameIn").val()+'"></input></form><label>Message (optional)</label><textarea id="messageInput" type="text" rows="4" style="width:100%"></textarea></div>',W=T+O+R+M+N+A+_+B,L=H+Y,j=!1;
a.ajax({type:"GET",url:e.getEmailConfig()+"/isValid",success:function(e){j=e}});var q={
basicState:{html:W,title:"Schedule Report",buttons:{Cancel:-1,Ok:1},submit:function(e,i,o,s){
if(t=n(),-1==i)a.prompt.close();else if(1==i)return g(),r?(parameters={},!1):j?(a("#attachmentNameInput").val(a("#nameIn").val()),
a.prompt.goToState("mailState"),!1):P.scheduleRequest()}},mailState:{html:L,title:"Schedule Report",
buttons:{Back:-1,Ok:1},submit:function(e,t,r,n){if(-1==t)return a.prompt.goToState("basicState"),
!1;if(1==t){if(a("#mailRadioNo").is(":checked"))return P.scheduleRequest();if(a("#mailRadioYes").is(":checked")){
var o=/^\S+@\S+$/;return a("#toInput").val().match(o)?P.scheduleRequest(!0):(i("Invalid email","#toInput"),
!1)}return!1}}}};a.prompt(q,{box:"scheduler",loaded:function(){a("#recurrId").on("change",function(){
x()})}}),a(".scheduler #jqi").css("width","510px"),a(document).ready(function(e){
a("#startDateIn").datepicker({minDate:0}),a("#rangeStartIn").datepicker({minDate:0
}),a("#endByIn").datepicker({minDate:0}),a("#startDateIn").datepicker("setDate",new Date),
a("#rangeStartIn").datepicker("setDate",new Date)})}})});