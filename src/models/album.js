import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Album = sequelize.define('Album', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	artist: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cover_url: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

export default Album;
