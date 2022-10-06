Feature: login

    I want to login on Micro-Credential Learning

    Scenario: Logging in with invalid credentials
        Given I am at the login page
        When I fill the account email textbox with value 'incorrect@mail.com'
        And I fill the password textbox with value 'incorrectpassword'
        And I click the login button
        Then a text 'This is not your page, you must sign in' should appear in the validation errors region

    Scenario: Logging in with only username
        Given I am at the login page
        When I fill the account email textbox with value 'incorrect@mail.com'
        And I fill the password textbox with value ''
        And I click the login button
        Then a text 'Missing credentials' should appear in the validation errors region

    Scenario: Logging in with only password
        Given I am at the login page
        When I fill the account email textbox with value ''
        And I fill the password textbox with value 'incorrectpassword'
        And I click the login button
        Then a text 'Missing credentials' should appear in the validation errors region

    Scenario: Logging in with valid credentials
        Given I am at the login page
        When I fill the account email textbox with value 'myname@mymail.com'
        And I fill the password textbox with value 'mypassword'
        And I click the login button
        Then I should be at the home page

    Scenario: Switching from login to register
        Given I am at the login page
        When I click the register button
        Then I should be at the register page
