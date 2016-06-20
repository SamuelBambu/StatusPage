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

//Google Analytics
var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-94028-8']);
      _gaq.push(['_setDomainName', 'www.eleventa.com']);
      _gaq.push(['_setAllowLinker', true]);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
//
const mainApp = new appController();
mainApp.attachRenderingElement( document.getElementById("app"));
mainApp.fetchAllHosts();
