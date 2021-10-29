//This code i copy from Duong Quang Anh
$(document).ready(function() {
            loadData();
            $("#srchBox").on("keyup", function() {
                    var keyword = $(this).val();
                    $(function() {
                        $('#mytable tr').not(':nth-child(1)').remove();
                    });
                    var db = openDatabase('Database Rental', '1.0', 'RentalZ Application', 10 * 1024 * 1024);
                    db.transaction(function(tx) {
                    	var sql = 'SELECT * FROM Rent WHERE PptyType like ? or BedRm like ?';
                        tx.executeSql(sql,['%' + keyword + '%','%' + keyword + '%'],
                            function(tx, results) {
                                populateTable(results);
                            });
                    });
                });
            });
function loadData(){
	$(function() {
            $('#mytable tr').not(':nth-child(1)').remove()
    });
    var db = openDatabase('Database Rental', '1.0', 'RentalZ Application', 10 * 1024 * 1024);
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM Rent', [],
            function(tx, results) {
                populateTable(results)
            });
    });
}

function populateTable(results){
	$("#tbBody").empty();
	var len  = results.rows.length,i;
	var table = document.getElementById("mytable");
	var msg;
	for(i=0; i<len; i++)
	{

		console.log(results.rows.item(i));
		
		msg = "<tr><th><a data-ajax='false' href='edit.html?id="+results.rows.item(i).id+"'</a>"+results.rows.item(i).id+"</th>";
		msg += "<td>"+results.rows.item(i).PptyType+"</td>";
		msg += "<td>"+results.rows.item(i).BedRm+"</td>";
		msg += "<td>"+results.rows.item(i).rpDate+"</td>";
		msg += "<td>"+results.rows.item(i).Price+"</td>";
		msg += "<td>"+results.rows.item(i).furniType+"</td>";
		msg += "<td>"+results.rows.item(i).Note+"</td>";
		msg += "<td>"+results.rows.item(i).rpter+"</td>";
		msg += "<td><a class='ui-btn ui-btn-inline ui-mini' data-ajax='false' onclick='removeRow(this)' Rentzid='"+results.rows.item(i).id+"'>Delete</a></td>";
		document.querySelector("#tbBody").innerHTML += msg;
		$(function() {
            $("#mytable").table('refresh');
        });
	}
}

function deleteRowFromDB(id) {
    var db = openDatabase('Database Rental', '1.0', 'RentalZ Application', 10 * 1024 * 1024);
    db.transaction(function(tx) {
        var sql = "DELETE FROM Rent WHERE id = ?";
        tx.executeSql(sql, [id]);
    });
}

function removeRow(id) {
	var id = id.getAttribute("Rentzid");
	deleteRowFromDB(id);
	loadData();
}