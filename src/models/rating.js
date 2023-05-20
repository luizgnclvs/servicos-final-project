import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

import Album from './album.js';
import Song from './song.js';

const Rating = sequelize.define('Rating', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	commentary: {
		type: DataTypes.TEXT,
		allowNull: true
	},
});

Rating.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'CASCADE' });
Rating.belongsTo(Song, { foreignKey: 'song_id', onDelete: 'CASCADE' });

export default Rating;
