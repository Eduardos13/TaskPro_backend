import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false, // Later need to put true
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: 'columns',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const boadrModel = model('board', boardSchema);
