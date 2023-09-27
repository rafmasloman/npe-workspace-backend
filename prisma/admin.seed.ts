import prisma from '../src/config/prisma-client.config';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'adminnpe01@gmail.com',
      password: 'adminnpe',
      fullname: 'Admin 01',
      username: 'admin01',
      roleId: 1,
    },
  });

  console.log(user);
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
