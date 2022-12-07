const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, Select } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the add new course page',async function () {
    await this.driver.get('http://localhost:3000/instructor/courses/new');
});

Given('I am at the edit course page', async function () {
    await this.driver.get('http://localhost:3000/instructor/courses/638edd555952e25b0ba2eb78/edit');
});

Given('I am at the edit instructor profile page', async function () {
    await this.driver.get('http://localhost:3000/instructor/intro');
});

When('I click the add new course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/h3/button/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/h3/button/i")).click();
});

When('I fill the course name textbox with value {string}', function (courseName) {
    this.driver.findElement(By.xpath("//*[@id='Course name']")).sendKeys(courseName);
});
 
When('I fill the course description textbox with value {string}', function (description) {
     this.driver.findElement(By.xpath("//*[@id='exampleForm.ControlTextarea1']")).sendKeys(description);
});
 
When('I fill the add student by email textbox with value {string}', function (studentEmail) {
     this.driver.findElement(By.xpath("//*[@id='Add student by email']")).sendKeys(studentEmail);
});

When('I search and add the student', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[2]/form/button")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/button")).click();
});

When('I click the submit new course button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the view course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[1]/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[1]/i")).click();
});

When('I click the edit course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[2]/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[2]/i")).click();
});

When('I click the submit edit course button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the send credentials button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[3]/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/button[3]/i")).click();
});

When('I click on the confirm button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
  });

When('I click the edit instructor profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewGroup']/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='addNewGroup']/i")).click();
});

When('I click the submit edit instructor profile button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the send credentials confirmation page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/638edd555952e25b0ba2eb78/sendCredential";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

Then('I should be at the view course page', async function () {
    let expectedUrl = "http://localhost:3000/courses/638edd555952e25b0ba2eb78";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit course page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/638edd555952e25b0ba2eb78/edit";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the add course page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit instructor profile page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/intro";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});