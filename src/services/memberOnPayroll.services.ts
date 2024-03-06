import prisma from '../config/prisma-client.config';

class MemberOnPayroll {
  static async getMembersPayroll() {
    try {
      const memberStaff = await prisma.member.findMany({
        select: {
          id: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      const memberPayrollResponse = await prisma.payroll.findMany({
        select: {
          member: {
            select: {
              id: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
        },
      });

      const memberStaffIds = new Set(
        memberPayrollResponse.map((member) => member.member.id),
      );

      const memberHavePayroll = memberStaff.filter(
        (member) => !memberStaffIds.has(member.id),
      );

      const memberPayroll = memberHavePayroll.map((data) => {
        return {
          id: data.id,
          user: {
            fullname: `${data.user?.firstname} ${data.user?.lastname}`,
          },
        };
      });

      return memberPayroll;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberOnPayroll;
