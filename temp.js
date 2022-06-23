const express = require('express');
const app = express();
app.use(express.static("abc"));

const mysql = require('mysql2');
const dbparams = {
	host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'demo',
	port:3306
}
const connection = mysql.createConnection(dbparams);
app.get("/poc1", (req, resp) => {
	let bookid = req.query.bookid;
	let bookname = req.query.bookname;
	let output = { status: false, bookdetails: { bookid: 0, bookname: "", price: 0 } };
	connection.query('select * from book where bookid=?', [bookid],
		(err, rows) => {
			if (err) {
				console.log("Error Occured " + err);
			}
			else {
				if (rows.length > 0) {
					output.status = true;
					output.bookdetails = rows[0];
				}
			}
			resp.send(output);
		}
	);
});
 
 
app.get("/poc2", (req, resp) => {
	let bookid = req.query.bookid;
	let price = req.query.price;
	let output = { status: false, bookdetails: { bookid: 0, bookname: "", price: 0 } };
	connection.query('update book set price=? where bookid=?', [price,bookid],
		(err, rows) => {
			if (err) {
				console.log("Error Occured " + err);
			}
			else {
				if (rows.affectedRows > 0) {
					output.status = true;
				}
			}
			resp.send(output);
		}
	);
 });


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
