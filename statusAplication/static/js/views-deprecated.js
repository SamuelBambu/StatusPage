/*
  {
      host : hostNameModel
  }
*/
const rowView = _.template(

  "<tr class='<% host.status ? print( 'status-up' ) : print( 'status-up' )  %>'>"+
      "<td>"+
          "<canvas id='<%= host.id %>' width='350' height='70'></canvas>"+
      "</td>"+
      "<td>"+
        "<% print( hostView(host) ) %>"+
      "</td>"+
    "</tr>"
)

/*
  hostNameModel :
  {
    name: str,
    status: bool,
    lastChecked: str(dd/mm/yyyy hh:mm),
    ping: int
  }
*/
const hostView = _.template(
  "<p class='check-title'>"+
    "<%= hostname %>"+
    "<% print(statusDeCo({status:status})) %>"+
  "</p>"+
  "<% statusDeCo({ status: status }) %>"+
  "<p class='check-label'>Ultima verificac&iacute;on:</p>"+
  "<p class='check-value'><%= lasttesttime %></p>"+
  "<p class='check-label'>Tiempo de respuesta:</p>"+
  "<p class='check-value'><%= lastresponsetime %> ms</p>"
);
//Status view
//iconos que despliegan el estado del servicio checkmark o cross
/*
  {
    status : boolean
  }
*/
const icoActivo = "<i class='tooltip fa fa-check-circle' aria-hidden='true'>";
const icoCaido = "<i class='tooltip fa fa-times-circle' aria-hidden='true'>";
const icoArriba = "<i class='tooltip fa fa-arrow-circle-up' aria-hidden='true'>";


const statusDeCo = _.template(
  "<span class=' status <%  status ? print('activo') : print('caido') %> '>"+
    "<%  status ? print(icoActivo) : print(icoCaido) %>"+
      "<span class='tooltiptext'>Servicio <%  status ? print('activo') : print('caido') %></span>"+
    "</i>"+
  "</span>"
);

//app view
/*
  {
      appTime : str,
      hostCollectionRenderedTable : str,

  }
*/
const appView = _.template(
  "<h2>Estatus de nuestros servicios <span id='fecha-hora' ><%= appTime %></span></h2>"+
  "<table class='pure-table pure-table-horizontal'>"+
      "<thead>"+
          "<tr>"+
              "<th>Historico <span id='toggle-historico'>(tiempos de respuesta)</span></th>"+
              "<th>Estatus actual</th>"+
          "</tr>"+
      "</thead>"+
      ""+
      "<tbody>"+
          "<%= hostCollectionRenderedTable %>"+
      "</tbody>"+
  "</table>"

);
