import express from "express";

const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Doc generator is running');
});

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })