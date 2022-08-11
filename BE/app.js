const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const indexRouter = require('./routes');
const app = express();
const port = 4000;

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms')
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);

module.exports = app.listen(port, () => {
  console.log(`      🚀 Server is starting on ${port}`);
});
