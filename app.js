// load our app server using express somehow
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

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

app.post('/image_create', (req,res)=> {
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
        
        //res.end()
})

app.get("/",(req, res) => {
   console.log("Responding to root route")
   res.send("nodejs_restapi") 
})


// localhost:3003
app.listen(3003,() => {
    console.log("Server is up and listening on 3003...")
})