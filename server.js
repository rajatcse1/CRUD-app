var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

var mongoose = require("mongoose");

var path = require("path");
var clientPath = path.join(__dirname, "public");
app.use(express.static(clientPath));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//craete router
var router = express.Router();

router.use(function(req, res, next) {
    console.log("something is happening");
    next();
});

//api: goto client
router.get("/", function(req, res) {
    //console.info(res);
    res.sendFile(clientPath, "index.html");
});


//-----Connection Events----------
//-----------When Successfully Conected----------
mongoose.connection.on('connected', function() {
    console.log("DB Connected Successfully");
});

mongoose.connection.on('error', function(err) {
    console.log("DB Connection error: " + err);
});

mongoose.connection.on('disconnected', function() {
    console.log("DB Disconnected");
});

mongoose.connect('mongodb://localhost:27017/movies');

var schema = new mongoose.Schema({
    title: String,
    releaseYear: String,
    director: String,
    genre: String
});

var Resource = mongoose.model("movies", schema);


router.route('/')
    .get(function(req, res) {
        Resource.find(function(err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    })
    .post(function(req, res) {
        var item = new Resource();
        item.title = req.body.title;
        item.releaseYear = req.body.releaseYear;
        item.director = req.body.director;
        item.genre = req.body.genre;
        item.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: "Data has saved"
            });
        });
    });

router.route('/:resource_id')
    .get(function(req, res) {
        Resource.findById(req.params.resource_id, function(err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    })
    .put(function(req, res) {
        Resource.findById(req.params.resource_id, function(err, result) {
            if (err) {
                res.send(err);
            }

            result.title = req.body.title;
            result.releaseYear = req.body.releaseYear;
            result.director = req.body.director;
            result.genre = req.body.genre;

            result.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: "Data has updated"
                });
            });
        });
    })
    .delete(function(req, res) {
        Resource.remove({
            _id: req.params.resource_id
        }, function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: "Data successfully deleted"
            });
        });
    });


app.use('/api/v1/movies', router);

// start server
app.listen(port);
console.log("server started at : " + port);
