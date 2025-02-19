import { Film, filmValidation } from "../modeles/film.js"

/**
 * Route Get pour récuperer ma liste de Films
 * @param {} req 
 * @param {*} res La liste des films
 */
export const getFilms = async (req, res) => {
  const films = await Film.find()
  res.send(films)
}

/**
 * Middleware pour récuperer un film par son id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getFilmByID = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)

    if (!film) {
      return res.status(404).json({ message: 'Film nontrouvé' })
    }
    res.status(200).json(film)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: " Une erreur est survenue " })
  }
}

/**
 * Middleware pour ajouter un film
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
export const newFilm = async (req, res) => {
  try {
    const { error, value } = filmValidation.validate(req.body)

    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const nouveauFilm = new Film(
      req.body
    )
    const filmAdd = await nouveauFilm.save()
    res.status(201).json(filmAdd)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la sauvegarde" })
  }
}

export const delFilm = async (req, res) => {
  try {
    const filmSupp = await Film.findByIdAndDelete(req.params.id);
    if (!filmSupp) {
      return res.status(404).json({ message: "Film non trouvé" })
    }
    res.status(204).end()
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la sauvegarde"
    })
  }
}

export const majFilm = async (req, res) => {
  try {
    const { error, value } = filmValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    const filmMaj = await Film.findByIdAndUpdate(req.params.id, {
      titre: req.body.titre,
      annee: req.body.annee
    }, { new: true })

    if (!filmMaj) {
      return res.status(404).json({ message: "Film non trouvé" })
    }
    res.status(200).json(filmMaj)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la sauvegarde"
    })
  }
}
