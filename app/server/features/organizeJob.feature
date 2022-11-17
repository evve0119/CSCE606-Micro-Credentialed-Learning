Feature: organize job

    I want to organize jobs

    Scenario: I want to add a new job
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click the add new job button
        Then I should be at the add job page

    Scenario: I want to submit a new job
        Given I am logged in as a recruiter
        And I am at the add new job page
        When I fill the job name textbox with value 'test'
        And I fill the job description textbox with value 'test'
        And I click the submit new job button
        Then I should be at the recruiter home page
    
    Scenario: I want to view a job
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click the view job button
        Then I should be at the view job page

    Scenario: I want to view all the applicants to a job
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click on a job
        Then I should be at the applicants list page

    Scenario: I want to update changes to an existing job
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click on the edit job button
        When I click on the update job button
        Then I should be at the view job page

    Scenario: I want to edit my recruiter profile
        Given I am logged in as a recruiter
        And I am at the recruiter home page
        When I click on the edit recruiter profile button
        Then I should be at the edit recruiter profile page 
    
    #Scenario: I want to delete an existing group
    #    Given I am logged in as a recruiter
    #    And I am at the add new course page
    #    When I fill the course name textbox with value 'test'
    #    And I fill the description textbox with value 'test'
    #    And I fill the add student by email textbox with value 'testStudent@gmail.com'
    #    And I search and add the student
    #    And I click the submit button
    #    When I click on a course
    #    When I click on the delete button
    #    Then I should be at the student home page