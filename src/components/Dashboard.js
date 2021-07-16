import React from "react";
import ToDo from "./ToDo";


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
  render(){
    const {error, todos} =this.state
    

    return <div className="Dashboard">
      <h1 className="top">Всего задач: {todos.length}</h1>
      <h2>{error}</h2>
     {todos.map(todo =>(<ToDo todo={todo} key={todo.id}></ToDo>
       )) 
     }<br></br>
     <button onClick={this.handleClick} className="exit">Выйти</button>
    </div>
  }
}

export default Dashboard;
