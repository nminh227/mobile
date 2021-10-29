//This code i copy from Duong Quang Anh
$(document).ready(function() {
	var id = getValue("id");
	var db = openDatabase('Database Rental', '1.0', 'RentalZ Application', 10 * 1024 * 1024);
    db.transaction(function(tx) {
        var sql = "SELECT * FROM Rent WHERE id = ?";
        tx.executeSql(sql,[id],
            function(tx, results) {
            	var results = results.rows.item(0);
                var PptyType = $("#PptyType-button").find('span').text(results.PptyType);
                $("#PptyType option[value='"+results.PptyType+"']").attr("selected","selected");
				var BedRm = $("#BedRm-button").find('span').text(results.BedRm);
				$("#BedRm option[value='"+results.BedRm+"']").attr("selected","selected");
				var rpDate = $("#rpDate").val(results.rpDate);
				var Price = $("#Price").val(results.Price);
				var intPrice = parseInt($("#Price").val());
				var furniType = $("#furniType-button").find('span').text(results.furniType);
				$("#furniType option[value='"+results.furniType+"']").attr("selected","selected");
				var Note = $("#note").val(results.note);
				var rpter = $("#rpter").val(results.rpter);
            });
    });
});

function getValue(param){
	var queryString = new Array();
	var value = "";
		if(window.location.search.split('?').length > 1){
			var params = window.location.search.split('?')[1].split('&');
			for(var i = 0; i< params.length; i++){
				var key = params[i].split('=')[0];
				value = decodeURIComponent(params[i].split('=')[1]);
				queryString[key] = value;
			}
		}
	return value;
}

function save(){
	var id = getValue("id");
	var db = openDatabase('Database Rental', '1.0', 'RentalZ Application', 10 * 1024 * 1024);
    var PptyType = $("#PptyType").val();
				var BedRm = $("#BedRm").val();
				var rpDate = $("#rpDate").val();
				var Price = $("#Price").val();
				//var intPrice = parseInt($("#Price").val());
				var furniType = $("#furniType").val();
				var Note = $("#note").val();
				var rpter = $("#rpter").val();
    db.transaction(function(tx) {
        var sql = "UPDATE Rent SET PptyType = ?, BedRm = ?, rpDate = ?, Price = ?, furniType = ?, Note = ?, rpter = ? WHERE id = ?";
        tx.executeSql(sql,[PptyType, BedRm, rpDate, Price, furniType, Note, rpter,id]);
        window.alert("Update succesful");    
    });
}