const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const Template = require('./../template.js');
const userRoutes = require('./routes/user.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const postRoutes = require('./routes/posts.routes.js');
const commentRoutes = require('./routes/comment.routes.js');
const path = require('path');

const app = express();
const CURRENT_WORKING_DIR = process.cwd();
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

//...
app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist/app')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

app.use('/api', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comment', commentRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message });
    console.log(err);
  }
});

module.exports = app;