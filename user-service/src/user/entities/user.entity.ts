import { Column, Table, Model } from 'sequelize-typescript';

@Table({
	tableName: 'user'
})
export class User extends Model {
	@Column
	nombre: string;

	@Column
	email: string;

	@Column
	edad: string;
}
