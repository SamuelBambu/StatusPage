import os
from statusAplication.main import app

HerokuPort = os.environ.get("PORT")

print "Correr en puerto:"
print HerokuPort

app.run(
	port = HerokuPort
)



