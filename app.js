// app.js - Vulnerabilidad de Inyección SQL
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(':memory:');

app.get('/buscar-usuario', (req, res) => {
    // VULNERABILIDAD: Concatenación directa de parámetros de entrada no sanitizados en la consulta SQL
    const username = req.query.username;
    const query = "SELECT * FROM usuarios WHERE username = '" + username + "'";

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send("Error en la base de datos");
            return;
        }
        res.json(rows);
    });
});
