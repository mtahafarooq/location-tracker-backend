require('./models/User');
require('./models/Track');
const  express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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