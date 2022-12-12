Feature: Login Page
    Scenario: Redirect to forgot password
    Given I am on the login page
    When I click the forgot password link
    Then I am redirected to the "forgot-password" page

    Scenario: Redirect to sign up page
    Given I am on the login page
    When I click the sign up link
    Then I am redirected to the "sign-up" page

    Scenario: Login with wrong password
    Given I am on the login page
    When I enter a correct username
    And I enter a wrong password
    And I click the login button
    Then I receive the "Invalid email/password combination" error message

    Scenario: Login with valid credentials
    Given I am on the login page
    When I enter a correct username
    And I enter a correct password
    And I click the login button
    Then I am redirected to the "search/all" page
    And I should see my name

