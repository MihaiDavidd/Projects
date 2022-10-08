'''Problem description
#Find out if there are any duplicate urls used in the
#json placeholder photo data

- get the data about the photos
- read that data into a variable  
- create a list for storing the url of each photo
- add the url for each photo to the url_list

How many items are in the url list (Should be 5000 since we have 5000 photos in our dataset)?
How many items are there if we turn that list into a set?'''

import requests

url = 'https://jsonplaceholder.typicode.com/photos'
response = requests.get(url)

json_data = response.json()
url_list=[]
for photo in json_data:
    url_list.append(photo['url']) #add each url to each photo to the list

print(len(url_list)) #how many url are
print(len(set(url_list)))  #eliminate duplicates

# Final answer there are 4 URL are duplicates 

