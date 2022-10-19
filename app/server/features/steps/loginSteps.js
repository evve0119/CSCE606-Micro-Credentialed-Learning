const { Before, Given, When, Then } = require('@cucumber/cucumber')
let users = require("../../controllers/users.js");

Given('I am at the login page', function () {
    users.renderLogin;
});

When('I fill the account email textbox with value {string}', function (string) {
    this.email = string;
});

When('I fill the password textbox with value {string}', function (string) {
    this.password = string;
});

When('I click the login button', function () {
    this.validUser = users.myHomePage(this.email, this.password)
});

Then('a text {string} should appear in the validation errors region', function (string) {
    this.validUser = users.myHomePage(this.email, this.password)
});

Then('I should be at the home page', function () {
    this.validUser = users.myHomePage(this.email, this.password)
});

When('I click the register button', function () {
    users.renderRegister;
});

Then('I should be at the register page', function () {
    users.renderRegister;
});