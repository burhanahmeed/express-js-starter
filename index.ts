import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { sequelize } from './src/models'

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
