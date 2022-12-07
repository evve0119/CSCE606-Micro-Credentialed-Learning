const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { Builder, By, until, ChromeOptions, Browser } = require('selenium-webdriver');
const { getSystemErrorMap } = require('util');

Given('I am at the add group page', async function () {
    await this.driver.get('http://localhost:3000/student/groups/new');
});

Given('I am at the edit group page', async function () {
    await this.driver.get('http://localhost:3000/student/groups/638ee4b3fa755c0b10d31e09');
});

Given('I am at the edit student profile page', async function () {
    await this.driver.get('http://localhost:3000/student/intro');
});

Given('I am at the edit resume page', async function () {
    await this.driver.get('http://localhost:3000/student/resumes/638edded5952e25b0ba2ec09/edit');
});

Given('I am at the add resume page', async function () {
    await this.driver.get('http://localhost:3000/student/resumes/new');
});

When('I click the credential tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarSupportedContent']/ul[1]/li[3]/a")).click();
});

When('I click the jobs tab', async function () {
    await this.driver.findElement(By.xpath("//*[@id='navbarSupportedContent']/ul[1]/li[4]/a")).click();
});

When('I click the add new group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[1]/h3/button/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[1]/h3/button/i")).click();
});

When('I click the submit new group button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I fill the group name textbox with value {string}', async function (groupName) {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='groupName']")), 5000);
    this.driver.findElement(By.xpath("//*[@id='groupName']")).sendKeys(groupName);
});

When('I click the edit group button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[1]/table/tbody/tr[1]/td[2]/button/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[1]/table/tbody/tr[1]/td[2]/button/i")).click();
});

When('I click the submit edit group button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[3]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[3]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the edit student profile button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='addNewGroup']")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='addNewGroup']")).click();
});

When('I click the submit edit student profile button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the add new resume button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/h3/button/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/h3/button/i")).click();
});

When('I click the edit resume button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/button[2]/i")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/button[2]/i")).click();
});

When('I click the submit edit resume button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[3]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[3]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I click the view resume button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/button[1]")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/button[1]")).click();
});

When('I click on a job to apply', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//a[@href='/jobs/638edc2f5952e25b0ba2eb34']")), 5000);
    await this.driver.findElement(By.xpath("//a[@href='/jobs/638edc2f5952e25b0ba2eb34']")).click();
});

When('I click the apply button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/button")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/button")).click();
});

When('I select a resume', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//input[@value='638edded5952e25b0ba2ec09']")), 5000);
    await this.driver.findElement(By.xpath("//input[@value='638edded5952e25b0ba2ec09']")).click();
});

When('I click the apply confirm button', async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div/button")), 5000);
    await this.driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/button")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

When('I fill the resume name textbox with value {string}', async function (resumeName) {
    await this.driver.wait(until.elementLocated(By.xpath("//*[@id='Resume Name']")), 5000);
    this.driver.findElement(By.xpath("//*[@id='Resume Name']")).sendKeys(resumeName);
});

When('I click the submit new resume button', async function () {
    await new Promise(r => setTimeout(r, 500));
    await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")), 5000);
    await this.driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
    await this.driver.wait(until.alertIsPresent());
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
});

Then('I should be at the student all credential page', async function () {
    let expectedUrl = "http://localhost:3000/student/credentials";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the student job search page', async function () {
    let expectedUrl = "http://localhost:3000/jobs";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the add group page', async function () {
    let expectedUrl = "http://localhost:3000/student/groups/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit group page', async function () {
    let expectedUrl = "http://localhost:3000/student/groups/638ee4b3fa755c0b10d31e09";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit student profile page', async function () {
    let expectedUrl = "http://localhost:3000/student/intro";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the add resume page', async function () {
    let expectedUrl = "http://localhost:3000/student/resumes/new";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the edit resume page', async function () {
    let expectedUrl = "http://localhost:3000/student/resumes/638edded5952e25b0ba2ec09/edit";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});

Then('I should be at the view resume page', async function () {
    let expectedUrl = "http://localhost:3000/student/resumes/638edded5952e25b0ba2ec09";
    let actualUrl = await this.driver.getCurrentUrl();
    let assert = require('assert');
    assert.equal(actualUrl, expectedUrl);
    this.driver.close();
});