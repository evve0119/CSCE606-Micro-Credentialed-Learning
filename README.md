# CSCE606-Micro-Credentialed-Learning

Webpage Link: https://micro-credential-learning.herokuapp.com/

The client directory is for react and the server directory is for express. \
To run the project, the first step is to run `npm install` under client directory and under server directory to install all the dependencies.
Then, run `npm start` under client directory to execute react and run `npm start` under server directory to execute express.

<h3> Remark </h3>

`.env` file will no longer be update on github to protect account. \
Please make sure that you ask for the latest `.env` in the group. Thank you!

<h3> How to run the application <h3>
<b>MAKE SURE YOU ARE IN server FILE!</b>

`cd app/server`

<h4>Using two localhosts localhost:8080 for server and localhost:3000 for React frontend</h4>
<h5> For the backend server </h5>

`cd app/server/`\
`npm install`\
`nodemon server.js` or `npm start` whichever works\
The server will run on localhost:8080

<h5> For the Frontend </h5>
Open the other terminal

`cd app/server/client`\
`npm install`\
`npm start`\
React will run on localhost:3000

Executing the above will launch the app on localhost

<h3> Deploying on Heroku: </h3>
<h4>Step 1:  Change React frontend to static file and use localhost:8080 for server</h4>
Instead of having two hosts, change react to static file, we only need one for the server

Go to `app/server/.env` change `NODE_ENV = production`

Go to `app/server/client/scr/services` and change all files of "API_URL" to get rid of localhost:3000

<h5> For the Frontend </h5>

`cd app/server/client`\
`npm run build`\
React become static file

<h5> For the backend server </h5>

`cd app/server`\
`nodemon server.js`\
The server will run on localhost:8080

<h4>Step 2:  Push entire app on Heroku</h4>
<b>MAKE SURE YOU ARE IN server FILE!</b>

Put `.env` to gitignore

`cd app/server`\
`heroku login`\
`git init`\
`heroku git:remote -a micro-credential-learning`\
`git add .`\
`git commit -am "<message>"`\
`git push heroku master`

<h3> Update application on Heroku: </h3>
To test the app and deploy on Heroku
<b>MAKE SURE YOU ARE IN server FILE!</b>

`cd app/server`

<h4>Step 1: Login to Heroku and clone the repository</h4>

`heroku login`\
`heroku git:clone -a micro-credential-learning`

<h4>Step 2: Clone the repository on github and copy all the file to Heroku repository</h4>

Clone the repository on github `git clone git@github.com:evve0119/CSCE606-Micro-Credentialed-Learning.git`

Copy all the file from `CSCE606-Micro-Credentialed-Learning/app/server` to `micro-credential`

Go to `micro-credential/.env` change `NODE_ENV = production`

Go to `micro-credential/client/scr/services` and change all files of "API_URL" to get rid of localhost:3000

<h4>Step 3:  Push entire app on Heroku</h4>
<b>MAKE SURE YOU ARE IN server FILE!</b>

Put `.env` to gitignore

`cd micro-credential-learning`\
`git add .`\
`git commit -am "<message>"`\
`git push heroku master`

<h3> To run cucumber tests: </h3>

In order to run the cucumber tests, you will need to install a chrome browser into your PATH, since the cucumber tests use selenium to check if the frontend responds as what we expect.
1. As usual, switch directory into app/server, and `npm install`, this should automatically install selenium.
2. Go to this website http://chromedriver.storage.googleapis.com/index.html and choose a chrome version that matches your current chrome version. In my terminal, I am using version 106.0.5249.21 on my M1 Mac.
3. Download the file that matches your operating system, and add the chromedriver.exe to your path (for Mac users, go to /usr/local/bin, and drag the file into that folder).
4. Then you are ready to run selenium.
5. If an error pops out when running cucumber saying that “chromedriver cannot be opened because the developer cannot be verified", you need to move the chrome driver out of quarantine by typing in the terminal `xattr -d com.apple.quarantine /usr/local/bin/chromedriver`.

`npm test` this will execute the cucumber tests.

If you are using macOS or Linux, you will see a "permission denied" error when executing `npm test`. \
You will need to give permission to the path by typing: \
`sudo chmod 755 <path in the error message>`, \
and then `npm test` will be able to function correctly.

<h3> To run jest (unit test): </h3>

`npm run jest` this will execute the unit test\
Please open mongod before unit test.
