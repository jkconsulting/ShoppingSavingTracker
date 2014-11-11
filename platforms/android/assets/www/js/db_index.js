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
	
	refreshTotal();
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
		
		//HTML5 uses SQLite, which does not have a storage class set aside for storing dates and/or times
		//See documetation: http://www.sqlite.org/datatype3.html
		//Store DATETIME that will be used for calculation as UTC

		//tx.executeSql( 'DROP TABLE Savings;' );
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Savings(SavingID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, SavingDate INTEGER NOT NULL, Amount MONEY NOT NULL, Product TEXT, Royalty TEXT, Place TEXT, Type TEXT, CreatedTime DATETIME)', [], nullHandler, errorHandler);

	},errorHandler,successCallBack); 
}
 
// list the values in the database to the screen using jquery to update the #lbUsers element
function ListDBValues(ctrl) {
	//alert("ListDBValues");
	
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
	// content and not just keep repeating lines
	ctrl.html('');
	
	// this next section will select all the content from the User table and then go through it row by row
	// appending the UserId FirstName LastName to the #lbUsers element on the page
	db.transaction(function(tx) {
			
		var sqlStr = 'SELECT * FROM Savings ORDER BY SavingID DESC;';
	
		//alert(sqlStr);
		tx.executeSql(sqlStr, [],
			function(tx, result) {
				//alert(result);
				if (result != null && result.rows != null) {
					//alert("here: " + result.rows.length);
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var d = moment(row.SavingDate);
						//alert(d);
						ctrl.append('<br>|' + row.SavingID + '|' + d.format(DT_FORMAT) + '|' + row.Amount + '|' + row.Product + '|' + row.Royalty + '|' + row.Place + '|' + row.Type + '|' + row.CreatedTime);
					}
					if (result.rows.length == 0){
						//alert("No data");
						ctrl.append('<br>No History Data');
					}
				}
			},errorHandler);
	},errorHandler,nullHandler);
	
	return;

}

function runSumSql(ctrl, sqlStr) {
	//alert("runSumSql: " + ctrl + ", " + sqlStr);
	
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	
	ctrl.html('');
	//alert(sqlStr);
	db.transaction(function(tx) {
		//alert("executeSQL: " + sqlStr);

		tx.executeSql(sqlStr, [],
			function(tx, result) {
				//alert("here: " + result);
				if (result != null && result.rows != null) {
					//alert("here: " + result.rows.length);
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(0);
						//alert(row.Total);
						ctrl.html("$" + row.Total.toFixed(2) + " (" + row.NumSavings + ")");
					}
					if (result.rows.length == 0){
						//alert("No data");
						ctrl.html('$0.00');
					}
				}else{
					alert("No Result");
				}
			},errorHandler);
	},errorHandler,nullHandler);
	
	return;

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
