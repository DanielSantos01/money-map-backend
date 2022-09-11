import 'dotenv/config';

import app from './app';
import 'reflect-metadata';
import './database';

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 8080}`,
  );
});
