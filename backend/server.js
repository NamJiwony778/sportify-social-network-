const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//parse bodies from URL
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', (req, res) => {
// //    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//    res.json({ message: "Hello to Sportify"});
// });

require('./routes/interest.routes')(app);
require('./routes/privateInterest.routes')(app);
require('./routes/user.routes')(app);
require('./routes/activity.routes')(app);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

//connect to DB
const db = require('./models');

const createTables= require('./helpers/createTables');


db.mongoose.connect(`mongodb+srv://admin_sportify:admin_sportify@cluster0.5pmmh.mongodb.net/sportify_db?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    createTables.initial;
    createTables.createInterest;
}).catch(err => {
        console.log("error", err);
        process.exit(); 
});


require('./routes/auth.routes')(app);
require('./routes/participant.route')(app);
require('./routes/email.routes')(app);