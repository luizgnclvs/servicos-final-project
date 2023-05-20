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
