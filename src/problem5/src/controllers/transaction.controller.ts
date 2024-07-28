import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { transactionService } from '../services';
import ApiError from '../utils/apiError';
import catchAsync from '../utils/catchAsync';
import { FilterQuery, PaginateOptions } from 'mongoose';
import { SortOrder } from '../config/enum';

/**
 * Creates a new transaction.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the transaction is created.
 */
const createTransaction = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(httpStatus.CREATED).send(transaction);
});

/**
 * Retrieves a transaction by its hash.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the transaction is not found.
 */
const getTransaction = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const transaction = await transactionService.getTransactionByHash(req.params.transactionHash);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  res.send(transaction);
});

/**
 * Updates a transaction by its hash.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the transaction is updated.
 */
const updateTransaction = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const transaction = await transactionService.updateTransactionByHash(req.params.transactionHash, req.body);
  res.send(transaction);
});

/**
 * Deletes a transaction by its hash.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A Promise that resolves to void.
 */
const deleteTransaction = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await transactionService.deleteTransaction(req.params.transactionHash);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTransactions = catchAsync(async (req: Request, res: Response): Promise<void> => {
  // Destructure and exclude non-filter parameters from the query
  const { sortBy, order, page, limit, filter } = req.query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryFilter: FilterQuery<any> = {};
  if (typeof filter === 'object' && filter !== null) {
    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Handle range operators
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rangeQuery: Record<string, any> = {};
        Object.entries(value).forEach(([op, val]) => {
          switch (op) {
            case 'gte':
              rangeQuery.$gte = val;
              break;
            case 'lte':
              rangeQuery.$lte = val;
              break;
            case 'gt':
              rangeQuery.$gt = val;
              break;
            case 'lt':
              rangeQuery.$lt = val;
              break;
          }
        });
        queryFilter[key] = rangeQuery;
      } else {
        queryFilter[key] = value;
      }
    });
  }

  const options: PaginateOptions = {
    sort: {
      [sortBy as string]: order === SortOrder.Asc ? 1 : -1,
    },
    page: Number(page),
    limit: Number(limit),
  };

  console.log('queryFilter:', queryFilter);
  // Query transactions
  const result = await transactionService.queryTransactions(queryFilter, options);

  // Check for null or empty result
  if (!result || result.docs.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transactions not found');
  }

  // Send the result
  res.send(result);
});

export { createTransaction, getTransaction, updateTransaction, deleteTransaction, getTransactions };
