const express = require('express');
const cors = require('cors');

const { createConstructionsRepository } = require('./repository');

const app = express();

// allow express cors
app.use(cors());

const constructionsRepository = createConstructionsRepository();

app.get('/api/v1/constructions', (req, res) => {
    res.send(constructionsRepository);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});