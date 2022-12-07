const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the student register portal', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/register/student');
});

Given('I am at the instructor register portal', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/register/instructor');
});

Given('I am at the recruiter register portal', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:3000/register/recruiter');
});

When('I click the login link', async function () {
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[6]/a")).click();
});

When('I fill the register username textbox with value {string}', function (username) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/input")).sendKeys(username);
 });

When('I fill the register account email textbox with value {string}', function (email) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/input")).sendKeys(email);
});
 
When('I fill the register password textbox with value {string}', function (password) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[3]/input")).sendKeys(password);
});
 
When('I fill the register role textbox with value {string}', function (role) {
    this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[4]/input")).sendKeys(role);
});

When('I click the register button', async function () {
    this.driver.findElement(By.xpath("//*[@id='register']")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});