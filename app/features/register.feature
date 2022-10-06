Feature: Register

    I want to register on Micro-Credential Learning

    Scenario: Register an account
        Given I am at the register page
        When I fill the username textbox with value 'testuser'
        And I fill the password textbox with value 'testpassword'
        And I fill the account email textbox with value 'test@test.com'
        And I click the register button
        Then a text 'This is not your page, you must sign in' should appear in the validation errors region

    Scenario: Switching from register to login
        Given I am at the register page
        When I click the login button
        Then I am at the login page