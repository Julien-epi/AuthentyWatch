import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/utils/db';

import {NftRoutes} from './src/routes/nft.routes';

const app = express();
dotenv.config();

connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AuthentyWatch API',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


NftRoutes(app);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;