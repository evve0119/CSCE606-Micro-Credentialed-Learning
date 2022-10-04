Feature: organize

    I want to organize my credentials

    Scenario: I want to add a new group
        Given I am at the home page
        When I click the add button
        Then I should be at the add page
        And I should see the group textbox as blank

    Scenario: I want to edit an existing group
        Given I am at the home page
        When I click the edit button
        Then I should be at the edit page
        And I should see the group textbox value from database

    Scenario: I want to delete an existing group
        Given I am at the edit page
        When I click the delete button
        Then the group should be deleted

    Scenario: I want to save my changes
        Given I am at the edit page
        When I click the save button
        Then I should save my edits to the database
        And I should return to the home page
        And I should see the credentials under the group

    Scenario: I want to cancel my action
        When I click the cancel button
        Then I should return to the home page

    Scenario: I want to view all my credentials
        Given I am at the home page
        When I click the view all credentials button
        Then I should see all my credentials