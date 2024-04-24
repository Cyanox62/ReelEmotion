The basis of our project was creating a sentiment analysis tool that, given a movie, outputs a percent score from 0-100 based off reviews. 

The application is hosted on cloud run, and we created a google function that, when given a movie, fetches movie reviews that we manually inputted to a cloud storage database. Based on these reviews, we used the Natural Language API to generate a score for how the audience rated the movie. This was returned to the function, and displayed on the host. 

Our form of automation was using github actions with a service account, so that any time a push was made to our repo, it was re-deployed to cloud run and cloud functions. 

[The link to our site] (https://test-6yi6fed3hq-ue.a.run.app/)
