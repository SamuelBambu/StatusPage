

function appController(  ){
  this.hostnamesCollection = [];
  this.renderElement = null;
  this.visibleServices = [  //aqui se agregan los servicios que se quiere que se despleguen
                            //en la lista, se filtran por el dominio del servicio
                            "www.taecel.com",
                            "www.siprel.net",
                            "ws.tiemporealmovil.mx",
                            "ws.cedixvirtual.mx",
                            "servicios.ecodex.com.mx"
                          ];
  this.visibleNames = [ //Son los labels que se utilizaran en lugar de mostrar los dominios
                        //de los servicios por default
                        "Recargas electr&oacute;nicas Taecel",
                        "Recargas electr&oacute;nicas Siprel",
                        "Recargas electr&oacute;nicas Tiempo Real M&oacute;vil",
                        "Recargas electr&oacute;nicas La Red +",
                        "Facturaci&oacute;n electr&oacute;nica Ecodex"
                      ];
  //este objeto es un auxuliar para mappear los dominios con los labels que les corresponde
  this.namesMapper = _.object( _.zip(this.visibleServices, this.visibleNames) );
  this.currentAppDateTime = function(){
        return new Date().toUTCString().substring(4);;
  };
  //actualizamos la fecha instantaneamente al correr la aplicacion
  document.getElementById("current-date").innerHTML = this.currentAppDateTime();
  var currentYear = new Date();
  document.getElementById("current-year").innerHTML = currentYear.getFullYear();
}

appController.prototype = {
  fetchAllHosts : function(){
    var self = this;
    var rawJson = null;
    //console.log("Fetching...");
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
          //solo regresa los que existan en el array de visibleServices
          return self.visibleServices.indexOf( service.objectModel.hostname ) >= 0;
        }
      );
      //console.log("Services fetched");
      self.createHostsRenderedTable();
      self.render();
      //Se renderiza el tr de cada controlador
      _.invoke(self.hostnamesCollection,'refreshRenderingElement');
      //se llama un ajax request con cada controlador para actualizar los datos de todos los modelos
      //y se vuelven a renderizar
      auxLength = self.hostnamesCollection.length;
      for( var i = 0 ; i < auxLength ; i++   ){
        (function( hostCol ){//    (function(){ "I'm an IIFE - immediately-invoked function expression "})()
          hostCol.updateSummary();
        })( self.hostnamesCollection[i] );
      }
    });

  },
  //actualiza la propiedad de rendered table, que es donde se lleva un registo de el
  //html renderizado de el contenido de la tabla ( adentro del tbody )
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
    this.objectModel.summaryRenderedTable = viewHelper.getStatusTrs( this.objectModel.summary );
  },
  updateSummary : function( ){//type of summary (week | day | hour)
    if( this.objectModel ){
      var self = this;
      $.get("/api/summary/"+ self.objectModel.id +"/day").done(//por default siempre hace un summary de dias (day)
        function(data){
          var jsonObject = JSON.parse(data)
          self.objectModel.summary = jsonObject.summary.days;
          self.createSummaryRenderedTable();//actualiza el rendered table en el model
          self.render();
      });
    }else {
      console.log("No objectModel defined")
      return null;
    }
  }
}
