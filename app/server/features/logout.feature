Feature: logout

    I want to logout

    Scenario: I want to logout from student home page
        Given I am logged in as a student
        And I am at the student home page
        When I click the logout tab
        Then I should be at the home page

    Scenario: I want to logout from student all credential page
        Given I am logged in as a student
        And I am at the all credential page
        When I click the logout tab
        Then I should be at the home page

    Scenario: I want to logout from student job search page
        Given I am logged in as a student
        And I am at the student job search page
        When I click the logout tab
        Then I should be at the home page

    Scenario: I want to logout from instructor home page
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the logout tab
        Then I should be at the home page

    Scenario: I want to logout from recruiter home page
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click the logout tab
        Then I should be at the home page