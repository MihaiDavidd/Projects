from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

class Login(unittest.TestCase):

     def setUp(self) -> None:
        self.browser = webdriver.Chrome()
        self.browser.get("https://the-internet.herokuapp.com/")
        self.browser.find_element(By.XPATH, "//a[normalize-space()='Form Authentication']").click()
        self.browser.maximize_window()
        self.browser.implicitly_wait(5)

     def tearDown(self) -> None:
        time.sleep(2)
        self.browser.quit()

     def test_url(self):  # check if you arrive on the new url
        self.assertEqual(self.browser.current_url, "https://the-internet.herokuapp.com/login",'Wrong URL')
        print("Test succesful ! New URL is:" , str(self.browser.current_url))

     def test_page_tittle(self): # check page tittle
        self.assertEqual(self.browser.title, 'The Internet', 'Titlul paginii nu se potriveste')
        print("Page title is correct !")

     def test_text_Login_Page(self): # check login page text
        self.assertEqual(self.browser.find_element(By.XPATH,"//h2").text, "Login Page", "Wrong text")
        print("The text is correct")

     def test_login_button(self):  # check login button vizability
        self.assertTrue(self.browser.find_element(By.XPATH, '//*[@id="login"]/button/i').is_displayed(),"No Login Button!")
        print("Login Button is displayed")

     def test_atribut_link(self): # verificare atribut
        atribut = self.browser.find_element(By.LINK_TEXT, 'Elemental Selenium')
        atribut = atribut.get_attribute('href')
        print(atribut)
        self.assertEqual(atribut, 'http://elementalselenium.com/', 'The links are different')
        print("The attribute is correct")


     def test_error_empty_credentials(self):  # login fara username si passwrod
        self.browser.find_element(By.XPATH, "//*[@id='login']/button").click()
        self.assertTrue(self.browser.find_element(By.ID,"flash").is_displayed(), "You can login")
        print("Error. You can't login without username and password")


     def test_wrong_credentials(self): # login cu username si parola gresita
        self.browser.find_element(By.ID, 'username').send_keys('username')
        self.browser.find_element(By.ID, 'password').send_keys('password')
        self.browser.find_element(By.XPATH, '//*[@id="login"]/button').click()
        expect_message = 'Your username is invalid!'
        self.assertTrue(expect_message in self.browser.find_element(By.ID, 'flash').text, 'You can login')
        print("You cannot login with incorect username and password")

     def test_remove_error_message(self): # close error message
         self.browser.find_element(By.XPATH, '//*[@id="login"]/button').click()
         time.sleep(1)
         self.assertTrue(self.browser.find_element(By.CLASS_NAME, "close").click() , "Warning message is still active")
         print("You can close the warning message")

     def test_user_password_valid(self): # login and check if new URL contains /secure
        self.browser.find_element(By.ID, 'username').send_keys('tomsmith')
        self.browser.find_element(By.ID, 'password').send_keys('SuperSecretPassword!')
        self.browser.find_element(By.XPATH, '//*[@id="login"]/button').click()
        self.assertTrue('/secure' in self.browser.current_url, 'URL not secured')
        WebDriverWait(self.browser, 20).until(EC.presence_of_element_located((By.ID, "flash")))
        login_succesful = self.browser.find_element(By.XPATH, '//*[@id="flash"]')
        self.assertTrue(login_succesful.is_displayed(), "Message doesn't show ")
        self.assertTrue('secure area!' in login_succesful.text, "The message doesn't contain the secure area")
        print("The message contains secure area")

     def test_logut(self): # logout and check if you arrived back on the login page
        self.browser.find_element(By.ID, 'username').send_keys('tomsmith')
        self.browser.find_element(By.ID, 'password').send_keys('SuperSecretPassword!')
        self.browser.find_element(By.XPATH, '//*[@id="login"]/button').click()
        self.browser.find_element(By.LINK_TEXT, 'Logout').click()
        self.assertEqual(self.browser.current_url, 'https://the-internet.herokuapp.com/login', "Wrong link")
        print("We are on the login page")