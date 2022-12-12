import time
from behave import *

@given("I am on the home page")
def step_impl(context):
    context.browser.driver.get("https://jules.app/search/all")
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

@when("I click item")
def step_impl(context):
    context.browser.click_item()
    time.sleep(2)

@when("I click to my records")
def step_impl(context):
    context.browser.click_to_my_records()
    time.sleep(2)

@when("I enter a item")
def step_impl(context):
    context.browser.enter_item("Clock")
    time.sleep(2)

@when("I select clock")
def step_impl(context):
    context.browser.click_clock()
    time.sleep(2)

@when("I click the account logo")
def step_impl(context):
    context.browser.click_account_logo()
    time.sleep(2)

@when("I click on My Account")
def step_impl(context):
    context.browser.click_my_account()
    time.sleep(2)

@then("I should see My Account")
def step_impl(context):
    expected_page_menu_text = "Manage your account info or membership details."
    assert context.browser.get_account_menu().text == expected_page_menu_text
    time.sleep(2)

@when("I click the library menu")
def step_impl(context):
    context.browser.click_library_menu()
    time.sleep(2)

@when("I should see Library")
def step_impl(context):
    expected_page_menu_text = "Browse items by record."
    assert context.browser.get_library_menu().text == expected_page_menu_text
    time.sleep(2)

@when("I click on personal information")
def step_impl(context):
    context.browser.click_personal_information()
    time.sleep(2)

@then("I should see Mihai David's Personal Information")
def step_impl(context):
    expected_page_menu_text = "Mihai David's Personal Information"
    assert context.browser.get_personal_info_menu().text == expected_page_menu_text
    time.sleep(2)

@when("I click the people menu")
def step_impl(context):
    context.browser.click_people_menu()
    time.sleep(2)

@when("I click on George Best")
def step_impl(context):
    context.browser.click_george_best()
    time.sleep(2)

@Then ('I should see account name')
def step_impl(context):
    expected_page_menu_text = "George Best"
    assert context.browser.get_george_best().text == expected_page_menu_text
    time.sleep(2)