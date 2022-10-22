Feature: student navigation

    I want to navigate as a student

    Scenario: I want to visit my student home page
        Given I am logged in as a student
        When I click the my home page tab
        Then I should be at the student home page

    Scenario: I want to view all my credentials
        Given I am logged in as a student
        When I click the all credentials tab
        Then I should be at the all credentials page