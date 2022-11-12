const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, Select } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am logged in as an instructor', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
    
    await this.driver.get('http://localhost:3000/');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[2]/div/button")).click();
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/input")).sendKeys('testInstructor@gmail.com');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/input")).sendKeys('testInstructor');
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Given('I am at the instructor home page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/home";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

Given('I am at the add new course page',async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewCourse']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='addNewCourse']")).click();
    let expectedUrl = "http://localhost:3000/instructor/courses/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
  });

When('I click the add new course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewCourse']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='addNewCourse']")).click();
});

Then('I should be at the add course page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I fill the course name textbox with value {string}', function (courseName) {
    this.driver.findElement(By.xpath("//*[@id='courseName']")).sendKeys(courseName);
});
 
When('I fill the description textbox with value {string}', function (description) {
     this.driver.findElement(By.xpath("//*[@id='description']")).sendKeys(description);
});
 
When('I fill the add student by email textbox with value {string}', function (studentEmail) {
     this.driver.findElement(By.xpath("//*[@id='StudentEmail']")).sendKeys(studentEmail);
});

When('I search and add the student', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
});

When('I click the submit new course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/h1/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/h1/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
  });

  When('I click the send credentials button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[2]")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[2]")).click();
});

When('I click on the confirm button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
  });

Then('I should be at the send credentials confirmation page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/63656c1a51387dfd711dbcf1/sendCredential";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

When('I click the view course button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[1]")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button[1]")).click();
});

Then('I should be at the view course page', async function () {
    let expectedUrl = "http://localhost:3000/courses/63656c1a51387dfd711dbcf1";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on a course', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//a[@href='/instructor/courses/63656c1a51387dfd711dbcf1/edit']")), 1000);
    await this.driver.findElement(By.xpath("//a[@href='/instructor/courses/63656c1a51387dfd711dbcf1/edit']")).click();
});

Then('I should be at the edit course page', async function () {
    let expectedUrl = "http://localhost:3000/instructor/courses/63656c1a51387dfd711dbcf1/edit";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on the update button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='update']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='update']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I I fill the group name textbox with value {string}', async function (groupName) {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
});

When('I click the submit new group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the course description page', async function () {
    let expectedUrl = "http://localhost:3000/courses/63656c1a51387dfd711dbcf1";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
})
