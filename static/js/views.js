
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
          "<h2>Resumen de servicios:</h2>"+
          "<table class='pure-table pure-table-striped' >"+
            "<thead>"+
                "<tr>"+
                    "<th></th>"+
                    "<th>Servicio</th>"+
                    "<% print(getDayTrs()) %>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<%= hostsRenderedTable %>"+
            "</tbody>"+

          "</table>"+
      "</div>"+
  "</div>"
);
getDayTrs = function(){//returns a string with all the trs of the days
  return _.reduce(
    getLastNumberOfDays(),//we skip todays value
    function(templ, day ){
      return templ + daysViewList( {dayString:day} )
    },
    ""
  );

}
const daysViewList = _.template(
    "<th><%= dayString %></th>"
);
getStatusTrs = function( summaryList ){
  var days = _.take( _.rest(summaryList, 4 ), 7).reverse();
  return _.reduce(
    days,
    function(templ, day){
      //console.log(day);
      var dayStatus = (day.downtime * 100 ) / (24 * 60 * 60);//tiempo caido en segundos
      //console.log( new Date( day.starttime * 1000 ) )
      //console.log( dayStatus );
      return templ + dayStatusList( {dayStatus : dayStatus, day : day} );
    },
    ""
  )
};
var prettyPrintMins = function(mins){
  var hours = Math.floor(mins / 60);
  var minutes = Math.round(mins % 60);
  result = "";
  hours > 0 ? result = result + String(hours) + "H " : result = result;
  minutes > 0 ? result = result + String(minutes) + "M" : result = result;
  return result;
}
var getDownTime = function( percentage ){
  var daysMinutes = 24 * 60;
  downMinutes = (daysMinutes * percentage) / 100;
  return prettyPrintMins(downMinutes);
};
const dayStatusList = _.template(
  "<td><% if( dayStatus == 0 ){print( icoActivo )}else if( dayStatus <= 2 ){print( icoIntermitente )}else{print(icoCaido)}  %>"+
    "<span class='tooltiptext' >"+
      "<p><%  print('Ping promedio: ' + day.avgresponse ) %></p>"+
      "<p><%  print('Arriba: ' + Math.floor( 100 - dayStatus ) + '%' ) %></p>"+

      "<% if( dayStatus != 0 ){ print('<p>Caido: ' + getDownTime( dayStatus ) + '</p>') } %>"+
    "</span>"+
  "</td>"
);
