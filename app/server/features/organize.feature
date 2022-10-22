Feature: organize

    I want to organize my credentials

    Scenario: I want to add a new group
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new group button
        Then I should be at the add group page

    Scenario: I want to edit an existing group
        Given I am logged in as a student
        And I am at the student home page
        When I click on a group
        Then I should be at the edit group page

    Scenario: I want to submit changes to an existing group
        Given I am logged in as a student
        When I click on a group
        When I click on the submit button
        Then I should be at the student home page