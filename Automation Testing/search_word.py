from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Firefox()
driver.get("http://www.python.org")

search = driver.find_element("name", "q")
search.clear()
search.send_keys("pycon")
search.send_keys(Keys.RETURN)
time.sleep(3)

driver.close()