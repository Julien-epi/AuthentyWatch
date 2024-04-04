import { Express } from "express";
import {
  createNftController,
  updateNftController,
  getAllNFTController,
  getNFTByIdController,
  getNFTWithCardIDAndNftIdController,
  deleteNftController,
} from "../controllers/nftController";
import authenticateToken from "../utils/authMiddleware";

/**
 * @swagger
 * tags:
 *   name: NFT
 *   description: API pour interagir avec les NFTs
 */

/**
 * @swagger
 * /createNFT:
 *   post:
 *     summary: Crée un nouveau NFT
 *     tags: [NFT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du NFT
 *               description:
 *                 type: string
 *                 description: La description du NFT
 *               price:
 *                 type: number
 *                 description: Le prix du NFT
 *     responses:
 *       201:
 *         description: NFT créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: L'ID du NFT créé
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 */

/**
 * @swagger
 * /getAllNFT:
 *   get:
 *     summary: Liste tous les NFTs
 *     tags: [NFT]
 *     responses:
 *       200:
 *         description: Une liste de tous les NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 */

/**
 * @swagger
 * /getNFTById/{id}:
 *   get:
 *     summary: Retrouve un NFT par son ID
 *     tags: [NFT]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du NFT trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 */

/**
 * @swagger
 * /updateNFT/{id}:
 *   put:
 *     summary: Met à jour un NFT par son ID
 *     tags: [NFT]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom du NFT
 *               description:
 *                 type: string
 *                 description: Nouvelle description du NFT
 *               price:
 *                 type: number
 *                 description: Nouveau prix du NFT
 *     responses:
 *       200:
 *         description: NFT mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 */

/**
 * @swagger
 * /deleteNFT/{id}:
 *   delete:
 *     summary: Supprime un NFT par son ID
 *     tags: [NFT]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du NFT à supprimer
 *     responses:
 *       200:
 *         description: NFT supprimé avec succès
 *       400:
 *         description: Erreur lors de la suppression du NFT
 */

/**
 * @swagger
 * /getNFTsWithCardAndNftIds:
 *   get:
 *     summary: Liste tous les NFTs ayant un NFC card ID et un NFT ID
 *     tags: [NFT]
 *     responses:
 *       200:
 *         description: Une liste de NFTs ayant à la fois un NFC card ID et un NFT ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   serial_number:
 *                     type: string
 *                   watch_model:
 *                     type: string
 *                   img_ipfs_link:
 *                     type: string
 *                   nft_id:
 *                     type: string
 *                   nfc_card_id:
 *                     type: string
 */
export const NftRoutes = (app: Express) => {
  app.post("/createNFT", authenticateToken, createNftController);
  app.get("/getAllNFT", getAllNFTController);
  app.get("/getNFTById/:id", getNFTByIdController);
  app.put("/updateNFT/:id", authenticateToken, updateNftController);
  app.delete("/deleteNFT/:id", authenticateToken, deleteNftController);
  app.delete(
    "/getNFTWithCardIDAndNftIdController",
    getNFTWithCardIDAndNftIdController
  );
};
