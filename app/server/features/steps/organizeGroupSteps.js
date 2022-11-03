const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, WebDriverWait } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the student home page', async function () {
    let expectedUrl = "http://localhost:3000/student/home";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

Given('I am at the add resume page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('I click the add new group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewGroup']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='addNewGroup']")).click();
});

When('I click on a group', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//a[@href='/student/groups/63635d5038981757b74fb5a5']")), 1000);
    await this.driver.findElement(By.xpath("//a[@href='/student/groups/63635d5038981757b74fb5a5']")).click();
});

When('I click on the submit edit group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='submit']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='submit']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I fill the group name textbox with value {string}', function (groupName) {
    this.driver.findElement(By.xpath("//*[@id='groupName']")).sendKeys(groupName);
});

Then('I should be at the add group page', async function () {
    let expectedUrl = "http://localhost:3000/student/groups/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit group page', async function () {
    let expectedUrl = "http://localhost:3000/student/groups/63635d5038981757b74fb5a5";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click the edit profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='editProfile']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='editProfile']")).click();
});

Then('I should be at the edit profile page', async function () {
    let expectedUrl = "http://localhost:3000/student/intro";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I click on the submit edit profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='submit']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='submit']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the add new resume button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewResume']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='addNewResume']")).click();
});

Then('I should be at the add resume page', async function () {
    let expectedUrl = "http://localhost:3000/student/resumes/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

When('I fill the resume name textbox with value {string}', function (resumeName) {
    this.driver.findElement(By.xpath("//*[@id='Resume Name']")).sendKeys(resumeName);
});

When('I click the submit new resume button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});