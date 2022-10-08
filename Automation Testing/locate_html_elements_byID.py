from selenium import webdriver
from selenium.webdriver.common.by import By
driver=webdriver.Firefox()
driver.get("file:///C:/Users/david/Desktop/IT%20Learning/SELENIUM/Python%20automation%20and%20testing/Exercise%20Files/CH02/html_code_02.html")

#find_element(By.ID, ‘id’)
login_form = driver.find_element(By.ID, 'loginForm')
print("My login form element is:")
print(login_form)
driver.close()
