Feature: logout

    I want to logout

    Scenario: I want to logout from student home page
        Given I am logged in as a student
        When I click the logout tab
        Then I should be at the home page

    Scenario: I want to logout from student all credential
        Given I am logged in as a student
        When I click the logout tab
        Then I should be at the home page