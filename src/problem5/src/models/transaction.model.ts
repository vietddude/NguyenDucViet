import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import toJSON from './plugins/toJSON';
import { TransactionStatus } from '../config/enum';
import { ITransactionDocument, TransactionModel as TransactionModelType } from '../types/transaction';

const transactionSchema = new Schema<ITransactionDocument>(
  {
    sourceAddress: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Add plugins
transactionSchema.plugin(mongoosePaginate);
transactionSchema.plugin(toJSON);

// Add the static method
transactionSchema.statics.isHashExists = async function (transactionHash: string): Promise<boolean> {
  return !!(await this.findOne({ transactionHash }));
};

// Create and export the model
const TransactionModel = mongoose.model<ITransactionDocument, TransactionModelType>('Transaction', transactionSchema);
export default TransactionModel;
