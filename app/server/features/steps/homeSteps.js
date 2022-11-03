const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the home page', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/');
});

Given('I click the home tab', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='navbarNav']/ul/li[1]/a")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='navbarNav']/ul/li[1]/a")).click();
});

Given('I click the student login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/main/div/div[2]/div[1]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[1]/div/button")).click();
});

Given('I click the instructor login button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/main/div/div[2]/div[2]/div/button")), 1000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/main/div/div[2]/div[2]/div/button")).click();
});