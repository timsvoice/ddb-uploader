A simple Node tool for uploading data in json format to your dynamoDB instance (without having to deal with data pipelines).

Lifted (almost) exactly from this blog post:
https://calorious.wordpress.com/2016/03/18/episode-4-importing-json-into-dynamodb/

##To Run

clone the repository

`npm install`

Change the Table name in `index.db`
Copy a json data file into the `./data/` directory
**make sure the region you are configing at the top of index,js is correct**

run script `npm run`
