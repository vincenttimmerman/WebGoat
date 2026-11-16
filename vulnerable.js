// ==========================================
// AIKIDO DEMO: Kwetsbare testcode
// ==========================================

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// 1. SAST VULNERABILITY: SQL Injection via directe string concatenatie
function searchUserByEmail(req, res) {
    const userEmailInput = req.query.email; // Ongefilterde user input

    // GEVAARLIJK: Directe concatenatie van input in een raw SQL-query
    const query = "SELECT * FROM users WHERE email = '" + userEmailInput + "';";

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send("Database error");
        } else {
            res.json(rows);
        }
    });
}

// 2. SECRETS DETECTION: Hardcoded API Key / Secret
// Dit patroon wordt direct herkend door Aikido's Secrets-scanner
const awsStagingCredentials = {
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
};

module.exports = { searchUserByEmail };
