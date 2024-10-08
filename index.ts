import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import adminRouter from './src/routes/admin.routes';
import ErrorHandler from './src/middleware/error.middleware';
import authRouter from './src/routes/auth.routes';
import projectRouter from './src/routes/project.routes';
import clientRouter from './src/routes/client.routes';
import memberRouter from './src/routes/member.routes';
import taskRouter from './src/routes/task.routes';
import cors from 'cors';
import fileRouter from './src/routes/file.routes';
import commentRouter from './src/routes/comment.routes';
import milestoneRouter from './src/routes/milestone.routes';
import PayrollRoute from './src/routes/payroll.routes';
// import InvoiceRouter from './src/routes/invoice.routes';
import cookieParser from 'cookie-parser';
// import InvoiceController from './src/controller/invoices.controller';
import path from 'path';
import Server from 'socket.io';
import http from 'http';
import commentController from './src/controller/comment.controller';
import ProfileRoute from './src/routes/profile.routes';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = new Server.Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'src')));

const API_VERSION = 'v1';
const API_URL = 'api';

// app.options(`/${API_URL}/${API_VERSION}/project`, cors())
app.use(`/${API_URL}/${API_VERSION}/users`, adminRouter());
app.use(`/${API_URL}/${API_VERSION}/auth`, authRouter());
app.use(`/${API_URL}/${API_VERSION}/project`, projectRouter());
app.use(`/${API_URL}/${API_VERSION}/client`, clientRouter());
app.use(`/${API_URL}/${API_VERSION}/member`, memberRouter());
app.use(`/${API_URL}/${API_VERSION}/task`, taskRouter());
app.use(`/${API_URL}/${API_VERSION}/files`, fileRouter());
app.use(`/${API_URL}/${API_VERSION}/comment`, commentRouter());
app.use(`/${API_URL}/${API_VERSION}/milestone`, milestoneRouter());
app.use(`/${API_URL}/${API_VERSION}/payroll`, PayrollRoute.routes());
// app.use(`/${API_URL}/${API_VERSION}/invoice`, InvoiceRouter.routes());
app.use(`/${API_URL}/${API_VERSION}/profile`, ProfileRoute.routes());

// app.use('/renderEmail', InvoiceController.renderEmail);

app.use(ErrorHandler);

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
