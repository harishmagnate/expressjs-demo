const express=require('express');

const app=express();
//GET http://localhost:3000/
app.get('/',(req,resp)=>{    
    resp.setHeader('ContentType','json/application');
    resp.status=200;
    resp.send('Hello World');
});

// GET http://localhost:3000/api/v1/books/
app.get('/api/v1/books',(req,resp)=>{
    let jsonResp=[{id:1,title:'Title1'},{id:2,title:'Title2'},{id:3,title:'Title3'}];
    resp.setHeader('ContentType','json/application');
    resp.status=200;
    resp.send(jsonResp);
});
// Route Param http://localhost:3000/api/v1/books/1/Mission To Moon
app.get('/api/v1/books/:id/:title',(req,resp)=>{
    resp.status=200;
    resp.send(req.params);
});

//Query Params http://localhost:3000/api/v2/books?sortBy=title
app.get('/api/v2/books',(req,resp)=>{
    resp.status=200;
    resp.send(req.query);
});

// SET PORT run export PORT=5000
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening on port ${port}....`));