Feature: instructor functions

    I want to use the system as an instructor

    Scenario: I want to add a new course
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the add new course button
        Then I should be at the add course page

    Scenario: I want to submit a new course
        Given I am logged in as an instructor
        And I am at the add new course page
        When I fill the course name textbox with value 'test'
        And I fill the course description textbox with value 'test'
        And I fill the add student by email textbox with value 'testStudent@gmail.com'
        And I search and add the student
        And I click the submit new course button
        Then I should be at the instructor home page
    
    Scenario: I want to view a course
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the view course button
        Then I should be at the view course page

    Scenario: I want to edit a course
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the edit course button
        Then I should be at the edit course page

    Scenario: I want to submit changes to a course
        Given I am logged in as an instructor
        And I am at the edit course page
        When I click the submit edit course button
        Then I should be at the instructor home page

    Scenario: I want to send credentials
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the send credentials button
        Then I should be at the send credentials confirmation page
        When I click on the confirm button
        Then I should be at the instructor home page

    Scenario: I want to edit my instructor profile
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the edit instructor profile button
        Then I should be at the edit instructor profile page

    Scenario: I want to submit changes to my instructor profile
        Given I am logged in as an instructor
        And I am at the edit instructor profile page
        When I click the submit edit instructor profile button
        Then I should be at the instructor home page

    #Scenario: I want to delete an existing group
    #    Given I am logged in as an instructor
    #    And I am at the add new course page
    #    When I fill the course name textbox with value 'test'
    #    And I fill the job description textbox with value 'test'
    #    And I fill the add student by email textbox with value 'testStudent@gmail.com'
    #    And I search and add the student
    #    And I click the submit button
    #    When I click on a course
    #    When I click on the delete button
    #    Then I should be at the student home page