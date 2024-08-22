const TaskUtils = {
  countTaskCompletedStatus: (tasks: { status: string }[]) => {
    const countTaskStatus = tasks.filter((task) => {
      return task.status === 'COMPLETED';
    });

    return countTaskStatus.length;
  },
};
export default TaskUtils;
