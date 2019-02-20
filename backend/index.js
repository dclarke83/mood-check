const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./index.routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));