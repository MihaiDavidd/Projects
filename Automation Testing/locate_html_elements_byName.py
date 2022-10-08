from selenium import webdriver
from selenium.webdriver.common.by import By
driver=webdriver.Firefox()
driver.get("file:///C:/Users/david/Desktop/IT%20Learning/SELENIUM/Python%20automation%20and%20testing/Exercise%20Files/CH02/html_code_02.html")

#find_element(By.NAME, ‘name’)
username = driver.find_element(By.NAME, 'username')
print("My input element is:")
print(username)
driver.close()