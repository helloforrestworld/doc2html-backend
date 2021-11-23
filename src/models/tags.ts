import mongoose from 'mongoose'

const { Schema, model } = mongoose

const tagSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
})

export default model('Tag', tagSchema)
