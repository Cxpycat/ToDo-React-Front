const Task = ({ task, ...props }) => {
    const ActionBtn = () => <div className="actionBtn">{task.completed?
    <span onClick={props.toggleCompleted}>✔️</span>:
    <span onClick={props.toggleCompleted}>❌</span>}
    </div>;
  
    return(
        <div className="">
            <span onClick={props.deleteTodo}>×</span>{task.title}
            <ActionBtn></ActionBtn>
            
    </div>
    )
}

export default Task;