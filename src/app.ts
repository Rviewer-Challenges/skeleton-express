#!/usr/bin/env node
import { basicAuth } from "./middleware/basicAuth";

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./controllers/users')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(basicAuth);
app.set('port', port);

app.use('/users', users);

export default app;
