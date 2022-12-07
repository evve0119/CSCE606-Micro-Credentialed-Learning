Feature: student functions

    I want to use the system as a student

    Scenario: I want to visit my student home page
        Given I am logged in as a student
        When I click the home tab
        Then I should be at the student home page

    Scenario: I want to view all my credentials
        Given I am logged in as a student
        When I click the credential tab
        Then I should be at the student all credential page

    Scenario: I want to view all job openings
        Given I am logged in as a student
        When I click the jobs tab
        Then I should be at the student job search page
    
    Scenario: I want to add a new group
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new group button
        Then I should be at the add group page

    Scenario: I want to submit a new group
        Given I am logged in as a student
        And I am at the add group page
        When I fill the group name textbox with value 'test'
        And I click the submit new group button
        Then I should be at the student home page

    Scenario: I want to edit an existing group
        Given I am logged in as a student
        And I am at the student home page
        When I click the edit group button
        Then I should be at the edit group page

    Scenario: I want to submit changes to an existing group
        Given I am logged in as a student
        And I am at the edit group page
        When I click the submit edit group button
        Then I should be at the student home page

    Scenario: I want to edit my student profile
        Given I am logged in as a student
        And I am at the student home page
        When I click the edit student profile button
        Then I should be at the edit student profile page

    Scenario: I want to submit changes to my student profile
        Given I am logged in as a student
        And I am at the edit student profile page
        When I click the submit edit student profile button
        Then I should be at the student home page

    Scenario: I want to add a new resume
        Given I am logged in as a student
        And I am at the student home page
        When I click the add new resume button
        Then I should be at the add resume page
    
    Scenario: I want to submit a new resume
        Given I am logged in as a student
        And I am at the add resume page
        When I fill the resume name textbox with value 'test'
        And I click the submit new resume button
        Then I should be at the student home page
    
    Scenario: I want to edit my resume
        Given I am logged in as a student
        And I am at the student home page
        When I click the edit resume button
        Then I should be at the edit resume page

    Scenario: I want to submit changes to my resume
        Given I am logged in as a student
        And I am at the edit resume page
        When I click the submit edit resume button
        Then I should be at the view resume page
    
    Scenario: I want to view my resume
        Given I am logged in as a student
        And I am at the student home page
        When I click the view resume button
        Then I should be at the view resume page

    Scenario: I want to view all jobs
        Given I am logged in as a student
        When I click the jobs tab
        Then I should be at the student job search page

    Scenario: I want to apply for a job
        Given I am logged in as a student
        And I am at the student job search page
        When I click on a job to apply
        And I click the apply button
        And I select a resume
        # Need to ignore warning
        And I click the apply confirm button
        Then I should be at the student home page