# 1. Go to selenium.dev
# 2. locate the element by id "qsc-iw-id1" and print it
# 3. locate the element by name "submit" and print it
# 4. locate the element heading "Selenium automates browsers. That's it!" by XPath and print it
# 5. locate the element by class "selenium-backers" and print it

from selenium import webdriver
from selenium.webdriver.common.by import By
driver=webdriver.Firefox()
driver.get("http://www.selenium.dev/")

element_id = driver.find_element(By.ID, 'qsc-iw-id1')
print(element_id)

element_name = driver.find_element("name", 'submit')
print(element_name)

heading_xpath = driver.find_element((By.XPATH, "//section[class='hero homepage']/h1[1]"))
print(heading_xpath)

element_classname = driver.find_element(By.NAME, 'selenium-backers')
print(element_classname)

driver.close()