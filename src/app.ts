// import express, { Express } from 'express';
// // import routes from './routes';

// const app: Express = express();

// app.use(express.json());
// // app.use(routes);

// export default app;

import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';
import { requestHandler, errorHandler } from './middlewares';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(errorHandler);
app.use(requestHandler);

export default app;
