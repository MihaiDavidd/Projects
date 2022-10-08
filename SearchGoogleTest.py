
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

# My first experience using Selenium 

driver = webdriver.Chrome()

class ChromeDriverTesting():
    
    def test1(self):
        
        driver.get("https://www.google.com/")

        try:
            accessGoogle = driver.find_element(By.ID, "L2AGLb")
            accessGoogle.click()
        except NoSuchElementException:
            pass   

        elementSearch = driver.find_element(By.NAME, "q")
        elementSearch.send_keys("selenium")
        elementSearch.submit()

    
    def test2(self):
        driver.get("https://www.google.com/")

        try:
            accessGoogle = driver.find_element(By.ID, "L2AGLb")
            accessGoogle.click()
        except NoSuchElementException:
            pass    
        
        elementSearch = driver.find_element(By.NAME, "q")
        elementSearch.send_keys("anything")
        elementSearch.submit()
   

name =  ChromeDriverTesting()
name.test1()
name.test2()
driver.close()    


