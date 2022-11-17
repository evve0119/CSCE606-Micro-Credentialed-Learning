const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, Select } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am logged in as a recruiter', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
    
    await this.driver.get('http://localhost:3000/');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[3]/div/button")).click();
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/input")).sendKeys('testRecruiter@gmail.com');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/input")).sendKeys('testRecruiter');
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Given('I am at the recruiter home page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/home";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

Given('I am at the add new job page',async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewJob']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='addNewJob']")).click();
    let expectedUrl = "http://localhost:3000/recruiter/jobs/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
  });

When('I click the add new job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewJob']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='addNewJob']")).click();
});

Then('I should be at the add job page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/jobs/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I fill the job name textbox with value {string}', function (courseName) {
    this.driver.findElement(By.xpath("//*[@id='jobName']")).sendKeys(courseName);
});
 
When('I fill the job description textbox with value {string}', function (description) {
     this.driver.findElement(By.xpath("//*[@id='description']")).sendKeys(description);
});

When('I click the submit new job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/h1/button")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/h1/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
  });

When('I click the view job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[2]")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[2]")).click();
});

Then('I should be at the view job page', async function () {
    let expectedUrl = "http://localhost:3000/jobs/636f679780a52fcd3b13c07d";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on a job', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//a[@href='/recruiter/jobs/636f679780a52fcd3b13c07d/applications']")), 10000);
    await this.driver.findElement(By.xpath("//a[@href='/recruiter/jobs/636f679780a52fcd3b13c07d/applications']")).click();
});

Then('I should be at the edit job page', async function () {
    let expectedUrl = "http://localhost:3000//recruiter/jobs/636f679780a52fcd3b13c07d/applications";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on the update job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='update']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='update']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the recruiter home page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/home";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the applicants list page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/jobs/636f679780a52fcd3b13c07d/applications";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on the edit job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[1]")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[1]")).click();
});

When('I click on the edit recruiter profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='editCompany']")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='editCompany']")).click();
});

Then('I should be at the edit recruiter profile page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/intro";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close(); 
});