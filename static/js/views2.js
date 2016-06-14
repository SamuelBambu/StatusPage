
const icoActivo = "<i class='tooltip fa fa-check-circle' aria-hidden='true'>";
const icoCaido = "<i class='tooltip fa fa-times-circle' aria-hidden='true'>";
const icoArriba = "<i class='tooltip fa fa-arrow-circle-up' aria-hidden='true'>";



/*
{
  ref to:
  hostNameModel
}

*/

const rowView = _.template(
  "<tr id='id' >"+
    "<td><i class=' tooltip fa fa-arrow-circle-up' aria-hidden='true'>"+
      "<span class='tooltiptext' >Ping: <%= lastresponsetime %> </span>"+
    "</td>"+
    "<td><%= hostname %></td>"+
    "<td><i class=' tooltip fa fa-check-circle' aria-hidden='true'>"+
      "<span class='tooltiptext' >Servicio Arriba </span>"+
    "</td>"+
    "<td><i class=' tooltip fa fa-times-circle' aria-hidden='true'>"+
      "<span class='tooltiptext' >Servicio Arriba </span>"+
    "</td>"+
    "<td><i class=' tooltip fa fa-exclamation-circle' aria-hidden='true'>"+
      "<span class='tooltiptext' >Servicio Arriba </span>"+
    "</td>"+
    "<td>-</td>"+
    "<td>-</td>"+
  "</tr>"

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
          "<h3 id='current-date' ><% print(currentAppDateTime()  ) %></span></h3>"+
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
                    "<th>Lun</th>"+
                    "<th>Mar</th>"+
                    "<th>Mie</th>"+
                    "<th>Jue</th>"+
                    "<th>Vie</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<%= hostsRenderedTable %>"+
            "</tbody>"+

          "</table>"+
      "</div>"+
  "</div>"

);
