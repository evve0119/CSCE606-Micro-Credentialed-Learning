const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the login page', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/login');
});


When('I fill the login account email textbox with value {string}', function (email) {
   this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/input")).sendKeys(email);
});

When('I fill the login password textbox with value {string}', function (password) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/input")).sendKeys(password);
});

When('I fill the login roll textbox with value {string}', function (role) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[3]/input")).sendKeys(role);
});

When('I click the login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='login']")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the register tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarNav']/ul/li[1]/a")).click();
});

Then('I should be at the student home page', async function () {
    let expectedUrl = "http://localhost:3000/studentHomePage";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the instructor home page', async function () {
    let expectedUrl = "http://localhost:3000/instructorHomePage";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the register page', async function () {
    let expectedUrl = "http://localhost:3000/register";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});



