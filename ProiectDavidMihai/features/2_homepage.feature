Feature: Home Page
    Scenario: Add a person
    Given I am on the home page
    When I click the add menu
    And I click person
    And I enter first name
    And I enter last name
    And I click save
    And I should see a confirmation message
    And I click finish