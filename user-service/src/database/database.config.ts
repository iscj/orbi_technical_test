import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || '.db/data.sqlite3',
  autoLoadModels: true,
  synchronize: true,
};
