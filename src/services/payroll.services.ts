import prisma from '../config/prisma-client.config';
import { ICreatePayrollRequestParams } from '../interfaces/payroll.interfaces';
import ProjectService from './project.services';

class PayrollService {
  static async createPayroll(payload: ICreatePayrollRequestParams) {
    try {
      const project = await ProjectService.getProjetDetail(payload.projectId);

      console.log('project on payroll : ', project.price);

      const payroll = await prisma.payroll.create({
        data: {
          ...payload,
          memberId: payload.memberId,
          projectId: payload.projectId,
        },
      });

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
