

function appController(  ){
  this.hostnamesCollection = [];
  this.renderElement = null;
  this.visibleServices = [
                            "www.taecel.com", "www.siprel.net",
                            "ws.tiemporealmovil.mx", "ws.cedixvirtual.mx",
                            "servicios.ecodex.com.mx"
                          ]
}

appController.prototype = {

  fetchAllHosts : function(){
    self = this;
    var rawJson = null;
    console.log("fetching...");
    $.get("/api/checks").done(function(data){
    rawJson = JSON.parse(data);
    self.hostnamesCollection = _.map(
      rawJson.checks,
      function( jsonHostObject ){
        hNMAux = new hostNameModel( jsonHostObject );
        return new hostController( hNMAux );
      });
      self.hostnamesCollection = _.filter(
        self.hostnamesCollection,
        function( service ){
          console.log( service )
          return self.visibleServices.indexOf( service.objectModel.hostname ) >= 0;
        }
      )
      self.render();
    });

  },
  render : function(  ){

    const hostCollectionRenderedTable =_.reduce(
      this.hostnamesCollection,
      function( renderedText, modelController ){
        return renderedText + modelController.render(  );
      },
      ""
    );
    this.renderElement.innerHTML = appView({
        appTime : new Date().toLocaleString() ,
        hostCollectionRenderedTable : hostCollectionRenderedTable
    });
  },
  attachNewRenderElement : function( renderElement ){
    this.renderElement = renderElement;
  }


}

// HOST CONTROLLER
function hostController( objectModel ){

  this.objectModel = objectModel;

}

hostController.prototype = {

  render : function(  ){
    console.log(this.objectModel);
    return rowView( {host : this.objectModel} );

  },
  updateModel: function( objectModel ){
    this.objectModel = objectModel
  }
}
