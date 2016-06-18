from flask import Flask, request, session, g, redirect, url_for, abort, render_template
import os, urllib2, urllib, json, base64

app = Flask(__name__)
app.config.from_object(__name__)

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'status.db'),
    SECRET_KEY='this is a secret key',
    USERNAME='bambucode',
    PASSWORD='edocubmab'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

############################
#   Pingdom Credentials    #
###########################
user = "sistemas@bambucode.com"
password = "SwzQq7ZvHuUy"
pingdomHostName = "https://api.pingdom.com/api/2.0"
appKey = "4i9l14dvuh8koicmezmh7w2f9bujjf59"
base64Encoded = base64.b64encode(user + ":"+ password) #generated on server startup



def createPingdomRequest( apiEndpoint = "" ):
    request = req = urllib2.Request(pingdomHostName + apiEndpoint)
    request.add_header("app-key", appKey )
    request.add_header("Authorization", "Basic "+ base64Encoded )

    return request

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/new-template")
def test():
    return render_template("newTemplate.html")

@app.route("/api/checks")
def apiChecks():

    request = createPingdomRequest( "/checks" )
    jsonResponse =   json.loads(urllib2.urlopen(request).read())
    return json.dumps( jsonResponse, indent = 2, sort_keys = True )


@app.route("/api/summary/<int:checkid>/<string:typeOfSummary>") #type of summary ( week | day | hours )
def apiAnalysis(checkid, typeOfSummary):
    parameters = {
        "includeuptime" : "true",
        "resolution" : typeOfSummary
    }
    parameters = urllib.urlencode(parameters)
    request = createPingdomRequest( "/summary.performance/" + str(checkid) + "?" + parameters )

    jsonResponse =   json.loads(urllib2.urlopen(request).read())
    return json.dumps( jsonResponse, indent = 2, sort_keys = True )



if __name__ == "__main__":
	app.run(
        port        = 5000 ,
        host        = "0.0.0.0",
        threaded = True,
        debug = True
)
