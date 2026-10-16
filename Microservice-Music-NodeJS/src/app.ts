import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { envs } from './config/envs';
import { swaggerSpec } from './config/swagger';
import { AppRoutes } from './presentation/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(AppRoutes.routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.listen(envs.port, () => {
  console.log(`Music microservice listening on port ${envs.port}`);
});
