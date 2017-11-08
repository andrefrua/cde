define(["cdf/lib/sanitizer/lib/html4","cdf/lib/sanitizer/lib/uri","cdf/lib/sanitizer"],function(){
return{sanitizeHtml:function(i){return i=i.replace(/<iframe\b[^>]*>/gi,"<script>").replace(/<\/iframe>/gi,"</script>"),
i=Sanitizer.sanitize(i)}}});