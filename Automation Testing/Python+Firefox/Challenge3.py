# 1. Go to https://wiki.python.org/moin/FrontPage
# 2. Perform a search for the text "Beginner"
# 3. In the left-side menu bar, change the value of the select from More Options to Raw text

from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

driver= webdriver.Firefox()
driver.get('https://wiki.python.org/moin/FrontPage')

searchBox = driver.find_element(By.ID, 'searchinput')
searchBox.clear()
searchBox.send_keys("Beginner")
searchBox.send_keys(Keys.RETURN)
time.sleep(3)

select = Select(driver.find_element(By.XPATH, "//*/form/div/select"))
select.select_by_visible_text("Raw Text")
time.sleep(5)
driver.close()

