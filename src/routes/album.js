import { Router } from "express";
import Album from "../models/album.js"

const router = Router();

router.get('/', async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const album = await Album.findByPk(id);

			if (!album) {
				return res.status(404).json({ error: 'Álbum não encontrado' });
			}
	
			res.status(200).json(album);
		} catch (error) {
			res.status(500).json({ error: 'Erro ao obter o álbum' });
		}
	} else {
		try {
			const albums = await Album.findAll();

			res.status(200).json(albums);
		} catch (error) {
			res.status(500).json({ error: 'Erro ao obter os álbuns' });
		}
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, artist, cover_url, release_year } = req.body;

		const album = await Album.create({ name, artist, cover_url, release_year });

		res.status(201).json(album);
	} catch (error) {
		res.status(500).json({ error: error.message ?? 'Erro ao criar o álbum' });
	}
});

router.put('/', async (req, res) => {
	try {
		const { id } = req.query;
		const { name, artist, cover_url, release_year } = req.body;

		const album = await Album.findByPk(id);

		if (!album) {
			return res.status(404).json({ error: 'Álbum não encontrado' });
		}

		album.name = name ?? album.name;
		album.artist = artist ?? album.artist;
		album.cover_url = cover_url ?? album.cover_url;
		album.release_year = release_year ?? album.release_year;

		await album.save();

		res.status(200).json(album);
	} catch (error) {
		res.status(500).json({ error: error.message ?? 'Erro ao atualizar o álbum' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.query;

		const album = await Album.findByPk(id);

		if (!album) {
			return res.status(404).json({ error: 'Álbum não encontrado' });
		}

		await album.destroy();

		res.status(200).json({ message: 'Álbum excluído com sucesso' });
	} catch (error) {
		res.status(500).json({ error: 'Erro ao excluir o álbum' });
	}
});

export default router;
