// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   const roles = await prisma.role.createMany({
//     data: [
//       {
//         name: 'ADMIN',
//       },
//       {
//         name: 'CLIENT',
//       },
//       {
//         name: 'PROJECT_MANAGER',
//       },
//       {
//         name: 'STAFF',
//       },
//     ],
//   });

//   console.log(roles);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
