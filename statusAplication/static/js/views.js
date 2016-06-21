
const icoActivo = "<i class='tooltip fa fa-check-circle fa-lg' aria-hidden='true'>";
const icoCaido = "<i class='tooltip fa fa-times-circle fa-lg' aria-hidden='true'>";
const icoArriba = "<i class='tooltip fa fa-arrow-circle-up fa-lg' aria-hidden='true'>";
const icoIntermitente = "<i class=' tooltip fa fa-exclamation-circle fa-lg' aria-hidden='true'>"

const waitingView = "<div class='loading-services'>"+
                      "<h1>Verificanto Estatus de Servicios</h1>"+
                      "<img src='static/img/ajax-loader.gif'>"+
                    "</div>"
/*
{
  ref to:
  hostNameModel
}
*/
const rowView = _.template(
  "<tr id='<%= data.id %>' >"+
    "<% print( inRowView( data ) ) %>"+
  "</tr>"
  ,{ variable : "data"}
  /*
  refer to: http://underscorejs.org/#template
  se utilizo esto para poder pasar el mismo hostNameModel al siguient template
  */
);
const inRowView = _.template(
  "<td><% status ? print(icoArriba) : print(icoCaido) %>"+
    "<span class='tooltiptext' ><% status ? print('Ping:' + lastresponsetime ) : print('Caido') %> </span>"+
  "</i></td>"+
  "<td><%= mainApp.namesMapper[hostname] %></td>"+
  "<% print( summaryRenderedTable ) %>"

);
/*
{
  ref to:
  appController
}
*/
const appView = _.template(
  //menu de arriba
  "<div class='pure-g container menu-bar'>"+
      "<div id='top-menu' class='pure-u-1-4'>"+
          "<img src='/static/img/eleventa.png'  />"+
      "</div>"+
      "<div class='pure-u-3-4'>"+
          "<p>Fecha actual:</p>"+
          "<h3 id='current-date' ><% print(currentAppDateTime()) %></span></h3>"+
      "</div>"+
  "</div>"+
  //body table
  "<div class='pure-g container'>"+
      "<div class='pure-u-1'>"+
          "<h2>Res&uacute;men de servicios:</h2>"+
          "<table class='pure-table pure-table-striped' >"+
            "<thead>"+
                "<tr>"+
                    "<th></th>"+
                    "<th  class='arrow_down' >Servicio</th>"+
                    "<% print( viewHelper.getDayTrs()) %>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<%= hostsRenderedTable %>"+
            "</tbody>"+

          "</table>"+
      "</div>"+
  "</div>"
);
//ex: Lun 20
const daysViewList = _.template(
    "<th class='<%= clase %>' ><%= dayString %></th>"
);
//imprime los iconos de correcto, eror, warning etc al igual que los detalles
const dayStatusList = _.template(
  "<td class='<%= clase %>' ><% if( dayStatus == 0 ){print( icoActivo )}else if( dayStatus <= 2 ){print( icoIntermitente )}else{print(icoCaido)}  %>"+
    "<span class='tooltiptext' >"+
      "<p><%  print('Ping promedio: ' + day.avgresponse ) %></p>"+
      "<p><%  print('Arriba: ' + Math.floor( 100 - dayStatus ) + '%' ) %></p>"+

      "<% if( dayStatus != 0 ){ print('<p>Caido: ' + viewHelper.getDownTime( dayStatus ) + '</p>') } %>"+
    "</span>"+
  "</td>"
);

var viewHelper = {
  //contiene algunos metodos auxiliares para obtener fechas, y darles formato

  getDayTrs : function(){//returns a string with all the trs of the days
    // este codigo genera el th del dia de hoy
    var todayTh = daysViewList({
        dayString: _.take(getLastNumberOfDays()),
        clase : "today"
    });
    //rest of the days
    return _.reduce(
      _.rest(getLastNumberOfDays()), //we skip´today
      function(templ, day ){
        return templ + daysViewList( {dayString:day, clase :""} )
      },
      todayTh
    );

  },
  getStatusTrs : function( summaryList ){
    var days = _.first( _.rest(summaryList, 4 ), 7).reverse();//summary list es la lista de cada summary de cada hostmodel
    // este codigo genera el td del dia de hoy
    var today = _.take( days)
    var today = dayStatusList({
      dayStatus : ((today.downtime * 100)/(24 * 60 * 60)),
      day : today,
      clase:"today"
    });
    //resto de los dias
    return _.reduce(
      _.rest(days),
      function(templ, day){
        var dayStatus = (day.downtime * 100 ) / (24 * 60 * 60);//tiempo caido en segundos
        return templ + dayStatusList( {dayStatus : dayStatus, day : day, clase:""} );
      },
      today
    )
  },
  prettyPrintMins : function(mins){
    var hours = Math.floor(mins / 60);
    var minutes = Math.round(mins % 60);
    result = "";
    hours > 0 ? result = result + String(hours) + "H " : result = result;
    minutes > 0 ? result = result + String(minutes) + "M" : result = result;
    return result;
  },
  getDownTime : function( percentage ){
    var daysMinutes = 24 * 60;
    downMinutes = (daysMinutes * percentage) / 100;
    return viewHelper.prettyPrintMins(downMinutes);
  }
}
