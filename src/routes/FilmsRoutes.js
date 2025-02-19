import express from 'express'
import { delFilm, getFilmByID, getFilms, majFilm, newFilm } from '../controllers/filmsControllers.js'
import { date } from '../middleware/middleware.js'

const router = express.Router()

router.get('/films', getFilms)
router.get('/films/:id', getFilmByID)
router.post('/films', newFilm)
router.delete('/films/:id', delFilm)
router.put('/films/:id', majFilm)

export default router