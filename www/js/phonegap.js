//This code i copy from Duong Quang Anh
$(document).ready(function() {
	$("#Create").click(function(event) {
		var db = openDatabase('Database Rental','1.0','RentalZ Application',10*1024*1024);
		db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS Rent(id integer primary key autoincrement, PptyType text, BedRm text, rpDate text, Price number, furniType text, Note text, rpter text)');
			var PptyType = $("#PptyType").find(":selected").val();
			var BedRm = $("#BedRm").find(":selected").val();
			var rpDate = $("#rpDate").val();
			var Price = $("#Price").val();
			var intPrice = parseInt($("#Price").val());
			var furniType = $("#furniType").find(":selected").val();
			var Note = $("#Note").val();
			var rpter = $("#rpter").val();
			
			if(PptyType == ""){
				alert("Please choose property type");
				$("#PptyType").focus();
			}
			else if(BedRm == ""){
				alert("Please choose bedroom type");
			}
			else if(rpDate == ""){
				alert("Please choose report date");
			}
			else if(Price == ""){
				alert("Price is required");
				$("#Price").val("");
				$("#Price").focus();
			}
			else if(!typeof Price == 'number')
			{
				alert("Price must be number!");
				$("#Price").val();
				$("#Price").focus();
			}
			else if(intPrice < 100 || intPrice > 10000){
				alert("Price must be between 100 and 10000");
				$("#Price").val("");
				$("#Price").focus();
			}
			else if(rpter == ""){
				alert("Reporter's name is required");
				$("#rpter").focus();
			}
			else{
				var sql = "INSERT INTO Rent(PptyType, BedRm, rpDate, Price, furniType, Note, rpter) values (?, ?, ?, ?, ?, ?, ?)";
				tx.executeSql(sql,[PptyType,BedRm,rpDate,intPrice,furniType,Note,rpter]); 
				alert("New record has been added to the database");
				document.getElementById("Refresh").click();
			}
		});
	});

	$("#Refresh").click(function(event) {
		var PptyType = $("#PptyType-button").find('span').text("Choose property type");
		var BedRm = $("#BedRm-button").find('span').text("Choose bedroom type");
		var rpDate = $("#rpDate").val("");
		var Price = $("#Price").val("");
		var furniType = $("#furniType-button").find('span').text("Choose furniture type");
		var Note = $("#Note").val("");
		var rpter = $("#rpter").val("");
	});
});													