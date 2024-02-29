const TaskUtils = {
  countTaskCompletedStatus: (tasks: { status: string }[]) => {
    const countTaskStatus = tasks.filter((task) => {
      return task.status === 'COMPLETED';
    });

    console.log(countTaskStatus.length);
    return countTaskStatus.length;
  },
};
export default TaskUtils;
