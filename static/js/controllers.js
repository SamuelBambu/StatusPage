

function appController(  ){
  this.hostnamesCollection = [];
  this.renderElement = null;
  this.visibleServices = [
                            "www.taecel.com", "www.siprel.net",
                            "ws.tiemporealmovil.mx", "ws.cedixvirtual.mx",
                            "servicios.ecodex.com.mx"
                          ];
  this.currentAppDateTime = function(){
        return new Date().toUTCString().substring(4);;
  };
  //actualizamos la fecha instantaneamente
  document.getElementById("current-date").innerHTML = this.currentAppDateTime();

}

appController.prototype = {
  fetchAllHosts : function(){
    self = this;
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
      _.invoke(self.hostnamesCollection,'updateSummary');

    });

  },
  createHostsRenderedTable : function(){
    this.hostsRenderedTable =  _.reduce(
      this.hostnamesCollection,
      function( renderedText, modelController ){
        return renderedText + modelController.render( );
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
  this.summary = [];
}

hostController.prototype = {
  refreshRenderingElement : function(){
    this.renderElement = document.getElementById(String( this.objectModel.id ));
  },
  render : function(  ){
    //console.log(this.objectModel);
    return rowView( this.objectModel  );

  },
  updateModel : function( objectModel ){
    this.objectModel = objectModel;
  },
  updateSummary : function(  ){//type of summary (week | day | hour)
    self = this;
    if( this.objectModel ){
      //console.log( this.objectModel );


      $.get("/api/summary/"+ self.objectModel.id +"/day").done(
        function(data){
          console.log( self.objectModel );
          var jsonObject = JSON.parse(data)
          self.summary = jsonObject.summary.days;
          console.log( "objectModel <" +  String(self.objectModel.id) +"> updated " );
      });

    }else {
      console.log("No objectModel defined")
      return null;
    }
  }
}
