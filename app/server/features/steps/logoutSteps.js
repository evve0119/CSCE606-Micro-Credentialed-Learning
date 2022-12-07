const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am logged in as a student', async function () {
    this.driver = new Builder()
    .forBrowser('chrome')
    .build();

    await this.driver.get('http://localhost:3000/login/student');
    
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/input")).sendKeys("testStudent@gmail.com");
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div/input")).sendKeys("testStudent");

    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='login']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Given('I am logged in as an instructor', async function () {
    this.driver = new Builder()
    .forBrowser('chrome')
    .build();

    await this.driver.get('http://localhost:3000/login/instructor');
    
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/input")).sendKeys("testInstructor@gmail.com");
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div/input")).sendKeys("testInstructor");

    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='login']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Given('I am logged in as a recruiter', async function () {
    this.driver = new Builder()
    .forBrowser('chrome')
    .build();

    await this.driver.get('http://localhost:3000/login/recruiter');
    
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/input")).sendKeys("testRecruiter@gmail.com");
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div/input")).sendKeys("testRecruiter");

    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='login']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Given('I am at the student home page', async function () {
    await this.driver.get('http://localhost:3000/student/home');
});

Given('I am at the all credential page', async function () {
    await this.driver.get('http://localhost:3000/student/credentials');
});

Given('I am at the student job search page', async function () {
    await this.driver.get('http://localhost:3000/jobs');
});

Given('I am at the instructor home page', async function () {
    await this.driver.get('http://localhost:3000/instructor/home');
});

Given('I am at the recruiter home page', async function () {
    await this.driver.get('http://localhost:3000/recruiter/home');
});

When('I click the logout tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarSupportedContent']/ul[2]/li/a")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});


