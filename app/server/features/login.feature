Feature: login

    I want to login to Micro-Credential Learning

    Scenario: Logging in as a student with valid account information
        Given I am at the student login portal
        When I fill the login account email textbox with value 'testStudent@gmail.com'
        And I fill the login password textbox with value 'testStudent'
        And I click the login button
        Then I should be at the student home page

    Scenario: Logging in as an instructor with valid account information
        Given I am at the instructor login portal
        When I fill the login account email textbox with value 'testInstructor@gmail.com'
        And I fill the login password textbox with value 'testInstructor'
        And I click the login button
        Then I should be at the instructor home page

    Scenario: Logging in as a recruiter with valid account information
        Given I am at the recruiter login portal
        When I fill the login account email textbox with value 'testRecruiter@gmail.com'
        And I fill the login password textbox with value 'testRecruiter'
        And I click the login button
        Then I should be at the recruiter home page

    Scenario: Switching from student login portal to student register portal
        Given I am at the student login portal
        When I click the register link
        Then I should be at the student register portal
    
    Scenario: Switching from instructor login portal to instructor register portal
        Given I am at the instructor login portal
        When I click the register link
        Then I should be at the instructor register portal
    
    Scenario: Switching from recruiter login portal to recruiter register portal
        Given I am at the recruiter login portal
        When I click the register link
        Then I should be at the recruiter register portal