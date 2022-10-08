from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import Select

driver= webdriver.Firefox()
driver.get("file:///C:/Users/david/Desktop/IT%20Learning/SELENIUM/Python%20automation%20and%20testing/Exercise%20Files/CH03/03_02/html_code_03_02.html?numReturnSelect=15000&continue=Submit")

select= Select(driver.find_element(By.NAME,'numReturnSelect'))
time.sleep(2)
select.select_by_index(4)
time.sleep(2)
select.select_by_visible_text("200")
time.sleep(2)
select.select_by_value("250")
time.sleep(2)

options = select.options
print(options)

submit_button = driver.find_element(By.NAME, 'continue')
submit_button.submit();
time.sleep(2)

driver.close()