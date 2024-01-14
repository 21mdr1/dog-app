require('dotenv').config();
const { PORT, CORS_ORIGIN, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: CORS_ORIGIN}));
app.use(express.json());

app.use('/images', express.static('./static/images'));

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})

// config.js
// helper.js