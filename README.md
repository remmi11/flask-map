# Steps to deploy flask app on heroku
## Download Heroku CLI  
[download cli here](https://devcenter.heroku.com/articles/heroku-cli )

## Login into the Heroku Cli 
heroku login

## git clone git repo
https://github.com/remmi11/flask-map.git

Open the folder flask-map  with your favorite text editor or IDE.

## Install requirements
Create a virtual environment and install the dependencies by running.
```
virtualenv myvenv
myvenv\scripts\activate
pip install -r requirements.txt
```

## Create a procfile
Create a new file with Procfile as the name and do not add any extension. Add this line below

```web: gunicorn app:app```

web is used by Heroku to start a web server for the application. The app:app specifies the module and application name. In our application we have the app module and our flask application is also called app. If your are different you can change them.

## Update the requirements file by running
```pip freeze > requirements.txt```

## Deploy
We are now ready to deploy our application. In the application folder run
```heroku create flask-map```

The output of that command will be similar to this below. Take note of the application URL because it is where your app lives.
```
(myvenv) G:\PyProjects\flask-map_heroku>heroku create flask-map-heroku
Creating flask-map-heroku... done
https://flaskmap-api-heroku.herokuapp.com/| https://git.heroku.com/flaskmap-api-heroku.git
```

This https://git.heroku.com/flaskmap-api-heroku.git is the Heroku git remote repository where our application lives on Heroku. 

We now have to push our application to the master branch of the above git URL. 

```
git add .
git commit -am "make it better"
git push heroku master
```


## Commands to traceback
```
1)heroku logs command will show you the logs where you have app is failing or crashing
2)type heroku logs - tailf to see the recent logs in realtime
3)add some logging module to your code for better readability of logs in heroku logs
```

