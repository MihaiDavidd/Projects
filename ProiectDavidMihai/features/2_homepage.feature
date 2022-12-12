Feature: Home Page

#    Scenario: Add a Item
#    Given I am on the home page
#    When I click the add menu
#    And I click item
#    And I click to my records
#    And I enter a item
#    And I click clock

    Scenario: Acces library
    Given I am on the home page
    When I click the library menu
    And I should see Library
    And I click on personal information
    Then I should see Mihai David's Personal Information

    Scenario: Acces your account
    Given I am on the home page
    When I click the account logo
    And I click on My Account
    Then I should see My Account

    Scenario: Add a person
    Given I am on the home page
    When I click the add menu
    And I click person
    And I enter first name
    And I enter last name
    And I click save
    And I should see a confirmation message
    And I click finish

    Scenario: Check if person was added
    Given I am on the home page
    When I click the people menu
    And I click on George Best
    Then I should see account name