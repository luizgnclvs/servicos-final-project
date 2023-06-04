import { Router } from "express";

import Rating from "../models/rating.js"
import Album from "../models/album.js";
import Song from "../models/song.js";

const router = Router();

router.get('/', async (req, res) => {
	try {
		const ratings = await Rating.findAll();

		res.status(200).json(ratings);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter as avaliações' });
	}
});

router.get('/', async (req, res) => {
	try {
		const { id } = req.query;

		const rating = await Rating.findByPk(id);

		if (!rating) {
			return res.status(404).json({ error: 'Avaliação não encontrada' });
		}

		res.status(200).json(rating);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter a avaliação' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { score, commentary, date, album_id, song_id } = req.body;

		if (!album_id && !song_id) {
			res.status(400).json({ error: "Avaliação deve referir-se a um álbum ou música" })
		} else if (album_id && song_id) {
			res.status(400).json({ error: "Avaliação deve referir-se a um álbum ou música, mas nunca aos dois" })
		} else if (album_id) {
			const album = await Album.findByPk(album_id);

			if (!album) {
				return res.status(404).json({ error: 'Álbum não encontrado' });
			}

			const rating = await Rating.create({ score, commentary, date, album_id });
			res.status(201).json(rating);
		} else {
			const song = await Song.findByPk(song_id);

			if (!song) {
				return res.status(404).json({ error: 'Música não encontrada' });
			}

			const rating = await Rating.create({ score, commentary, date, song_id });
			res.status(201).json(rating);
		}
	} catch (error) {
		res.status(500).json({ error: error.message ?? 'Erro ao criar a avaliação' });
	}
});

router.put('/', async (req, res) => {
	try {
		const { id } = req.query;
		const { score, commentary } = req.body;

		const rating = await Rating.findByPk(id);

		if (!rating) {
			return res.status(404).json({ error: 'Avaliação não encontrada' });
		}

		rating.score = score ?? rating.score;
		rating.commentary = commentary ?? rating.commentary;

		await rating.save();

		res.status(200).json(rating);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao atualizar a avaliação' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.query;

		const rating = await Rating.findByPk(id);

		if (!rating) {
			return res.status(404).json({ error: 'Avaliação não encontrada' });
		}

		await rating.destroy();

		res.status(200).json({ message: 'Avaliação excluída com sucesso' });
	} catch (error) {
		res.status(500).json({ error: 'Erro ao excluir a avaliação' });
	}
});

export default router;
