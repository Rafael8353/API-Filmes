import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import filmeRoutes from './routes/filmeRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.use('/auth', authRoutes);

app.use('/filmes', filmeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Filmes Favoritos está no ar!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});







