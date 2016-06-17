import os
from statusAplication.main import app

HerokuPort = os.environ.get("PORT")

print "Correr en puerto:"
print 

app.run(
	port = HerokuPort
)


