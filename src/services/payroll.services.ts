import prisma from '../config/prisma-client.config';
import { ICreatePayrollRequestParams } from '../interfaces/payroll.interfaces';
import { calculateTotalValue } from '../utils/common.utils';
import ProjectService from './project.services';
import ProjectOnPayrollService from './projectPayroll.services';

class PayrollService {
  static async createPayroll(payload: ICreatePayrollRequestParams) {
    try {
      const project = await ProjectService.getProjetDetail(payload.projectId);

      // console.log('project on payroll : ', project.currentPayroll);

      const payroll = await prisma.payroll.create({
        data: {
          ...payload,
          memberId: payload.memberId,
          projectId: payload.projectId,
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
      console.log('payroll creata : ', error);

      throw error;
    }
  }

  static async getAllPayroll() {
    try {
      const payroll = await prisma.payroll.findMany();

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberPayroll(payrollId: number) {
    try {
      const payroll = await prisma.payroll.findFirst({
        where: {
          id: payrollId,
        },
      });

      return payroll;
    } catch (error) {
      throw error;
    }
  }

  static async updatePayroll(
    payload: ICreatePayrollRequestParams,
    payrollId: number,
  ) {
    try {
      const payroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          ...payload,
        },
      });

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

  static async deletePayroll(payrollId: number) {
    try {
      const payroll = await prisma.payroll.delete({
        where: {
          id: payrollId,
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
