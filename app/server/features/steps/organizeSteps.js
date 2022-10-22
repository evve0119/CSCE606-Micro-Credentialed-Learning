const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser, WebDriverWait } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the student home page', async function () {
    let expectedUrl = "http://localhost:3000/studentHomePage";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});

When('I click the add new group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div/div/div[2]/div[2]/button")), 1000);
    await this.driver.findElement(By.xpath("/html/body/div/div/div[2]/div[2]/button")).click();
});

When('I click on a group', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//a[@href='/groupForm/6352b065b74e6ab82bbf481f']")), 1000);
    await this.driver.findElement(By.xpath("//a[@href='/groupForm/6352b065b74e6ab82bbf481f']")).click();
});

When('I click on the submit button', async function () {
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
    let expectedUrl = "http://localhost:3000/newGroupForm";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit group page', async function () {
    let expectedUrl = "http://localhost:3000/groupForm/6352b065b74e6ab82bbf481f";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});