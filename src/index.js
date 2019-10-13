require('./models/User')
const  express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('../routes/authRoutes')
const requireAuth = require('../middlewares/requireAuth')

const app = express();

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri = 'mongodb+srv://root:toor@cluster0-lpzzi.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongoose instance');
});
mongoose.connection.on('error', (err)=> {
    console.log(err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`userId: ${req.user.id}`)
});

app.listen(3000,()=>{
    console.log('App is listening')
})