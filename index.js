const joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());

let titles=[{id:1,title:'Title1'},{id:2,title:'Title2'},{id:3,title:'Title3'}];
//GET http://localhost:3000/
app.get('/',(req,resp)=>{    
    resp.setHeader('ContentType','json/application');
    resp.status=200;
    resp.send('Hello World');
});

//POST with validations

app.post('/api/v1/books',(req,resp)=>{
    let {error}=validateInput(req.body);
    if(error) return resp.status(400).send(error.details[0].message);
    
    const title={
        id:titles.length+1,
        title:req.body.title
    };
    titles.push(title);
    resp.status(201).send(title); 
});

//PUT 
app.put('/api/v1/books/:id',(req,resp)=>{
    const title= findTitleById(req.params.id);
    if(!title) return resp.status(404).send(`The title with id ${req.params.id} was not found`);

    let {error}=validateInput(req.body);
    if(error) resp.status(400).send(error.details[0].message);

    title.title=req.body.title;
    resp.send(title);
});

//DELETE
app.delete('/api/v1/books/:id',(req,resp)=>{
    const title= findTitleById(req.params.id);
    if(!title) return resp.status(404).send(`The title with id ${req.params.id} was not found`);

    const index=titles.indexOf(title);
    titles.splice(index,1);
    resp.send(title);
});

function validateInput(title){
    const schema={
        title: joi.string().min(3).required()
    }
    return joi.validate(title,schema);
}

function findTitleById(id){
    return titles.find((title)=>title.id===parseInt(id));
}

// GET http://localhost:3000/api/v1/books/
app.get('/api/v1/books',(req,resp)=>{
    let jsonResp=[{id:1,title:'Title1'},{id:2,title:'Title2'},{id:3,title:'Title3'}];
    resp.setHeader('ContentType','json/application');
    resp.status=200;
    resp.send(jsonResp);
});

// Route Param http://localhost:3000/api/v1/books/1
app.get('/api/v1/books/:id',(req,resp)=>{
    const title= findTitleById(req.params.id);
    if(!title) return resp.status(404).send(`The title with id ${req.params.id} was not found`);
    resp.status(200).send(title);
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

// SET PORT run export PORT=3000
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}....`));