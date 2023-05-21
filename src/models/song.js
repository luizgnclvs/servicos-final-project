import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

import Album from './album.js';

const Song = sequelize.define('Song', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
});

Song.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'CASCADE' });

export default Song;
