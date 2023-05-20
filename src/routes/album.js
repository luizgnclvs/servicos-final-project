import { Router } from "express";
import Album from "../models/album.js"

const router = Router();

router.get('/', async (req, res) => {
	try {
		const albums = await Album.findAll();

		res.status(200).json(albums);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter os álbuns' });
	}
});

router.get('/:albumId', async (req, res) => {
	try {
		const { albumId } = req.params;

		const album = await Album.findByPk(albumId);

		if (!album) {
			return res.status(404).json({ error: 'Álbum não encontrado' });
		}

		res.status(200).json(album);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao obter o álbum' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, artist, cover_url } = req.body;

		const album = await Album.create({ name, artist, cover_url });

		res.status(201).json(album);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao criar o álbum' });
	}
});

router.put('/:albumId', async (req, res) => {
	try {
		const { albumId } = req.params;
		const { name, artist, cover_url } = req.body;

		const album = await Album.findByPk(albumId);

		if (!album) {
			return res.status(404).json({ error: 'Álbum não encontrado' });
		}

		album.name = name ?? album.name;
		album.artist = artist ?? album.artist;
		album.cover_url = cover_url ?? album.cover_url;

		await album.save();

		res.status(200).json(album);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao atualizar o álbum' });
	}
});

router.delete('/:albumId', async (req, res) => {
	try {
		const { albumId } = req.params;

		const album = await Album.findByPk(albumId);

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
