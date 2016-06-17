import os
from statusAplication.main import app

herokuPort = os.environ.get("PORT", 5000)

print "Correr en puerto:"
print herokuPort

app.run(
	port = herokuPort
)



