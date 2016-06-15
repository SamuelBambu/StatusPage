

function appController(  ){
  this.hostnamesCollection = [];
  this.renderElement = null;
  this.visibleServices = [
                            "www.taecel.com", "www.siprel.net",
                            "ws.tiemporealmovil.mx", "ws.cedixvirtual.mx",
                            "servicios.ecodex.com.mx"
                          ];
  this.visibleNames = [ "Recargas electronicas Taecel", "Recargas electronicas Siprel",
                        "Recargas electronicas Tiempo Real Movil", "Recargas electronicas La Red +",
                        "Facturacion electronica Ecodex"
                          ];
  this.namesMapper = _.object( _.zip(this.visibleServices, this.visibleNames) );
  this.currentAppDateTime = function(){
        return new Date().toUTCString().substring(4);;
  };
  //actualizamos la fecha instantaneamente
  document.getElementById("current-date").innerHTML = this.currentAppDateTime();

}

appController.prototype = {
  fetchAllHosts : function(){
    var self = this;
    var rawJson = null;
    console.log("Fetching...");
    $.get("/api/checks").done(function(data){

    rawJson = JSON.parse(data);
    self.hostnamesCollection = _.map(//convertimos el json a una lista de hostControllers con sus respectivos modelos
      rawJson.checks,
      function( jsonHostObject ){
        hNMAux = new hostNameModel( jsonHostObject );
        return new hostController( hNMAux );
      });
      self.hostnamesCollection = _.filter(//filtrar a solo las companias seleccionadas en visibleServices
        self.hostnamesCollection,
        function( service ){
          //console.log( service )
          return self.visibleServices.indexOf( service.objectModel.hostname ) >= 0;
        }
      );
      console.log("Services fetched");
      self.createHostsRenderedTable();
      self.render();
      _.invoke(self.hostnamesCollection,'refreshRenderingElement');
      auxLength = self.hostnamesCollection.length;
      for( var i = 0 ; i < auxLength ; i++   ){
        (function( hostCol ){

          hostCol.updateSummary();
        })( self.hostnamesCollection[i] );
      }

    });

  },
  createHostsRenderedTable : function(){
    this.hostsRenderedTable =
      _.reduce(
        this.hostnamesCollection,
        function( renderedText, modelController ){
          return renderedText + rowView( modelController.objectModel );
        },
        ""
      )
  },
  attachRenderingElement: function( renderObj ){
    this.renderElement = renderObj;
  },
  render : function(){
    //console.log(this);
    this.renderElement.innerHTML = appView( this );
  }


}

// HOST CONTROLLER
function hostController( objectModel ){
  this.renderElement = null;
  this.objectModel = objectModel;
}

hostController.prototype = {
  refreshRenderingElement : function(){
    this.renderElement = document.getElementById(String( this.objectModel.id ));
  },
  render : function(  ){
    this.renderElement.innerHTML =  inRowView( this.objectModel  );

  },
  updateModel : function( objectModel ){
    this.objectModel = objectModel;
  },
  createSummaryRenderedTable : function(){
    this.objectModel.summaryRenderedTable = getStatusTrs( this.objectModel.summary );
  },
  updateSummary : function(  ){//type of summary (week | day | hour)
    if( this.objectModel ){
      //console.log( this.objectModel );
      var self = this;
      $.get("/api/summary/"+ self.objectModel.id +"/day").done(
        function(data){
          //console.log( self );
          var jsonObject = JSON.parse(data)
          self.objectModel.summary = jsonObject.summary.days;
          //console.log( "objectModel <" +  String(self.objectModel.id) +"> "+ self.objectModel.hostname   +" updated " );
          self.createSummaryRenderedTable();
          self.render();
      });

    }else {
      console.log("No objectModel defined")
      return null;
    }
  }
}
