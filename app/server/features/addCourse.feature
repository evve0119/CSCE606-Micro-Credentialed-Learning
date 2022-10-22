Feature: add course

    I want to add courses

    Scenario: I want to add a new course
        Given I am logged in as an instructor
        And I am at the instructor home page
        When I click the add new course button
        Then I should be at the add course page

    Scenario: I want to submit a new course
        Given I am logged in as an instructor
        And I am at the add new course page
        When I fill the course name textbox with value 'test'
        And I fill the description textbox with value 'test'
        And I fill the add student by email textbox with value 'testStudent@gmail.com'
        And I search and add the student
        And I click the submit button
        Then I should be at the instructor home page