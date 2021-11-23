import mongoose from 'mongoose'

const { Schema, model } = mongoose

const docSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  url: { type: String, required: true },
})

export default model('Doc', docSchema)
