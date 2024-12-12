import type { Schema, SchemaOptions, } from 'mongoose';

const transformResponsePlugin = function (schema: Schema, options: SchemaOptions) {
  schema.set('toJSON', {
    transform: function (_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
};

export {
  transformResponsePlugin,
};
