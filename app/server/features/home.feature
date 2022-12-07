Feature: home page navigation

    I want to navigate the home page

    Scenario: Return to home
        Given I am at the home page
        When I click the home tab
        Then I should be at the home page

    Scenario: Student login via student login portal
        Given I am at the home page
        When I click the student login button
        Then I should be at the student login portal
    
    Scenario: Instructor login via instructor login portal
        Given I am at the home page
        When I click the instructor login button
        Then I should be at the instructor login portal

    Scenario: Recruiter login via recruiter login portal
        Given I am at the home page
        When I click the recruiter login button
        Then I should be at the recruiter login portal