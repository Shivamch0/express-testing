
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new Tea //
app.post('/teas' , (req , res) => {
    const {name , price} = req.body;
    const newTea = {
        id : nextId++,
        name , 
        price
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// Get all Tea //
app.get('/teas' , (req , res) => {
    res.status(200).send(teaData);
});

// Get tea name through id //
app.get("/teas/:id" , (req , res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send(`404! Tea not found...`);
    }else{
        return res.status(200).send(tea);
    }
});

// Update Tea //
app.put("/teas/:id" , (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send(`404! Tea not found...`);
    }
    const {name , price} = req.body;
    tea.name = name;
    tea.price = price;
    return res.status(200).send(tea);
});

// Delete tea //
app.delete("/teas/:id" , (req , res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send(`404! Could not found the tea you are looking for...`);
    }
    teaData.splice(index , 1);
    return res.status(204).send('Deleted');
});

app.listen(port , () => {
    console.log(`Server running at port: ${port}...`);
});