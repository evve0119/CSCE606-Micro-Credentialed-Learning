const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

When('I click the send credentials button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button")).click();
});

When('I click on the confirm button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
  });

Then('I should be at the send credentials confirmation page', async function () {
    let expectedUrl = "http://localhost:3000/sendCredential/6352c003b74e6ab82bbf493d";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
});