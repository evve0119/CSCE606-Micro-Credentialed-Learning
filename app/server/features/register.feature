Feature: Register

    I want to register on Micro-Credential Learning

    #Scenario: Registering a student
    #    Given I am at the register page
    #    When I fill the register username textbox with value 'registerStudent2'
    #    And I fill the register account email textbox with value 'registerStudent2@gmail.com'
    #    And I fill the register password textbox with value 'registerStudent2'
    #    And I fill the register role textbox with value 'student'
    #    And I click the register button
    #    Then I should be at the login page

    #Scenario: Registering an instructor
    #    Given I am at the register page
    #    When I fill the register username textbox with value 'registerInstructor2'
    #    And I fill the register account email textbox with value 'registerInstructor2@gmail.com'
    #    And I fill the register password textbox with value 'registerInstructor2'
    #    And I fill the register role textbox with value 'instructor'
    #    And I click the register button
    #    Then I should be at the login page

    Scenario: Switching from register to login
        Given I am at the register page
        When I click the login tab
        Then I should be at the login page