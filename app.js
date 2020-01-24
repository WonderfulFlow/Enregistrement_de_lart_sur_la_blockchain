const express = require("express");
const app = express();
const morgan = require('morgan');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra'),
    path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "artblockchain",
});

connection.connect();
app.use(morgan('short'));
app.use(express.static('./public'));

// app.get('/', function(req, res){
//     res.json('slt');
// });




// app.get('/', function(request, response){
//     connection.query('SELECT * FROM test', function(err, rows, fields){
//         if(err){
//             console.log('Encountered an error : ', err.message);
//             return response.send(500, err.message);
//         }
//
//         const data = ({'services': rows});
//         console.log(data);
//
//         response.render('index', {
//             title: 'home',
//             data: data,
//             page: 'home'
//         });
//     });
// });

app.use(function(req, res, next) {
//to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', true);

// origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin', req.headers.origin);

// list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    next();
});

app.post('/api/image', function(req, res, next){
    const contract_address = req.body.contract_address;
    const artist_name = req.body.artist_name;
    const artist_address = req.body.artist_address;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const supply = req.body.supply;
    const nb_rows = req.body.nb_rows;
    const nb_cols = req.body.nb_cols;
    const original_width = req.body.original_width;
    const tile_height = req.body.tile_height;
    const tile_width = req.body.tile_width;

    const matches = req.body.uploadedImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    const imageBuffer = response.data;
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const fileName = id + '.jpg';

    try {
        fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');

        const queryString = "INSERT INTO image (id, contract_address, artist_name, artist_address, name, description, price, supply, nb_rows, nb_cols, original_width, tile_height, tile_width) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        connection.query(queryString, [id, contract_address, artist_name, artist_address, name, description, price, supply, nb_rows, nb_cols, original_width, tile_height, tile_width], (err, results, fields) => {
            if(err){
                console.log("Failed to insert new user.");
                res.sendStatus(500);
                return;
            }

            console.log('Inserted a new user with id : ', results.insertId);
            res.end();
        });

    } catch (e) {
        next(e);
    }
});

app.get('/api/image/:id', function(req, res){
    res.sendFile('D:/Projets/React/backend/images/' + req.params.id + '.jpg');
});

app.get('/api/data', function(req, res) {
    const query = "SELECT * FROM image;";

    connection.query(query, (err, rows) => {
        if(err){
            console.log("Failed to query.");
            res.sendStatus();
        }

        res.json(rows);
    });
});

app.get('/api/data/:id', function(req, res){
    const query = "SELECT * FROM image WHERE id = " + req.params.id + ";";

    connection.query(query, (err, rows) => {
        if(err){
            console.log('Failed to query');
            res.sendStatus();
        }

        res.json(rows);
    })
});

app.get('/api/tokens/:id_artwork/:owner_address', function(req, res){
    const id_artwork = req.params.id_artwork;
    const owner_address = req.params.owner_address;
    const query  = "SELECT token_artwork_id FROM tokens WHERE id_artwork = " + id_artwork + " AND owner_address = " + owner_address + ";";

    connection.query(query, (err, rows) => {
        if(err){
            console.log('Failed to query');
            res.sendStatus();
        }

        res.json(rows);
    })
});




app.listen(3003, () => {
    console.log("Server is up and listening on 3003...");
});