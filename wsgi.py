import os
from statusAplication.main import app
print os.environ.get("PORT")

app.run()
