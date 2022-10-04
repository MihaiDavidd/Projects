
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome(executable_path="E:\\CURS_TESTARE_SOFTWARE_2022\\curs17\\TESTARE_PYTHON\\chromedriver_win32\\chromedriver.exe")

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
        elementSearch.send_keys("oricealtceva")
        elementSearch.submit()
   

name =  ChromeDriverTesting()
name.test1()
name.test2()
driver.close()    


