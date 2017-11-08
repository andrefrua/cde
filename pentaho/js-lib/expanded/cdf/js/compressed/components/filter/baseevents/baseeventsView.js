define(["../../../lib/jquery","amd!../../../lib/backbone","../../../lib/mustache","../../../lib/BaseEvents"],function(e,t,i,n){
return n.convertClass(t.View,{initialize:function(t){this.setModel(t.model),this.setElement(e(t.target));
},getModel:function(){return this.model},setModel:function(e){this.stopListening(),
this.model=e,this.bindToModel()},bindToModel:function(){this.listenTo(this.getModel(),"change",this.render);
},render:function(){return this.$el.html(i.render(this.template,this.model.toJSON()));
}})});