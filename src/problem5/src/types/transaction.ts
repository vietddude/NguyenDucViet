import { Document, PaginateModel } from 'mongoose';
import { TransactionStatus } from '../config/enum';

export interface ITransaction {
  sourceAddress: string;
  destinationAddress: string;
  token: string;
  amount: number;
  transactionHash: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionDocument extends ITransaction, Document {}

export interface TransactionModel extends PaginateModel<ITransactionDocument> {
  isHashExists(transactionHash: string): Promise<boolean>;
}

export type RangeOperators = {
  $gte?: number | string;
  $lte?: number | string;
  $gt?: number | string;
  $lt?: number | string;
};

export type FilterValue = string | number | Date | RangeOperators;
