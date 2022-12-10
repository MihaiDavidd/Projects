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

    def enter_username(self, username):
        email_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[1]/div/div/input')
        email_input.send_keys(username)

    def enter_password(self, password):
        password_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[2]/div/div/input')
        password_input.send_keys(password)

    def click_login(self):
        login_button = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[3]/button/span[1]')
        login_button.click()

    def check_error_message_invalid_credentials(self):
        message_text = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/form/div/div[2]/div/p').text
        return message_text

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