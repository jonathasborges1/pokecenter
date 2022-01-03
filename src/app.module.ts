import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteModule } from './cliente/cliente.module';

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'supersecretpassword1';
const MONGO_HOST = process.env.MONGO_URL || `hunter.1iaav.mongodb.net`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/hunter?retryWrites=true&w=majority`
};

@Module({
  imports: [ClienteModule, MongooseModule.forRoot(MONGO.url)],
})
export class AppModule {}
