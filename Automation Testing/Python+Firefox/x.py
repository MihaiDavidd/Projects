from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time

driver = webdriver.Chrome()

class LoginTests():

    def login_OK(self):
        driver.get("https://www.demo.guru99.com/V4/")
        time.sleep(5)
        driver.switch_to.frame("gdpr-consent-notice")

        # frame = driver.find_element(By.XPATH,"//iframe[@id='gdpr-consent-notice']")
        save = driver.find_element(By.ID, "save")
        save.click()
        print("test")

        username = driver.find_element(By.NAME, "uid")
        username.send_keys("mngr443087")

        password = driver.find_element(By.NAME, "password")
        password.send_keys("Ujyhape")

        btnLogin = driver.find_element(By.NAME, "btnLogin")
        btnLogin.click()

        actualTitle = driver.title
        print(actualTitle)

        if (actualTitle == "Guru99 Bank Manager HomePage"):
            print("Test cases Login Passed")
        else:
            print("Test case Login Failed")


loginTesting = LoginTests()
loginTesting.login_OK()
