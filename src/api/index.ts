import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { router } from '../route/route';


const app = express();

app.use(express.json());

// Serve static files from 'public/images' and 'public/videos' relative to project root
app.use(express.static(path.join(process.cwd(), 'public/images')));
app.use('/videos', express.static(path.join(process.cwd(), 'public/videos')));

app.use(cors({ origin: '*' }));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('working');
});

// Export the handler for Vercel to run as serverless function
export default app;
