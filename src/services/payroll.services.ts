import prisma from '../config/prisma-client.config';
import { ICreatePayrollRequestParams } from '../interfaces/payroll.interfaces';
import { calculateTotalValue } from '../utils/common.utils';
import ProjectService from './project.services';
import ProjectOnPayrollService from './projectPayroll.services';

class PayrollService {
  static async createPayroll(payload: ICreatePayrollRequestParams) {
    try {
      const project = await ProjectService.getProjetDetail(payload.projectId);

      const payroll = await prisma.payroll.create({
        data: {
          ...payload,
          memberId: payload.memberId,
          projectId: payload.projectId,
          percent: Number(payload.percent),
        },
      });

      const payrollByProject = await prisma.payroll.findMany({
        where: {
          projectId: payload.projectId,
        },
      });

      const totalPercent = payrollByProject.map((payroll) => {
        return payroll.percent;
      });

      const calculateTotalPercentValue = calculateTotalValue(totalPercent);

      if (calculateTotalPercentValue <= 100) {
        const updateProject =
          await ProjectOnPayrollService.updateProjectOnPayroll(
            payload.projectId,
            {
              currentPayroll:
                project.currentPayroll - payload.percent * 0.01 * project.price,
            },
          );

        const salary = payload.percent * 0.01 * project.price;

        const updateSalary = await PayrollService.updateSalaryOnPayroll(
          payroll.id,
          salary,
        );
      } else {
        throw new Error('Percent data lebih dari 100');
      }

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async getAllPayroll(
    memberName?: string,
    status?: any,
    position?: string,
    limit?: number,
  ) {
    try {
      const payroll = await prisma.payroll.findMany({
        where: {
          member: {
            position: {
              contains: position,
            },
          },
          payrollStatus: {
            equals: status,
          },
        },
        include: {
          member: {
            select: {
              id: true,
              profilePicture: true,
              position: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          project: {
            select: {
              id: true,
              projectName: true,
              projectIcon: true,
            },
          },
        },
        take: !limit ? undefined : limit,
      });

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async getPayrollDetail(id?: string, projectId?: string) {
    try {
      const payroll = await prisma.payroll.findFirst({
        where: {
          id: Number(id),
          projectId,
        },
        include: {
          member: {
            select: {
              profilePicture: true,
              position: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          project: {
            select: {
              projectName: true,
              projectIcon: true,
            },
          },
        },
      });

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberPayroll(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      const member = await prisma.member.findFirst({
        where: {
          userId: user?.id,
        },
        select: {
          position: true,
          payroll: {
            select: {
              id: true,
              percent: true,
              salary: true,
              payrollStatus: true,

              project: {
                select: {
                  id: true,
                  projectName: true,
                  projectIcon: true,
                },
              },
            },
          },
        },
      });

      // const payroll = await prisma.payroll.findMany({
      //   where: {
      //     memberId: member?.id,
      //   },
      //   select: {
      //     id: true,
      //     percent: true,
      //     salary: true,
      //     payrollStatus: true,
      //     project: {
      //       select: {
      //         id: true,
      //         projectName: true,
      //         projectIcon: true,
      //       },
      //     },
      //   },
      // });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async updatePayroll(
    payload: ICreatePayrollRequestParams,
    payrollId: string,
  ) {
    try {
      const project = await ProjectService.getProjetDetail(payload.projectId);

      const payroll = await prisma.payroll.update({
        where: {
          id: Number(payrollId),
        },
        data: {
          memberId: payload.memberId,
          projectId: payload.projectId,
          percent: Number(payload.percent),
          payrollStatus: payload.transactionStatus,
        },
      });

      const payrollByProject = await prisma.payroll.findMany({
        where: {
          projectId: payload.projectId,
        },
      });

      const totalPercent = payrollByProject.map((payroll) => {
        return payroll.percent;
      });

      const calculateTotalPercentValue = calculateTotalValue(totalPercent);

      if (calculateTotalPercentValue <= 100) {
        const updateProject =
          await ProjectOnPayrollService.updateProjectOnPayroll(
            payload.projectId,
            {
              currentPayroll:
                project.currentPayroll - payload.percent * 0.01 * project.price,
            },
          );

        const salary = payload.percent * 0.01 * project.price;

        const updateSalary = await PayrollService.updateSalaryOnPayroll(
          payroll.id,
          salary,
        );
      } else {
        throw new Error('Percent data lebih dari 100');
      }

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async updateSalaryOnPayroll(payrollId: number, salary: number) {
    try {
      const payroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          salary,
        },
      });

      return payroll;
    } catch (error) {
      throw Error;
    }
  }

  static async deletePayroll(id: number) {
    try {
      const payroll = await prisma.payroll.delete({
        where: {
          id,
        },
      });

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  //   static async getAllPayroll(payroll:) {

  //   }
}

export default PayrollService;
