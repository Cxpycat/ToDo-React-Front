const Task = ({ task, ...props }) => {
    const ActionBtn = () => <div className="actionBtn">{task.completed?<span onClick={props.toggleCompleted}>✔️</span>:
    <span onClick={props.toggleCompleted}>❌</span>}</div>;
    
    
    return(
        <div className="">
            {task.title}
            <ActionBtn></ActionBtn>
    </div>
    )
}

export default Task;