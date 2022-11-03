Feature: organize group

    I want to organize my groups

    Scenario: I want to add a new group
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new group button
        Then I should be at the add group page

    Scenario: I want to submit a new group
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new group button
        When I fill the group name textbox with value 'test'
        And I click the submit new group button
        Then I should be at the student home page

    Scenario: I want to edit an existing group
        Given I am logged in as a student
        And I am at the student home page
        When I click on a group
        Then I should be at the edit group page

    Scenario: I want to submit changes to an existing group
        Given I am logged in as a student
        When I click on a group
        When I click on the submit edit group button
        Then I should be at the student home page

    Scenario: I want to edit my profile
        Given I am logged in as a student
        And I am at the student home page
        When I click the edit profile button
        Then I should be at the edit profile page

    Scenario: I want to submit changes to my profile
        Given I am logged in as a student
        And I am at the student home page
        When I click the edit profile button
        When I click on the submit edit profile button
        Then I should be at the student home page

    Scenario: I want to add a new resume
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new resume button
        Then I should be at the add resume page
    
    Scenario: I want to submit a new resume
        Given I am logged in as a student
        When I click the add new resume button
        When I fill the resume name textbox with value 'test'
        And I click the submit new resume button
        Then I should be at the student home page