const { Before, Given, When, Then } = require('@cucumber/cucumber')
let users = require("../../controllers/users.js");

Given('I am at the home page', function () {
    users.myHomePage;
});

When('I click the add button', function () {
    users.renderNewGroupForm;
});

Then('I should be at the add page', function () {
    users.renderNewGroupForm;
});

Then('I should be at the edit page', function () {
    users.renderGroupForm;
  });

Then('I should see the group textbox as blank', function () {
    users.renderNewGroupForm;
});

When('I click the edit button', function () {
    users.updateGroup;
});

Then('I should see the group textbox value from database', function () {
    users.updateGroup;
});

Given('I am at the add page', function () {
    renderNewGroupForm;
});

Given('I am at the edit page', function () {
    users.renderGroupForm;
});

When('I click the save button', function () {
    users.createNewGroup;
});

Then('I should save my edits to the database', function () {
    users.updateGroup;
});

Then('I should return to the home page', function () {
    users.myHomePage;
});

Then('I should see the credentials under the group', function () {
    users.renderGroupForm;
});

When('I click the cancel button', function () {
    users.myHomePage;
});

When ('I click the delete button', function () {
    users.deleteGroup;
});

Then ('the group should be deleted', function () {
    users.deleteGroup;
});

When ('I click the view all credentials button', function () {
    users.renderAllCredentials;
});

Then ('I should see all my credentials', function () {
    users.renderAllCredentials;
});