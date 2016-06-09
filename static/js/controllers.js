

function appController(  ){
  this.hostnamesCollection = [];
}

appController.prototype = {

  fetchAllHosts : function(){
    self = this;
    var rawJson = null;
    $.get("/api/checks").done(function(data){
      rawJson = JSON.parse(data);

      self.hostnamesCollection = _.map(
        rawJson.checks,
        function( jsonHostObject ){
          hNMAux = new hostNameModel( jsonHostObject );
          return new hostController( hNMAux );
        });
    });
  },


}

function hostController( objectModel ){

  this.objectModel = objectModel;

}

hostController.prototype = {

  model : null,
  render : function( renderingTarget ){

  },
  updateModel: function( objectModel ){
    this.model = objectModel
  }
}
