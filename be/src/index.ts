import express from 'express';
import cors from 'cors';
import prisma from './db';

const app = express();
const PORT = process.env.PORT || 3000; 

// middlewares
app.use(cors())
app.use(express.json())

// test
app.get('/', (req, res) => {
  res.send('API running');
});

// GET /api/tabs - get all tabs with include
app.get('/api/tabs', async (req, res) => {
  try {
    const tabs = await prisma.tab.findMany({
      include: {
        track: {
          include: {
            release: {
              include: {
                artist: true
              }
            }
          }
        }
      }
    });
    res.json(tabs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
