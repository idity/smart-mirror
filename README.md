# smart-mirror

This is a website for making your mirror a SMART mirror.
In order to use it, you should attach a simple tablet to a mirror. Then, open this one-page website on your tablet's browser and give it arguments in the url. You should define your browser to fill the screen entirely and define the screen to stay turned on all the time.
This website creates a grid on the browser's window with a transperant border. Each cell of the grid can contain one element. You can leave cells empty if you wish. You can decide which elements you want to show in which cells. 

## The elements that are available are: 
- Digital clock
- Analog clock
- A random article from Wikipedia
- Weather forecast

## The arguments that you can assign to the url:

**rows** - Specify a number between 1 to 4 which will be the number of rows of the grid

**cols** - Specify a number between 1 to 4 which will be the number of coloums of the grid

**A number** - Specify a number between 1 to rowsXcols and give it a value of one of the following: 

**_digclock_** - A digital clock will be displayed in the specified cell. 

**_anclock_** - An analog clock will be displayed in the specified cell. 

**_wiki_** - A Wikipedia random article will be displayed in the specified cell.

**_weather_** - A weather forecast will be displayed in the specified cell. In order for this function to work, the site should run using a secure connection (https).

## URL for example:
https://idity.github.io/smart-mirror/?rows=2&cols=2&1=digclock&2=anclock&3=wiki&4=weather


**_You are welcome to add more features to this website._**

