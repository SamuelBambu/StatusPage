

function appController(  ){
  this.hostnamesCollection = [];
  this.renderElement = null;
  this.visibleServices = [
                            "www.taecel.com", "www.siprel.net",
                            "ws.tiemporealmovil.mx", "ws.cedixvirtual.mx",
                            "servicios.ecodex.com.mx"
                          ];
  this.currentAppDateTime = function(){
        return new Date().toLocaleString();
  };
  this.hostsRenderedTable = "";
}

appController.prototype = {
  fetchAllHosts : function(){
    self = this;
    var rawJson = null;
    console.log("fetching...");
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
    console.log(this);
    this.renderElement.innerHTML = appView( this );
  }


}

// HOST CONTROLLER
function hostController( objectModel ){

  this.objectModel = objectModel;

}

hostController.prototype = {
  self : this,
  render : function(  ){
    console.log(this.objectModel);
    return rowView( this.objectModel );

  },
  updateModel: function( objectModel ){
    this.objectModel = objectModel
  }
}
