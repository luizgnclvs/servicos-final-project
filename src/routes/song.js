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

router.post('/', async (req, res) => {
	try {
		const { name, duration, album_id } = req.body;

		const album = await Album.findByPk(album_id);

		if (!album) {
			return res.status(404).json({ error: 'Álbum não encontrado' });
		}

		const song = await Song.create({ name, duration, album_id });

		res.status(201).json(song);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao criar a música' });
	}
});

router.put('/:songId', async (req, res) => {
	try {
		const { songId } = req.params;
		const { name, duration } = req.body;

		const song = await Song.findByPk(songId);

		if (!song) {
			return res.status(404).json({ error: 'Música não encontrada' });
		}

		song.name = name ?? song.name;
		song.duration = duration ?? song.duration;

		await song.save();

		res.status(200).json(song);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao atualizar a música' });
	}
});

router.delete('/:songId', async (req, res) => {
	try {
		const { songId } = req.params;

		const song = await Song.findByPk(songId);

		if (!song) {
			return res.status(404).json({ error: 'Música não encontrada' });
		}

		await song.destroy();

		res.status(200).json({ message: 'Música excluída com sucesso' });
	} catch (error) {
		res.status(500).json({ error: 'Erro ao excluir a música' });
	}
});


export default router;