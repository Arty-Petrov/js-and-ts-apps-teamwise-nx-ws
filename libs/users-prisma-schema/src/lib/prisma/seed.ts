import { generateMock } from '@anatine/zod-mock';
import { fakerRU as faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { UserCreateDto, userCreateRequestSchema } from '@service/contracts';
import { PrismaClient as UsersClient } from '.prisma/client/users';

const RECORDS_COUNT = 10;
const usersPrisma = new UsersClient();

async function generateData(): Promise<Array<UserCreateDto>> {
  return faker.helpers.uniqueArray(
    () => generateMock(
      userCreateRequestSchema, {
        stringMap: {
          name: () => faker.person.fullName(),
          email: () => faker.database.mongodbObjectId() + '@generated.test',
          dateBirth: () => faker.date.birthdate({
            min: 18,
            max: 65,
            mode: 'age',
            refDate: '2020-01-01T00:00:00.000Z'
          }).toISOString(),
        },
      }),
    RECORDS_COUNT,
  );
}

async function fillDb() {
  const data = await generateData();
  await usersPrisma.user.createMany({
    data: [...data],
  });
  const count = await usersPrisma.user.count();
  Logger.log(`🤘️ Users database has been filled with ${data.length} records and now contains ${count} records. You can run db-reset script to clean db.`);
}

fillDb()
  .then(async () => {
    await usersPrisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await usersPrisma.$disconnect();

    process.exit(1);
  });
