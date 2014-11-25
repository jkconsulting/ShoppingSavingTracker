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
	alert("DEBUGGING: success");
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
/*	 
	// this line will try to create the table User in the database just created/opened
	db.transaction(function(tx){ 
		// you can uncomment this next line if you want the User table to be empty each time the application runs
		// tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
		 
		//HTML5 uses SQLite, which does not have a storage class set aside for storing dates and/or times
		//See documetation: http://www.sqlite.org/datatype3.html
		//Store DATETIME that will be used for calculation as UTC
		//tx.executeSql( 'CREATE TABLE IF NOT EXISTS Savings(SavingID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, SavingDate INTEGER NOT NULL, Amount MONEY NOT NULL, Product TEXT, Royalty TEXT, Place TEXT, Type TEXT, CreatedTime DATETIME)', [], nullHandler, errorHandler);
		//tx.executeSql( 'DROP TABLE Savings;' );
		sqlStr1 = 'CREATE TABLE IF NOT EXISTS Savings(SavingID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, SavingDate INTEGER NOT NULL, Amount MONEY NOT NULL, Product TEXT, Royalty TEXT, Place TEXT, Type TEXT, CreatedTime DATETIME);';
		sqlStr2 = 'CREATE TABLE IF NOT EXISTS LookupItems(ItemID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ItemType TEXT, ItemValue TEXT);';
		
		tx.executeSql( sqlStr1, [], nullHandler, errorHandler);
		tx.executeSql( sqlStr2, [], nullHandler, errorHandler);

		},errorHandler,successCallBack); 
*/		
}
 
// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {
 
	//alert("AddValueToDB");

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
		//alert("add value to table: " + $('#selItemType').val() + ", " + $('#txtItemValue').val());
			
		tx.executeSql( 'INSERT INTO LookupItems(ItemType, ItemValue) VALUES (?,?)',[$('#selItemType').val(), $('#txtItemValue').val()], nullHandler, errorHandler);
	},errorHandler,successCallBack_Add); 
	
	// this calls the function that will show what is in the User table in the database
	//ListDBValues();
	 
return false;
 
}

