import Joi from 'joi';
import { TransactionStatus, SortOrder } from '../config/enum';

const transactionKeys = ['transactionHash', 'sourceAddress', 'destinationAddress', 'token', 'amount', 'status'];
const rangeOperators = ['gte', 'lte', 'gt', 'lt'];

// Base schema for transaction
const baseTransactionSchema = Joi.object({
  transactionHash: Joi.string(),
  sourceAddress: Joi.string(),
  destinationAddress: Joi.string(),
  token: Joi.string(),
  amount: Joi.number().positive(),
  status: Joi.string().valid(...Object.values(TransactionStatus)),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
});

const transactionParams = {
  params: Joi.object({
    transactionHash: Joi.string().required(),
  }),
};

// Create transaction schema
const createTransaction = {
  body: baseTransactionSchema.fork(transactionKeys, (schema) => schema.required()),
};

// Update transaction schema
const updateTransaction = {
  params: transactionParams.params,
  body: baseTransactionSchema,
};

const baseQuery = {
  query: Joi.object({
    sortBy: Joi.string()
      .valid(...['createdAt', 'amount'])
      .default('createdAt'), // Default sort by createdAt)
    order: Joi.string()
      .valid(...Object.values(SortOrder))
      .default(SortOrder.Desc),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    filter: Joi.object({
      status: Joi.string().valid(...Object.values(TransactionStatus)),
    }).pattern(
      Joi.string().valid('amount', 'createdAt'),
      Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.object().pattern(Joi.string().valid(...rangeOperators), Joi.alternatives().try(Joi.string(), Joi.number())),
      ),
    ),
  }).unknown(true),
};

const getListTransactions = baseQuery;

export { createTransaction, getListTransactions, updateTransaction, transactionParams };
