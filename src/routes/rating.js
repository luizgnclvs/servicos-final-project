import { Router } from "express";

import Rating from "../models/rating.js"

const router = Router();

router.get('/', async (req, res) => {
	try {
		const ratings = await Rating.findAll();

		res.status(200).json(ratings);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter as avaliações' });
	}
});

router.get('/:ratingId', async (req, res) => {
	try {
		const { ratingId } = req.params;

		const rating = await Rating.findByPk(ratingId);

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
		const { score, commentary, songId, albumId } = req.body;

		const rating = await Rating.create({ score, commentary, songId, albumId });

		res.status(201).json(rating);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao criar a avaliação' });
	}
});

router.put('/:ratingId', async (req, res) => {
	try {
		const { ratingId } = req.params;
		const { score, commentary } = req.body;

		const rating = await Rating.findByPk(ratingId);

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

router.delete('/:ratingId', async (req, res) => {
	try {
		const { ratingId } = req.params;

		const rating = await Rating.findByPk(ratingId);

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
