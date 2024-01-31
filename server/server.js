require('dotenv').config();
const { PORT, CORS_ORIGIN, SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const cors = require('cors');
const express = require('express');
const app = express();

const stepsRoutes =  require('./routes/steps-routes');
const preferencesRoutes =  require('./routes/preferences-routes');
const userRoutes = require('./routes/user-routes');

app.use(cors({ origin: CORS_ORIGIN}));
app.use(express.json());

app.use('/images', express.static('./public/images'));

app.use((request, response, next) => {
    const token = request.headers.authorization.slice("Bearer ".length);

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        request.user_id = payload.user_id;

        next();
    } catch (error) {
        response.sendStatus(401);
    }
});

app.use('/steps', stepsRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});