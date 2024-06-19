import express from 'express';
import { SERVER_PORT } from './constants/env.constant.js';
import restaurantsRouter from './routes/restaurants.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/restaurants', restaurantsRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
