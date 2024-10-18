const express = require('express');
const path = require('path');
const { loadLibraryBranches } = require('./library');

const app = express();
const port = process.env.PORT || '8888';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const branches = await loadLibraryBranches();
    res.render('index', { title: 'Libraries', branches });
});

app.get('/library/:id', async (req, res) => {
    const branches = await loadLibraryBranches();
    const branch = branches.find((b) => b.id === req.params.id);
    if (branch) {
        res.render('library', { title: branch.name, branch });
    } else {
        res.status(404).send('Library branch not found');
    }
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
