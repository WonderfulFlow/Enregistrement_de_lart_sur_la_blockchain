// load our app server using express somehow
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra'),
    path = require("path");


function getConnection () {
   return  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'renouveau75',
        database: 'digital_artwork'
    });
}
app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan('short'))

app.use(express.static('./public'))

app.post('/upload', (req,res)=> {
    console.log("Trying to create a new user...")
    
    const address = req.body.create_address
    const author = req.body.create_author
    const name = req.body.create_name
    const hash = req.body.create_image_hash
    const supply = req.body.create_supply
    const current_price = req.body.create_price

    queryString = "INSERT INTO digital_artwork.image (address,author,name_image,image_hash,supply,current_price) VALUES ( ?, ?, ?, ? , ? , ? );"
    getConnection().query(queryString, [address,author,name,hash,supply,current_price], (err,results,fields)=> {
        if (err) {
            console.log("Failed to insert new user:" + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user with id:", results.insertId)
        res.end()
    })
res.end()

        
})

app.get('/image/:id', (req,res) => {
    
    console.log("Fetching images with id : " + req.params.id)
           
        const imagesId = req.params.id
        const queryString = "SELECT * FROM  digital_artwork.image WHERE id_image = ?"
        getConnection().query(queryString, [imagesId], (err,rows,fields) => {
            if(err) {
                console.log("Failed to query for users: " + err)
                res.sendStatus( )
            }
            res.json(rows)
        });
        
        //res.end()
})

app.get('/image', (req,res) => {
    
    console.log("Print all images")
           
        const queryString = "SELECT * FROM  digital_artwork.image"
        getConnection().query(queryString,  (err,rows,fields) => {
            if(err) {
                console.log("Failed to query for users: " + err)
                res.sendStatus()
            }
            res.json(rows)
        });
        
        res.end()
})

http.createServer((req,res) => {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
        
        form.on('fileBegin', function(name, file) {
        file.path = path.join(__dirname, '/temp/') + file.name;
		});
        form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
		});

        form.on('end', function (fields, files) {
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = path.join(__dirname, '/upload/');

            fs.copy(temp_path, new_location + file_name, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                    // Delete the "temp" file
					fs.unlink(temp_path, function(err) {
					if (err) {
						console.error(err);
						console.log("TROUBLE deletion temp !");
						} else {
						console.log("success deletion temp !");
						}
					});      
                }
            });        
            
        
        });

        return;
    }

    /* Display the file upload form. */
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
    );
})

app.get("/",(req, res) => {
   console.log("Responding to root route")
   res.send("nodejs_restapi") 
})


// localhost:3003
app.listen(3003,() => {
    console.log("Server is up and listening on 3003...")
})