import 'reflect-metadata';

import 'dotenv/config';
import app from './app';
import './database';

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 8080}`,
  );
});
