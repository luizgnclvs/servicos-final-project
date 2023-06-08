import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { isAfter, isBefore, isDate } from 'date-fns';

const Album = sequelize.define('Album', {
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
	artist: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	cover_url: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	release_year: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isValidYear(value) {
				const releaseYear = new Date(value, null);
				if (!isDate(releaseYear) || isBefore(releaseYear, new Date(1955, null)) || isAfter(releaseYear, Date.now())) {
					throw new Error('O ano de lançamento deve ser válido e não pode ser posterior ao ano atual ou anterior a 1955');
				}
			},
		},
	},
});

export default Album;
