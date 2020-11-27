const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//parse bodies from URL
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.json({ message: "Hello to Sportify"});
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

//connect to DB
const db = require('./models');
const Role = db.role;

db.mongoose.connect(`mongodb+srv://admin_sportify:admin_sportify@cluster0.5pmmh.mongodb.net/sportify_db?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    initial();
}).catch(err => {
        console.log("error", err);
        process.exit(); 
});

//create roles 
function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
            });
            new Role ({
                name: 'admin'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
        }
    })
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);