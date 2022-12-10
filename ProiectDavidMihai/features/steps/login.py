import time

from behave import *


@given("I am on the login page")
def step_impl(context):
    context.browser.driver.get("https://jules.app/sign-in")
    time.sleep(1)

@then('I am redirected to the "{expected_page}" page')
def step_impl(context, expected_page):
    expected_url = "https://jules.app/" + expected_page
    assert context.browser.get_current_url() == expected_url


@when("I enter a correct username")
def step_impl(context):
    context.browser.enter_username("mihaidavidd1@gmail.com")


@when("I enter a correct password")
def step_impl(context):
    context.browser.enter_password("Parola1!")


@when("I click the login button")
def step_impl(context):
    context.browser.click_login()
    time.sleep(2)


@then("I should see my name")
def step_impl(context):
    expected_page_menu_text = "The David Household"
    assert context.browser.get_page_menu().text == expected_page_menu_text