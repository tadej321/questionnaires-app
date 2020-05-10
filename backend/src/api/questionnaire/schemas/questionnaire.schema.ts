import * as mongoose from 'mongoose';

/**
 * A schema that defines how an object stored in the database should look.
 * ID is not included since it is autogenerated by the database.
 */
export const QuestionnaireSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  questions: {
    type: Array,
    required: true,
  },
  shared: {
    type: Array,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
  completed: {
    type: Array,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  completionTime: {
    type: Array,
    required: true,
  },


});
