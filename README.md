# CSCE606-Micro-Credentialed-Learning

The client directory is for react and the server directory is for express. \
To run the project, the first step is to run `npm install` under client directory and under server directory to install all the dependencies. \
Then, run `npm start` under client directory to execute react and run `npm start` under server directory to execute express. \

<h3> To run cucumber tests: </h3> 

In order to run the cucumber tests, you will need to install a chrome browser into your PATH, since the cucumber tests use selenium to check if the frontend responds as what we expect.
1. As usual, switch directory into app/server, and `npm install`, this should automatically install selenium.
2. Go to this website http://chromedriver.storage.googleapis.com/index.html and choose a chrome version that matches your current chrome version. In my terminal, I am using version 106.0.5249.21 on my M1 Mac.
3. Download the file that matches your operating system, and add the chromedriver.exe to your path (for Mac users, go to /usr/local/bin, and drag the file into that folder).
4. Then you are ready to run selenium.

`npm test` this will execute the cucumber tests. 

If you are using macOS or Linux, you will see a "permission denied" error when executing `npm test`. \
You will need to give permission to the path by typing: \
`sudo chmod 755 <path in the error message>`, \
and then `npm test` will be able to function correctly.

<h3> To run jest (unit test): </h3>

`npm run jest` this will execute the unit test\
Please open mongod before unit test.
