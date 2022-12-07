Feature: Register

    I want to register on Micro-Credential Learning

    #Scenario: Registering a student
    #    Given I am at the student register portal
    #    When I fill the register username textbox with value 'registerStudent'
    #    And I fill the register first name textbox with value 'John'
    #    And I fill the register last name textbox with value 'Doe'
    #    And I fill the register account email textbox with value 'registerStudent@gmail.com'
    #    And I fill the register password textbox with value 'registerStudent'
    #    And I click the register button
    #    Then I should be at the login page

    #Scenario: Registering an instructor
    #    Given I am at the instructor register portal
    #    When I fill the register username textbox with value 'registerInstructor'
    #    And I fill the register first name textbox with value 'John'
    #    And I fill the register last name textbox with value 'Doe'
    #    And I fill the register account email textbox with value 'registerInstructor@gmail.com'
    #    And I fill the register password textbox with value 'registerInstructor'
    #    And I click the register button
    #    Then I should be at the login page

    #Scenario: Registering a recruiter
    #    Given I am at the recruiter register portal
    #    When I fill the register username textbox with value 'registerRecruiter'
    #    And I fill the register first name textbox with value 'John'
    #    And I fill the register last name textbox with value 'Doe'
    #    And I fill the register account email textbox with value 'registerRecruiter@gmail.com'
    #    And I fill the register password textbox with value 'registerRecruiter'
    #    And I click the register button
    #    Then I should be at the login page

    Scenario: Switching from student register portal to student login portal
        Given I am at the student register portal
        When I click the login link
        Then I should be at the student login portal
    
    Scenario: Switching from instructor register portal to instructor login portal
        Given I am at the instructor register portal
        When I click the login link
        Then I should be at the instructor login portal
    
    Scenario: Switching from recruiter register portal to recruiter login portal
        Given I am at the recruiter register portal
        When I click the login link
        Then I should be at the recruiter login portal