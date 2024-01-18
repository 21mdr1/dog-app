require('dotenv').config();
const { PORT, CORS_ORIGIN } = process.env;
const cors = require('cors');
const express = require('express');
const app = express();
//const query = require('./db');

const stepsRoutes =  require('./routes/steps');
const preferencesRoutes =  require('./routes/preferences');
const userRoutes = require('./routes/user');

app.use(cors({ origin: CORS_ORIGIN}));
app.use(express.json());

app.use('/images', express.static('./static/images'));

app.use('/steps', stepsRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});