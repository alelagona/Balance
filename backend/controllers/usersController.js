const db = require("../config/db");

exports.register = (req, res) => {
    const { name, surname, email, password } = req.body;
    
    const query = `
        INSERT INTO users (name, surname, email, password)
        VALUES (?, ?, ?, ?)
    `;

    db.execute(query, [name, surname, email, password], (err, results) => {
        if(err) {
            return res.status(500).json({ message: "An error occurred during registration process." });
        }
        
        return res.status(201).json({ message: "User registered." });
    })
};