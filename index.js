const express = require("express");
const cors = require("cors");
app = express();
const PORT = 8080;

let roster = [];
let record = {
    won: 0,
    lost: 0
} 

app.use(cors());
app.use(express.json());

app.get("/api/record", (req, res) => {
    res.json(record);
});

app.put("/api/record", (req, res) => {
    record = req.body;
    res.status(200).json(record);
});

app.get("/api/roster", (req, res) => {
    res.json(roster);
});

app.post("/api/roster/:id", (req, res) => {
    const newPlayer = {
        id: req.params.id,
        ... req.body
    }
    roster.push(newPlayer);
    res.status(201).json(newPlayer);
});

app.put("/api/roster/:id", (req, res) => {
    const updatedPlayer = {
        id: req.params.id,
        ... req.body
    }
    found = false;
    roster.forEach((player, index) => {
        if (player.id == req.params.id) {
            roster[index] = updatedPlayer;
            found = true;
        }
    });
    if (found) {
        res.status(200).json(updatedPlayer);
    }    
    else {
        res.status(400).json( { message: `Player ${req.params.id} unable to be found` } );
    }
});

app.delete("/api/roster/:id", (req, res) => {
    found = false;
    roster.forEach((player, index) => {
        if (player.id == req.params.id) {
            roster.splice(index, 1);
            found = true;
        }
    });
    if (found) {
        res.status(200).json( { message: `Player ${req.params.id} deleted successfully` } );
    }
    else {
        res.status(400).json( { message: `Player ${req.params.id} unable to be found` } );
    }
});

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});