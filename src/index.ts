import express from 'express';

let app = express();
let port = 3000;

app.use((req, res, next) =>{
    console.log(`${Date.now()} [${req.method}] ${req.path}`)
    next();
})

app.get('/',(req, res) => {
    console.log('moin')
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.0.146:${port}`)
})