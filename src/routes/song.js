import { Router } from "express";

import Song from "../models/song.js"
import Album from "../models/album.js"

const router = Router();

router.get('/', async (req, res) => {
	try {
		const songs = await Song.findAll();

		res.status(200).json(songs);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter as músicas' });
	}
});

router.get('/:songId', async (req, res) => {
	try {
		const { songId } = req.params;

		const song = await Song.findByPk(songId);

		if (!song) {
			return res.status(404).json({ error: 'Música não encontrada' });
		}

		res.status(200).json(song);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter a música' });
	}
});