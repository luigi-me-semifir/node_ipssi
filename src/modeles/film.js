import mongoose from "mongoose";
import Joi from "joi";

/**
 * Schema du type de donnée à recevoir
 */
const filmSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    lowercase: true
  },
  annee: {
    type: Number
  }
})

const Film = mongoose.model('Film', filmSchema)

/**
 * Schema de validation pour le film
 */
const filmValidation = Joi.object({
  titre: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le titre est obligatoire'
    }),
  annee: Joi.number()
    .min(1921)
    .required()
    .messages({
      'number.base': ' L\'année doit etre un nombre',
      'number.min': 'L\'année doir être supérieure à 1920'
    })
})

export { Film, filmValidation }