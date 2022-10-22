const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am logged in as a student', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
    
    await this.driver.get('http://localhost:3000/login');
    
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/input")).sendKeys('testStudent@gmail.com');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/input")).sendKeys('testStudent');
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[3]/input")).sendKeys('student');
    
    await this.driver.findElement(By.xpath("//*[@id='login']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the my home page tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarNav']/ul/li[2]/a")).click();
});

When('I click the all credentials tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarNav']/ul/li[3]/a")).click();
});

Then('I should be at the all credentials page', async function () {
    let expectedUrl = "http://localhost:3000/allCredentials";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});