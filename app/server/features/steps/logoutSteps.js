const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

When('I click the logout tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarNav']/ul/li[1]/a")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the home page', async function () {
    let expectedUrl = "http://localhost:3000/";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});



