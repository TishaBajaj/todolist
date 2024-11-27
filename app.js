
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files like CSS
app.use(express.static('public'));

// In-memory task storage
let tasks = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`To-Do app listening at http://localhost:${port}`);
});
