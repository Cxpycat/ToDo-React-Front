import React from "react";
import Task from './Task';



class Dashboard extends React.Component{
        handleClick = () =>{
            const {handleLoginClick} =this.props;
            handleLoginClick(false);
            }

      state ={
        todos: [],
        error: ''
    }

 componentDidMount = async() => {
   const urlToDo =`https://jsonplaceholder.typicode.com/todos?userId=${this.props.userId}`;
  
try{
  const result = await fetch(urlToDo)
  const todos = await result.json()
  this.setState({todos});
  
  } catch(err) {
    this.setState({
      error: 'Ошибка'
    })
  } 
} 
  changeToDo = id => {
    const todos = [...this.state.todos];
    const todo = todos.filter(todo => todo.id === id)[0];
    const index = todos.map(function(temp) { return temp.id; }).indexOf(id);
    todo.completed = !todo.completed;
    todos[index] = todo;
    this.setState({
    todos
    });
  };


  render(){
    const {error, todos} =this.state

    return <div className="Dashboard">
      <h1 className="top">Всего задач: {todos.length}</h1>
      <h2>{error}</h2>
      {todos.map(task =>(<Task 
      task={task}
      key={task.id}
      toggleCompleted={() => this.changeToDo(task.id)}
     ></Task>
       )) 
     }<br></br>
     <button onClick={this.handleClick} className="exit">Выйти</button>
    </div>
  }
}

export default Dashboard;
