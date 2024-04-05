import { Express } from 'express';
import { readNfcCard, writeNfcCard } from '../controllers/nfcCardController';
import authenticateToken from '../utils/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Reader
 *   description: API pour interagir avec les cartes NFCs
 */

/**
 * @swagger
 * /readNfcCard:
 *   get:
 *     summary: Lire une carte NFC
 *     tags: [NFC]
 *     responses:
 *       200:
 *         description: Le token Id du NFT dans la carte NFC
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */

/**
/**
 * @swagger
 * /writeNfcCard:
 *   post:
 *     summary: Ecrire sur une carte NFC
 *     tags: [NFC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tokenId
 *             properties:
 *               tokenId:
 *                 type: string
 *                 description: L'id du NFT à écrire sur la carte NFC
 *     responses:
 *       201:
 *         description: Carte NFC écrite avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */

export const NfcCardeRoutes = (app: Express) => {
    app.get('/readNfcCard', readNfcCard);
    app.post('/writeNfcCard', authenticateToken, writeNfcCard);
};