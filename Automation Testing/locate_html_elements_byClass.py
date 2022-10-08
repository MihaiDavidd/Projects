from selenium import webdriver
from selenium.webdriver.common.by import By
driver=webdriver.Firefox()
driver.get("file:///C:/Users/david/Desktop/IT%20Learning/SELENIUM/Python%20automation%20and%20testing/Exercise%20Files/CH02/html_code_02.html")

#driver.find_element(By.CLASS_NAME, " ")
content = driver.find_element(By.CLASS_NAME, "content")
# when you want to locate a group of elements besides the class attribute 

print("My class element is:")
print(content)
driver.close()