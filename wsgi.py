import os
from statusAplication.main import app

herokuPort = os.environ.get("PORT", 5000)

print "Correr en puerto:"
print herokuPort

if __name__ == "__main__":
	app.run(
		port = herokuPort
	)



