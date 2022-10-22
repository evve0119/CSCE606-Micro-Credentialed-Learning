Feature: send credentials

    I want to send credentials

    Scenario: I want to send credentials
        Given I am logged in as an instructor
        And I am at the instructor home page
        And I click the send credentials button
        And I should be at the send credentials confirmation page
        And I click on the confirm button
        Then I should be at the instructor home page