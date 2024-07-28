import httpStatus from 'http-status';
import TransactionModel from '../models/transaction.model';
import { ITransaction, ITransactionDocument } from '../types/transaction';
import ApiError from '../utils/apiError';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import logger from '../config/logger';

/**
 * Creates a new transaction.
 *
 * @param {ITransaction} transaction - The transaction object to create.
 * @returns {Promise<ITransactionDocument>} A promise that resolves to the created transaction document.
 * @throws {ApiError} If the transaction hash already exists.
 */
const createTransaction = async (transaction: ITransaction): Promise<ITransactionDocument> => {
  if (await TransactionModel.isHashExists(transaction.transactionHash)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Transaction hash already exists');
  }
  logger.info('Creating transaction:', transaction);
  return TransactionModel.create(transaction);
};

/**
 * Retrieves a transaction by its hash.
 *
 * @param transactionHash - The hash of the transaction to retrieve.
 * @returns {Promise<ITransactionDocument>} A Promise that resolves to the transaction document.
 * @throws {ApiError} If the transaction is not found.
 */
const getTransactionByHash = async (transactionHash: string): Promise<ITransactionDocument> => {
  const isHashExists = await TransactionModel.isHashExists(transactionHash);
  if (!isHashExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  } else {
    const transaction = await TransactionModel.findOne({ transactionHash });
    if (!transaction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
    }
    logger.info('Retrieved transaction:', transaction);
    return transaction;
  }
};

/**
 * Updates a transaction by its hash.
 *
 * @param {string} transactionHash - The hash of the transaction to update.
 * @param {Partial<ITransactionDocument>} data - The partial data to update the transaction with.
 * @returns {Promise<ITransactionDocument>} The updated transaction.
 * @throws {ApiError} If the transaction is not found.
 */
const updateTransactionByHash = async (
  transactionHash: string,
  data: Partial<ITransaction>,
): Promise<ITransactionDocument> => {
  const transaction = await getTransactionByHash(transactionHash);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data is required');
  }
  // Update the transaction with the new data
  Object.assign(transaction, data);
  await transaction.save();
  logger.info('Updated transaction:', transaction);
  return transaction;
};

/**
 * Deletes a transaction by its hash.
 *
 * @param transactionHash - The hash of the transaction to delete.
 * @throws {ApiError} If the transaction is not found.
 */
const deleteTransaction = async (transactionHash: string): Promise<void> => {
  if (!(await TransactionModel.isHashExists(transactionHash))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  logger.info('Deleting transaction:', transactionHash);
  await TransactionModel.deleteOne({ transactionHash });
};

/**
 * Queries transactions based on the provided filter and options.
 * @param filter - The filter query to apply to the transactions.
 * @param options - The pagination options for the query.
 * @returns A promise that resolves to a PaginateResult containing the queried transactions.
 * @throws An error if there was a failure while querying transactions.
 */
const queryTransactions = async (
  filter: FilterQuery<ITransactionDocument>,
  options: PaginateOptions,
): Promise<PaginateResult<ITransactionDocument>> => {
  try {
    const result = await TransactionModel.paginate(filter, options);
    return result;
  } catch (error) {
    logger.error('Failed to query transactions:', error);
    throw new Error('Error querying transactions');
  }
};

export { createTransaction, getTransactionByHash, deleteTransaction, updateTransactionByHash, queryTransactions };
