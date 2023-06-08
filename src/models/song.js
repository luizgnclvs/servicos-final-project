import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

import Album from './album.js';

const Song = sequelize.define('Song', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});

Song.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'CASCADE' });

export default Song;
