import time
from behave import *

@given("I am on the home page")
def step_impl(context):
    context.browser.driver.get("https://jules.app/sign-in")
    time.sleep(1)

@when("I click the add menu")
def step_impl(context):
    context.browser.click_add_menu()
    time.sleep(2)

@when("I click person")
def step_impl(context):
    context.browser.click_person()
    time.sleep(2)

@when("I enter first name")
def step_impl(context):
    context.browser.enter_firstname("George")
    time.sleep(2)

@when("I enter last name")
def step_impl(context):
    context.browser.enter_lastname("Best")
    time.sleep(2)

@when("I click save")
def step_impl(context):
    context.browser.click_save()
    time.sleep(2)

@when("I should see a confirmation message")
def step_impl(context):
    expected_page_menu_text = "George Best was added successfully!"
    assert context.browser.get_add_menu().text == expected_page_menu_text

@when("I click finish")
def step_impl(context):
    context.browser.click_finish()
    time.sleep(2)
