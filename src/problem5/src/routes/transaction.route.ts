import express from 'express';
import * as transactionController from '../controllers/transaction.controller';
import { validate } from '../middlewares/validate';
import {
  createTransaction,
  getListTransactions,
  transactionParams,
  updateTransaction,
} from '../validations/transaction.validation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           $ref: '#/components/schemas/BaseQuery/properties/sortBy'
 *       - in: query
 *         name: order
 *         schema:
 *           $ref: '#/components/schemas/BaseQuery/properties/order'
 *       - in: query
 *         name: page
 *         schema:
 *           $ref: '#/components/schemas/BaseQuery/properties/page'
 *       - in: query
 *         name: limit
 *         schema:
 *           $ref: '#/components/schemas/BaseQuery/properties/limit'
 *       - in: query
 *         name: filter
 *         schema:
 *           $ref: '#/components/schemas/BaseQuery/properties/filter'
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 totalDocs:
 *                   type: integer
 *                   description: Total number of transactions
 *                 limit:
 *                   type: integer
 *                   description: Number of transactions per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pagingCounter:
 *                   type: integer
 *                   description: Paging counter
 *                 hasPrevPage:
 *                   type: boolean
 *                   description: Indicates if there is a previous page
 *                 hasNextPage:
 *                   type: boolean
 *                   description: Indicates if there is a next page
 *                 prevPage:
 *                   type: integer
 *                   nullable: true
 *                   description: Previous page number, if available
 *                 nextPage:
 *                   type: integer
 *                   nullable: true
 *                   description: Next page number, if available
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{transactionHash}:
 *   get:
 *     summary: Get a transaction by hash
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionHash
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction hash
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{transactionHash}:
 *   put:
 *     summary: Update a transaction by hash
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionHash
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction hash
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{transactionHash}:
 *   delete:
 *     summary: Delete a transaction by hash
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionHash
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction hash
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 */

router.get('/', validate(getListTransactions), transactionController.getTransactions);
router.post('/', validate(createTransaction), transactionController.createTransaction);
router.get('/:transactionHash', validate(transactionParams), transactionController.getTransaction);
router.put('/:transactionHash', validate(updateTransaction), transactionController.updateTransaction);
router.delete('/:transactionHash', validate(transactionParams), transactionController.deleteTransaction);

export default router;
