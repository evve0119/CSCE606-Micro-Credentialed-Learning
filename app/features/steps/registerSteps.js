const { Before, Given, When, Then } = require('@cucumber/cucumber')
let users = require("../../controllers/users.js");

Given('I am at the register page', function () {
    users.renderRegister;
});

When('I fill the username textbox with value {string}', function (string) {
    this.username = string;
});
