"use strict";

const express = require('express');
const app = new express();
let PORT = 3000;
app.use(express.static('client'));
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));