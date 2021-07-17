const Task = ({ task, ...props }) => {
    const ActionBtn = () => <div className="actionBtn">{task.completed?
    <span>✔️</span>:
    <span>❌</span>}
    </div>;
  
    return(
        <div className="">
            {task.title}
            <ActionBtn></ActionBtn>
    </div>
    )
}

export default Task;