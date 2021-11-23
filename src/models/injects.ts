import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const injectSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
});

export default model('Inject', injectSchema);
