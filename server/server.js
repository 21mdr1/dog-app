require('dotenv').config();
const { PORT, CORS_ORIGIN } = process.env;
const cors = require('cors');
const express = require('express');
const app = express();

const stepsRoutes =  require('./routes/steps-routes');
const preferencesRoutes =  require('./routes/preferences-routes');
const userRoutes = require('./routes/user-routes');

app.use(cors({ origin: CORS_ORIGIN}));
app.use(express.json());

app.use('/api/images', express.static('./public/images'));

app.use('/api/steps', stepsRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});