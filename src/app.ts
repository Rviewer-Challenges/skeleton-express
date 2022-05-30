#!/usr/bin/env node
import { loadEndpoints } from "./controllers/api";

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors())
app.set('port', port)

loadEndpoints(app)

export default app;
