# Monitoreo
Página de Monitoreo de los servicios de eleventa (http://monitoreo.eleventa.com)

### Heroku repository
https://git.heroku.com/estatus-servicios-bambu.git


#### Deploy

Install the heroku toolbelt(https://toolbelt.heroku.com/)

Authenticate:
```
  >> heroku login
```
Add repository and push:
```
  >> git remote add heroku https://git.heroku.com/estatus-servicios-bambu.git
  >> git push heroku master

```

- Just make sure you have all the requirements from requirements.txt installed ( pip install -r requierements.tx )
- And make sure the Procfile has this content
` web: gunicorn wsgi:app `
