const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the home page', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/');
});

When('I click the home tab', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='navbarSupportedContent']/ul/li/a")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='navbarSupportedContent']/ul/li/a")).click();
});

When('I click the student login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/main/div/div[2]/div[1]/div/button")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[1]/div/button")).click();
});

When('I click the instructor login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/main/div/div[2]/div[2]/div/button")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[2]/div/button")).click();
});

When('I click the recruiter login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/main/div/div[2]/div[3]/div/button")), 10000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[3]/div/button")).click();
});

Then('I should be at the home page', async function () {
    let expectedUrl = "http://localhost:3000/";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the student login portal', async function () {
    let expectedUrl = "http://localhost:3000/login/student";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the instructor login portal', async function () {
    let expectedUrl = "http://localhost:3000/login/instructor";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the recruiter login portal', async function () {
    let expectedUrl = "http://localhost:3000/login/recruiter";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});