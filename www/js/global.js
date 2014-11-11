Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

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

function GetDateUTC(dt){
	return Date.UTC(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate() , 
					dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
}