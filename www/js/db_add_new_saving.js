// global variables
var db;
var shortName = 'ShoppingSavingDB';
var version = '1.0';
var displayName = 'ShoppingSavingDB';
var maxSize = 65535;

//document.addEventListener("deviceready", onBodyLoad, false);
 
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	alert('Error: ' + error.message + ' code: ' + error.code); 
}
 
// this is called when a successful transaction happens
function successCallBack() {
	//alert("DEBUGGING: success");
}

// this is called when a successful transaction happens
function successCallBack_Add() {
	//alert("DEBUGGING: success");
	$("#btnGoBack").click()
}

function nullHandler(){
	//alert("DEBUGGING: NULL handeller");
};
 
// called when the application loads
function onBodyLoad(){
	// This alert is used to make sure the application is loaded correctly
	// you can comment this out once you have the application working
	//alert("DEBUGGING: we are in the onBodyLoad() function");
	 
	if (!window.openDatabase) {
		// not all mobile devices support databases if it does not, the following alert will display
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this line tries to open the database base locally on the device
	// if it does not exist, it will create it and return a database object stored in variable db
	db = openDatabase(shortName, version, displayName, maxSize);
	 
	// this line will try to create the table User in the database just created/opened
	db.transaction(function(tx){ 
		// you can uncomment this next line if you want the User table to be empty each time the application runs
		// tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
		 
		// this line actually creates the table User if it does not exist and sets up the three columns and their types
		// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
		// easily from the table.
		//alert("create table");
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Savings(SavingID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, SavingDate DATETIME NOT NULL, Amount MONEY NOT NULL, Product TEXT, Royalty TEXT, Place TEXT, Type TEXT, CreatedTime DATETIME)', [], nullHandler, errorHandler);
	},errorHandler,successCallBack); 
}

// this is the function that puts values into the database using the values from the text boxes on the screen
function ClearData() {
 
	alert("ClearData");
	//alert($('#txFirstName').val());
	
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	
 	db.transaction(function(tx){ 
		// you can uncomment this next line if you want the User table to be empty each time the application runs
		// tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
		 
		// this line actually creates the table User if it does not exist and sets up the three columns and their types
		// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
		// easily from the table.
		//alert("add value to table");
		//alert($('#txFirstName').val() + " " + $('#txLastName').val());
		tx.executeSql( 'DELETE FROM Savings',[], nullHandler, errorHandler);
	},errorHandler,successCallBack); 
	
	// this calls the function that will show what is in the User table in the database
	//ListDBValues();
	 
return false;
 
}

function GetCurrentTime(){
/*
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	
	var dt = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
	//alert(dt);
*/
/*
	var timeString = month + "/" + day + "/" + year + ((hours > 12) ? hours - 12 : hours);
	timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
	timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
	timeString  += (hours >= 12) ? " P.M." : " A.M.";
 */ 

	//require date.js
	var myDt = new Date().toString('yyyy-MM-ddTHH:mm:ss');

	return (myDt);
}