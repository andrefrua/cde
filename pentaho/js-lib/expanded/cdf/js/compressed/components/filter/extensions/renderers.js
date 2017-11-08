define(["../../../lib/jquery","../../../lib/mustache"],function(e,t){return{group:function(e,n,o){
var i,r,l;return l=n.toJSON(),r=t.render("{{label}}",l),i=t.render('<a href="http://www.google.com">More about {{label}}</a>',l),
e.find(".filter-group-title").html(r),e.find(".filter-group-footer").html(i),e.css({
border:"1px solid rgb("+_.random(255)+","+_.random(255)+","+_.random(255)+")"})},
sumSelected:function(e,t,n){var o,i;return i=t.flatten().filter(function(e){return null==e.children();
}).filter(function(e){return e.getSelection()===!0}).reduce(function(e,t){return e+t.get("value");
},0).value(),o=t.isRoot()?".filter-root-selection-value":".filter-group-selection-value",
e.find(o+":eq(0)").html(0===i?"":i)},Item:function(e,t,n){var o;return o={item:"<span>"+viewModel.label+"</span> <span style='float:right;'>comem</>"
},e.find(".filter-item-body").html(o.item)},rootHeaderSingleSelect:function(e,t,n){
var o;return o=t.getSelectedItems()[0]||"None",e.find(".filter-root-header-label").html(o).attr("title",o);
},rootHeaderMultiSelect:function(e,n,o){var i,r;return r=n.toJSON(),i=t.render('<span class="filter-root-info-number-selected-items">\n  {{numberOfSelectedItems}}\n</span>\n<span class="filter-root-info-number-items">\n  of {{numberOfItems}}\n</span>',r),
"undefined"!=typeof console&&null!==console&&console.log("injecting content on header"),
e.find(".filter-root-header-label").html(i).attr("title",t.render("{{numberOfSelectedItems}}/{{numberOfItems}}",r)),
e.find(".filter-root-header-label").mouseover(function(e){return"undefined"!=typeof console&&null!==console?console.log("hovering "+r.label):void 0;
})},notificationSelectionLimit:function(n,o,i){var r,l;return l=e.extend(!0,o.toJSON(),i),
r=t.render('{{#reachedSelectionLimit}}\n<div class="filter-root-notification">\n  <div class="filter-root-notification-icon" />\n  <div class="filter-root-notification-text">\n    The selection limit\n    (<span class="filter-notification-highlight">{{Root.options.selectionStrategy.limit}}</span>)\n    for specific items has been reached.\n  </div>\n</div>\n{{/reachedSelectionLimit}}',l),
n.find(".filter-root-footer").html(r)}}});