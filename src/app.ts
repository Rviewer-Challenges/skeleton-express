#!/usr/bin/env node
import { loadEndpoints } from "./controllers/api";

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(cors())
app.set('port', port)

loadEndpoints(app)

export default app;
