/********************************************************************************
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Lap Chi Wong Student ID: 112867221 Date: 16 Jan 2024
*
* Published URL: https://adorable-foal-boot.cyclic.app
*
********************************************************************************/

const express = require("express");
const cors = require("cors");
const ListingsDB = require("./modules/listingsDB");
require("dotenv").config();
const db = new ListingsDB();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API Listening" });
});

app.post("/api/listings", async (req, res) => {
    try {
        const result = await db.addNewListing(req.body);
        res.json(result);
    } catch(err) {
        res.status(404).json({ error: err });
    }
});

app.get("/api/listings", async (req, res) => {
    try {
        const result = await db.getAllListings(req.query.page || 1, req.query.perPage || 10, req.query.name || null);
        res.json(result);
    } catch(err) {
        res.status(404).json({ error: err });
    }
});

app.get("/api/listings/:id", async (req, res) => {
    try {
        const result = await db.getListingById(req.params.id);
        res.json(result);
    } catch(err) {
        res.status(404).json({ error: err });
    }
});

app.put("/api/listings/:id", async (req, res) => {
    try {
        const result = await db.updateListingById(req.body, req.params.id);
        res.json(result);
    } catch(err) {
        res.status(404).json({ error: err });
    }
});

app.delete("/api/listings/:id", async (req, res) => {
    try {
        const result = await db.deleteListingById(req.params.id);
        res.json(result);
    } catch(err) {
        res.status(404).json({ error: err });
    }
});

db.initialize(process.env.MONGODB_CONN_STRING)
.then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});