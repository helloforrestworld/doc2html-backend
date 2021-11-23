import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const articleSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    url: { type: String, required: true },
    remark: { type: String },
    doc: { type: Schema.Types.ObjectId, ref: 'Doc', required: false },
    injects: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Inject',
        },
      ],
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
        },
      ],
      required: false,
      select: false,
    },
  },
  { timestamps: true }
);

export default model('Article', articleSchema);
