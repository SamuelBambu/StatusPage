# Monitoreo
Página de Monitoreo de los servicios de eleventa (http://monitoreo.eleventa.com)

## How to run on local

- Clone the repository
- Make sure you have python, virtualenv and pip installed
- Execute the virtual environment for instructions look [here](https://virtualenv.pypa.io/en/stable/userguide/)
- Inside the repo folder run `>> pip install -r requirements.txt` to install all the depencencies
- Run python wsgi.py and the server will run on [localhost:5000](localhost:5000)

## Making Changes

##### Add New Services to the Monitor

To add a new service to the dashboard:
- Check that it exists in the [pigndom page](https://my.pingdom.com/newchecks/checks#)
- Add the service url to the statusBambuFlask/statusaplication/static/js/controllers.js
- Add the label that will be used
- Deploy to heroku master

### Heroku repository
https://git.heroku.com/estatus-servicios-bambu.git

### Deployment

Install the heroku [toolbelt](https://toolbelt.heroku.com/).
App in [Dashboard](https://dashboard.heroku.com/orgs/bambucoders/apps).

##### Authenticate:
```
  >> heroku login
```
##### Add repository and push:
```
  >> git remote add heroku https://git.heroku.com/estatus-servicios-bambu.git
  >> git push heroku master
```

- Just make sure you have all the dependencies installed from requirements.txt installed `>> pip install -r requierements.txt `
- And make sure the Procfile has this content
` web: gunicorn wsgi:app `

##### Increase Workers
To increase the number of workers just run this command with the amount of workers desired
```
  >> heroku ps:scale web=2
```
