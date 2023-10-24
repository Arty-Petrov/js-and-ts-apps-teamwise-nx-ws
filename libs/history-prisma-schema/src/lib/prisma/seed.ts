import { Logger } from '@nestjs/common';
import { UsersActionStatus } from '@service/constants';
import { HistoryCreateLogDto, UserGetListRdo, userGetListResponseSchema } from '@service/contracts';
import { User } from '@service/shared-types';
import { PrismaClient as HistoryClient } from '.prisma/client/history';
import { PrismaClient as UsersClient } from '.prisma/client/users';

const historyPrisma = new HistoryClient();
const usersPrisma = new UsersClient();

async function checkPreconditions() {
  Logger.warn('The History db is depending on User db');
  const usersRecordsCount = await usersPrisma.user.count();
  if (!usersRecordsCount) {
    Logger.error('Users databases is empty, nothing will be generated. Please seed Users db before seeding History db');
    throw new Error('Users databases is empty, nothing will be generated. Please seed Users db before seeding History db');
  }
  Logger.log('Preconditions checks are successful');
}

async function generateData(): Promise<Array<HistoryCreateLogDto>> {
  const usersData: Array<UserGetListRdo> = userGetListResponseSchema.array().parse(await usersPrisma.user.findMany());
  return usersData.map((user: UserGetListRdo) => {
    const {id: userId} = user;
    const data = user as User;
    delete data.id;
    return {
      userId: userId,
      status: UsersActionStatus.Create,
      change: {...data},
    };
  });
}

async function fillDb() {
  await checkPreconditions();
  const data = await generateData();
  await historyPrisma.history.deleteMany();
  await historyPrisma.history.createMany({
    data: [...data],
  });
  Logger.log(`🤘️ History database has been filled with ${data.length} records.`);
}

fillDb()
  .then(async () => {
    await historyPrisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await historyPrisma.$disconnect();

    process.exit(1);
  });
