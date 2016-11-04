/*********************************
Simple Demo for loading files into
DynamoDB.
**********************************/

//package to read json files
var jsonfile = require('jsonfile');
//AWS node sdk
var AWS = require('aws-sdk');

//need to update region in config
AWS.config.update({
    region: "us-west-2"
});

//create a doc client to allow using JSON directly
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

//prepared JSON file
//[{ ... }, { ... }]
var dataFile = "./data/your.data.json";
var dataArray = jsonfile.readFileSync(dataFile);
var tableName = 'YourTableName';

//utility function to create a single put request
function getData(index){
    return {
        TableName: tableName,
        Item: dataArray[index]
    };
}

//recursive function to save one data at a time
function saveData(index){

    if(index == dataArray.length){
        console.log("saved all.");
        return;
    }

    var params = getData(index);
    //spit out what we are saving for sanity
    console.log(JSON.stringify(params));
    //use the client to execute put request.
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        }else{
            console.log("saved data item "+index);
            index += 1;
            //save the next data on the list
            //with half a second delay
            setTimeout(function(){
                saveData(index);
            }, 500);
        }
    });
}

//start saving from index - 0
saveData(0);
