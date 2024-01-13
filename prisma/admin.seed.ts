import prisma from '../src/config/prisma-client.config';
import bcrypt from 'bcrypt';
import { HashPassword } from '../src/constants/auth.constant';

async function main() {
  const initialPassword = 'adminnpe';

  const hashPassword = await bcrypt.hash(
    initialPassword,
    HashPassword.SALT_ROUND,
  );

  const user = await prisma.user.create({
    data: {
      email: 'adminnpe01@gmail.com',
      password: hashPassword,
      fullname: 'Admin 01',
      username: 'admin01',
      role: 'ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
