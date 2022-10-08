from selenium import webdriver
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver= webdriver.Firefox()
driver.get('http://jqueryui.com/droppable')
driver.switch_to.frame(0) # to acces drag and drop interface

action_chains= ActionChains(driver)

source = driver.find_element(By.ID, 'draggable')
target = driver.find_element(By.ID, 'droppable')
time.sleep(2)

action_chains.drag_and_drop(source, target).perform()
time.sleep(2)

driver.close()