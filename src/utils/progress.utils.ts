import TaskUtils from './task.utils';

const ProgressUtils = {
  countAllTaskStatus: (tasks: { status: string }[]) => {
    const countTaskTodoStatus = tasks.filter((task) => {
      return task.status === 'TODO';
    });

    const countTaskProgressStatus = tasks.filter((task) => {
      return task.status === 'ON_PROGRESS';
    });

    const countTaskCompletedStatus = tasks.filter((task) => {
      return task.status === 'COMPLETED';
    });

    return {
      todo: countTaskTodoStatus.length,
      on_progress: countTaskProgressStatus.length,
      completed: countTaskCompletedStatus.length,
    };
  },
  generateStatusByTask: (
    taskStatus: { todo: number; on_progress: number; completed: number },
    taskLength: number,
  ) => {
    if (taskStatus.on_progress > 0) {
      return 'On Progress';
    } else if (taskStatus.completed === taskLength) {
      return 'Completed';
    } else {
      return 'To Do';
    }
  },
};

export default ProgressUtils;
