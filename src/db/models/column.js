import { Schema, model } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'cards',
      },
    ],
    board: {
      type: Schema.Types.ObjectId,
      ref: 'boards',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const columnModel = model('columns', columnSchema);