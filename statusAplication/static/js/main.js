const numberOfDays = 7;
var daysList = { 0:"Dom",1:"Lun",2:"Mar",3:"Mie",4:"Jue",5:"Vie",6:"Sab" }
getLastNumberOfDays = function(){ //returns a list of string representations (ex: Lun 20  )
                                  //of the last specified days by numberOfDays
  var currentDate =  new Date().getTime() ;
  var days = _.range(0, numberOfDays);
  var timeStamps = _.map(//timestaps of last 5 days
    days,
    function( day ){       //h    m    s    ms
      return (currentDate - (24 * 60 * 60 * 1000 * day)  )
    }
  );
  var dates = _.map(
    timeStamps,
    function( timeStamp ){
      aux = new Date(timeStamp)
      return daysList[aux.getDay()] + " " + String(aux.getDate());
    }
  )
  return dates;
}
const mainApp = new appController();
mainApp.attachRenderingElement( document.getElementById("app"));
mainApp.fetchAllHosts();
