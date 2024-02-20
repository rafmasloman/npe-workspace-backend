import prisma from '../config/prisma-client.config';

class MemberOnPayroll {
  static async getMembersPayroll() {
    try {
      const memberStaff = await prisma.member.findMany({
        select: {
          user: {
            select: {
              firstname: true,
            },
          },
        },
      });

      const staffs = memberStaff.filter((staff) => {
        return staff.user?.firstname;
      });

      //   const memberPayrollResponse = await prisma.payroll.findMany({
      //     where: {
      //       member: {
      //         is: {
      //           user: {
      //             firstname: staffs?.user?.firstname,
      //           },
      //         },
      //       },
      //     },

      //     select: {
      //       member: {
      //         select: {
      //           user: true,
      //         },
      //       },
      //     },
      //   });

      console.log('memberStaff : ', staffs);

      //   return memberPayrollResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberOnPayroll;
