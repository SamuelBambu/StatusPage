

function hostNameModel( obj ) {

  this.hostname = obj.hostname;
  this.lasterrortime = new Date(obj.lasterrortime * 1000);
  this.lasttesttime = new Date(obj.lasttesttime * 1000) ;
  this.lastresponsetime = obj.lastresponsetime;
  this.status = obj.status == "up" ? true : false;
  this.type = obj.type;
  this.id = obj.id;

  this.summary = [];
  //esta se toma como contenido inicial para renderizar los gif de cargado en los tr's
  this.summaryRenderedTable = "<td><img src='static/img/ajax-loader.gif'></td>"
}

hostNameModel.prototype = {

  updateSummary : function( summaryList ){
    this.summary = summaryList
  },


}
