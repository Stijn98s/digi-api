import { Mongoose } from 'mongoose';
import { Organism, User, LocalUserSchema, IOrganism, Role } from '../../src/models';

const organisms: IOrganism[] = [
  {
    image: 'bladie.jpg',
    description: 'blaffeldieroffel',
    name: 'bloobie',
    deleted: false
  },
];

export async function setupDbForTest(connection: Mongoose) {
  const organism = new Organism().getModelForClass(connection);
  await organism.deleteMany({});
  await organism.insertMany(organisms);


  const users = new User().getModelForClass(connection);
  await users.deleteMany({});
  const adminUser = new users();
  adminUser.name = 'geordi';
  adminUser.role = Role.ADMIN;
  adminUser.local = new LocalUserSchema('geordi', 'password');
  await adminUser.save();

}
