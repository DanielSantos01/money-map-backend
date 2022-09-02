import express from 'express';

const app = express()
// const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

