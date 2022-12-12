from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.common import NoSuchElementException
import time

class Browser:
    URL = "https://jules.app/sign-up"
    def __init__(self):
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)

    def get_current_url(self):
        return self.driver.current_url


    def close(self):
        self.driver.quit()

    def go_to(self, url_text):
        element = self.driver.find_element(By.LINK_TEXT, url_text)
        element.click()

    def get_forgot_pass_link(self):
        forgot_pass_selector = (By.XPATH, '//*[@data-test-id="forgot-password-link"]')
        return self.driver.find_element(*forgot_pass_selector)

    def get_sign_up_link(self):
        sign_up_selector = (By.XPATH, '//*[@data-test-id="sign-up-link"]')
        return self.driver.find_element(*sign_up_selector)

    def enter_username(self, username):
        email_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[1]/div/div/input')
        email_input.send_keys(username)

    def enter_password(self, password):
        password_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[2]/div/div/input')
        password_input.send_keys(password)

    def enter_wrong_password(self, password):
        password_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[2]/div/div/input')
        password_input.send_keys(password)

    def click_login(self):
        login_button = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[3]/button/span[1]')
        login_button.click()

    def is_error_message_displayed(self, error_message):
        selector = f'//span[text()="{error_message}"]'
        error_message_element = self.driver.find_element(By.XPATH, selector)
        return error_message_element.is_displayed()

    def get_page_menu(self):
        page_menu_selector = (By.XPATH, '//*[@id="root"]/div[1]/div[1]/div/div[1]/span/span')
        return self.driver.find_element(*page_menu_selector)

    def click_add_menu(self):
        add_menu_selector = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[2]/div/div[2]/div[5]')
        add_menu_selector.click()

    def click_person(self):
        person_selector = self.driver.find_element(By.XPATH,'//*[@id="root"]/div[1]/div[3]/div/div[3]/div[2]/div/div/a[1]/div/div[2]/div')
        person_selector.click()

    def enter_firstname(self, name):
        firstname_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/form/div[1]/div[2]/div[1]/div/div/input')
        firstname_input.send_keys(name)

    def enter_lastname(self, name):
        lastname_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/form/div[1]/div[2]/div[2]/div/div/input')
        lastname_input.send_keys(name)

    def click_save(self):
        click_save = self.driver.find_element(By.XPATH , '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/form/div[2]/div/button')
        click_save.click()
        time.sleep(2)

    def get_add_menu(self):
        page_add_selector = (By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/div/span[1]')
        return self.driver.find_element(*page_add_selector)
        time.sleep(2)

    def check_confirmation_message(self):
        message_text = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/div/span[1]').text
        return message_text
        time.sleep(2)

    def click_finish(self):
        click_finish = self.driver.find_element(By.XPATH , '//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/div/div[2]/button/span[1]')
        click_finish.click()
        time.sleep(2)

    def click_item(self):
        click_item = self.driver.find_element(By.XPATH,'//*[@id="root"]/div[1]/div[3]/div/div[3]/div[2]/div/div/a[3]/div/div[2]/div')
        click_item.click()
        time.sleep(2)

    def click_to_my_records(self):
        click_to_my_records = self.driver.find_element(By.XPATH,'//*[@id="root"]/div[1]/div[3]/div/div[4]/div[3]/div[2]/div/div/div[2]/div[2]/div')
        click_to_my_records.click()
        time.sleep(2)

    def enter_item(self, name):
        item_input = self.driver.find_element(By.XPATH, "//*[@type='text']")
        item_input.send_keys(name)
        time.sleep(2)

    def click_clock(self):
        click_clock = self.driver.find_element(By.XPATH , "//*[@type='text']../*[value='clock']")
        click_clock.click()
        time.sleep(5)

    def click_account_logo(self):
        account_logo = self.driver.find_element(By.XPATH, "//*[@data-test-id='user-options-business-button']")
        account_logo.click()

    def click_my_account(self):
        my_account = self.driver.find_element(By.XPATH, '//*[@id="menu-list-grow"]/div[1]/li')
        my_account.click()

    def get_account_menu(self):
        page_menu_selector = (By.XPATH, '//*[@id="root"]/div[1]/div[4]/div[2]/div[2]/span[2]')
        return self.driver.find_element(*page_menu_selector)

    def click_library_menu(self):
        library_menu_selector = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[2]/div/div[2]/div[2]/div[2]')
        library_menu_selector.click()

    def get_library_menu(self):
        page_menu_selector = (By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[2]/span')
        return self.driver.find_element(*page_menu_selector)

    def click_personal_information(self):
        info = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[3]/div[3]/div[1]/div[1]/span')
        info.click()

    def get_personal_info_menu(self):
        page_menu_selector = (By.XPATH, '//*[@id="root"]/div[5]/div[2]/div[2]/span')
        return self.driver.find_element(*page_menu_selector)

    def click_people_menu(self):
        people_menu_selector = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[2]/div/div[2]/div[3]')
        people_menu_selector.click()

    def click_george_best(self):
        people_menu_selector = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div[3]/div/div[3]/div[4]/div/div[2]/div/span')
        people_menu_selector.click()

    def get_george_best(self):
        page_menu_selector = (By.XPATH, '//*[@id="root"]/div[3]/div[2]/div[2]/div/div')
        return self.driver.find_element(*page_menu_selector)

    def check_details_appears(self):
        message_text = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[3]/div[2]/div[3]/div[1]/div/div/div/button[1]/span[1]/div/div[2]').text
        return message_text
        time.sleep(2)