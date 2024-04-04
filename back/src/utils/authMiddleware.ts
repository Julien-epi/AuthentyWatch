import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Récupérer le token du header de la requête
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

  if (token == null) return res.sendStatus(401); // Si pas de token, retourner une erreur 401 (Non autorisé)

  if (token !== process.env.AUTH_TOKEN) {
    return res.sendStatus(403); // Si le token ne correspond pas, retourner une erreur 403 (Interdit)
  }

  next(); // Si le token correspond, passer à la suite (le controller de la route)
};

export default authenticateToken;
