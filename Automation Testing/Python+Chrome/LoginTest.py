from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome(executable_path="C:\\Users\\david\\Downloads\\chromedriver.exe")

class LoginTests():
    
    def login_OK(self):
         driver.get("https://www.demo.guru99.com/V4/")
         #save = driver.find_element(By.ID ,"save")
         #save = driver.find_element(By.PARTIAL_LINK_TEXT,"Accept All")
         #footer = driver.find_element(By.CLASS_NAME, "footer-container")
         #save.click()
         frame = driver.find_element(By.XPATH,"//iframe[@id='gdpr-consent-notice']")
         save = frame.find_element(By.ID, "save")
         save.click()
         print("test")

         

loginTesting = LoginTests()
loginTesting.login_OK()
         