import time

from behave import *


@given("I am on the login page")
def step_impl(context):
    context.browser.driver.get("https://jules.app/sign-in")
    time.sleep(1)

@when("I click the forgot password link")
def step_impl(context):
    forgot_pass_link = context.browser.get_forgot_pass_link()
    forgot_pass_link.click()
    time.sleep(2)

@when("I click the sign up link")
def step_impl(context):
    sign_up_link = context.browser.get_sign_up_link()
    sign_up_link.click()
    time.sleep(2)

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

@when("I enter a wrong password")
def step_impl(context):
    context.browser.enter_wrong_password("Parola2!")

@when("I click the login button")
def step_impl(context):
    context.browser.click_login()
    time.sleep(2)

@then("I should see my name")
def step_impl(context):
    expected_page_menu_text = "The David Household"
    assert context.browser.get_page_menu().text == expected_page_menu_text
    time.sleep(2)

@Then('I receive the "{err_msg}" error message')
def step_impl(context, err_msg):
    assert context.browser.is_error_message_displayed(err_msg)
