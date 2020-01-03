## Welcome to Write and Count!
**This app encourages kids to practice writing numbers and counting. Write and Count uses a pre-trained model that extracts features of an image to classify it according to the model.**

Created by Stacey Zander.

To Play:

1. Draw a number (1 - 10) on a white piece of paper or whiteboard and hold it up to the camera. The model recognizes numbers best when the number fills the field of view of the camera.

2. When the number you drew shows up on the button below the video screen, press it.

3. Scroll through the displayed number cards, add to and delete from your favorites, and practice counting. 

4. Draw all 10 numbers to collect more cards. Enjoy!

  
![background](/1.png)

  
**Demo:**



**Stack:**

Ruby/Rails
Postgresql
JavaScript

**API:**

https://p5js.org/  
https://ml5js.org/ - Feature Extractor, MobileNet model


**Install Instructions:**
(This is a deployed app, but if you would like to run it locally, follow these instructions.)

1. Have current versions of Ruby, Rails, and Lite-Server installed.

2. Install Ruby gems by running the command 'bundle install'.

3. Run the command 'rails db:create' and 'rails db:migrate' to set up your database.

4. Run the command 'rails db:seed' to fill the database with existing activities.

5. Open your terminal and navigate into the emotionsApp directory within the backend directory. Run the command 'rails s'.

6. Open a separate terminal window and navigate into the frontend folder. Run the command 'lite-server'.

7. Go to http://localhost:3001/, allow the app to use the camera on your computer.
