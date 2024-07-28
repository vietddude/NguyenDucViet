/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Schema, Document, ToObjectOptions } from 'mongoose';

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (obj: any, path: string[], index: number): void => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

type TransformFunction = (doc: any, ret: any, options: any) => any;

interface ToJSONOptions {
  transform?: boolean | TransformFunction;
}

const toJSON = (schema: Schema): void => {
  let transform: TransformFunction | undefined;

  const schemaOptions = schema.get('toJSON') || {};
  if (typeof schemaOptions.transform === 'function') {
    transform = schemaOptions.transform;
  }

  schema.set('toJSON', {
    ...schemaOptions,
    transform(this: Document, doc: Document, ret: Record<string, any>, options: ToObjectOptions) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      if (transform) {
        return transform.call(this, doc, ret, options);
      }
    },
  } as ToJSONOptions);
};

export default toJSON;
