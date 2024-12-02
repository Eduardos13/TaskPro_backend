import { Schema, model } from 'mongoose';

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['without', 'low', 'medium', 'high'],
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'boards',
      required: true,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: 'columns',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const cardsModel = model('cards', cardSchema);
