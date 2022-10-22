Feature: login

    I want to login on Micro-Credential Learning

    Scenario: Logging in as student with valid account information
        Given I am at the login page
        When I fill the login account email textbox with value 'testStudent@gmail.com'
        And I fill the login password textbox with value 'testStudent'
        And I fill the login roll textbox with value 'student'
        And I click the login button
        Then I should be at the student home page


    Scenario: Logging in as instructor with valid account information
        Given I am at the login page
        When I fill the login account email textbox with value 'testInstructor@gmail.com'
        And I fill the login password textbox with value 'testInstructor'
        And I fill the login roll textbox with value 'instructor'
        And I click the login button
        Then I should be at the instructor home page


    Scenario: Switching from login to register
        Given I am at the login page
        When I click the register tab
        Then I should be at the register page