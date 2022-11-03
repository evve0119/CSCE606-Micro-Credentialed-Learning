Feature: home page navigation

    I want to use Micro-Credential Learning

    Scenario: Return to home
        Given I am at the register page
        And I click the home tab
        Then I should be at the home page

    Scenario: Login via tab
        Given I am at the home page
        And I click the login tab
        Then I should be at the login page

    Scenario: Register via tab
        Given I am at the home page
        And I click the register tab
        Then I should be at the register page

    Scenario: Student Login via button
        Given I am at the home page
        And I click the student login button
        Then I should be at the login page

    Scenario: Instructor Login via button
        Given I am at the home page
        And I click the instructor login button
        Then I should be at the login page