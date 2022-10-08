from selenium import webdriver
from selenium.webdriver.common.by import By
driver=webdriver.Firefox()
driver.get("http://www.seleniumhq.org/")

# locate the element by id "q" and print it.
element_id = driver.find_element(By.ID, 'q')
print(element_id)
# locate the element by name "q" and print it.
element_name = driver.find_element("name", 'q')
print(element_name)
# locate the element heading "What is Selenium?" by XPath and print it.
heading_xpath = driver.find_element((By.XPATH, "//*[@id='mainContent']/h2[1]"))
print(heading_xpath)
# Find element by class "selenium-sponsors" and print it.
element_classname = driver.find_element(By.NAME, 'selenium-sponsors')
print(element_classname)

driver.close()