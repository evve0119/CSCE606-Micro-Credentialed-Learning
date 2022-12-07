const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, Select } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the add new job page', async function () {
    await this.driver.get('http://localhost:3000/recruiter/jobs/new');
  });

Given('I am at the edit job page', async function () {
    await this.driver.get('http://localhost:3000/recruiter/jobs/638edc2f5952e25b0ba2eb34/edit');
});

Given('I am at the edit recruiter profile page', async function () {
    await this.driver.get('http://localhost:3000/recruiter/intro');
});

When('I click the add new job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/h3/button")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/h3/button")).click();
});

When('I fill the job name textbox with value {string}', function (courseName) {
    this.driver.findElement(By.xpath("//*[@id='Job Name']")).sendKeys(courseName);
});
 
When('I fill the job description textbox with value {string}', function (description) {
     this.driver.findElement(By.xpath("//*[@id='exampleForm.ControlTextarea1']")).sendKeys(description);
});

When('I click the submit new job button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the view job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[1]")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[1]")).click();
});

When('I click the edit job button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[2]/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[2]/i")).click();
});

When('I click the submit edit job button', async function () {
    await new Promise(r => setTimeout(r, 1000));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the edit recruiter profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewGroup']/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='addNewGroup']/i")).click();
});

When('I click the submit edit recruiter profile button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the add job page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/jobs/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the view job page', async function () {
    let expectedUrl = "http://localhost:3000/jobs/638edc2f5952e25b0ba2eb34";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit job page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/jobs/638edc2f5952e25b0ba2eb34/edit";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit recruiter profile page', async function () {
    let expectedUrl = "http://localhost:3000/recruiter/intro";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close(); 
});