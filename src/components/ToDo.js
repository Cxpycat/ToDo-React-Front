const ToDo = ({todo, ...props}) => {
    const ActionBtn = () => <div className="actionBtn">{todo.completed?<>✔️</>:<>❌</>}</div>;
    return(
        <div className="task">
            {todo.title}<ActionBtn></ActionBtn>
        </div>
    )
}

export default ToDo;