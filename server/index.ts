import e from 'express';
import { createApp } from './app';

const PORT = process.env.PORT || 3000;
const app: e.Express = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
