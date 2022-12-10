Feature: Login Page
    Scenario: Login with valid credentials
    Given I am on the login page
    When I enter a correct username
    And I enter a correct password
    And I click the login button
    Then I am redirected to the "search/all" page
    And I should see my name

##  Scenario: Login with wrong credentials
##    Given I am on the login page
##    When I enter a incorrect username
##    And I enter a incorrect password
##    And I click the login button
##    Then Message error is displayed
#
#  Scenario: Login with valid credentials
#    Given I am on the login page
#    When I enter a correct username
#    And I enter a correct password
#    And I click the login button
#    Then I am redirected to the "search/all" page
#    And I should see my name


