import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import adminRouter from './src/routes/admin.routes';
import ErrorHandler from './src/middleware/error.middleware';
import authRouter from './src/routes/auth.routes';
import projectRouter from './src/routes/project.routes';
import clientRouter from './src/routes/client.routes';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const API_VERSION = 'v1';
const API_URL = 'api';

app.use(`/${API_URL}/${API_VERSION}/users`, adminRouter());
app.use(`/${API_URL}/${API_VERSION}/auth`, authRouter());
app.use(`/${API_URL}/${API_VERSION}/project`, projectRouter());
app.use(`/${API_URL}/${API_VERSION}/client`, clientRouter());

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
