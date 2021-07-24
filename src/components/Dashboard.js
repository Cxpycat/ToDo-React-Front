import React from "react";
import Task from './Task';
import TodoAdd from "./TodoAdd";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




class Dashboard extends React.Component{
  state ={
    todos: [],
    error: ''
  }

  async componentDidMount() {
    await this.updateTodos();
  };
    
  updateTodos = async() => {
   const urlToDo =`http://localhost:3001/todos?userId=${this.props.userId}`;
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

  handleClick = () =>{
  const {handleLoginClick} =this.props;
  handleLoginClick(false);
  };


  changeToDo = async id => {
        const todos = [...this.state.todos];
        const todo = todos.filter(todo => todo.id === id)[0];
        todo.completed = !todo.completed;

        await fetch('http://localhost:3001/todos', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(todo)
        });

        await this.updateTodos();
    };

    addTodo = async todo => {
        const id = await this.getLastId();
        const newTodo = {
            userId: this.props.userId,
            id: id,
            title: todo,
            completed: false
        };

        await fetch('http://localhost:3001/todos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(newTodo)
        });

        await this.updateTodos();
    };

    confirmDeleting = id => {
        confirmAlert({
            title: 'Подтвердите удаление',
            message: 'Вы уверены, что хотите удалить это задание?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => this.deleteTodo(id)
                },
                {
                    label: 'Нет',
                    onClick: () => 1
                }
            ]
        });
    };

    deleteTodo = async id => {
        await fetch('http://localhost:3001/todos', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({id: id})
        });

        await this.updateTodos();
    };

    getLastId = async () => {
        const todosUrl = 'http://localhost:3001/todos';
        const requestResult = await fetch(todosUrl);
        const todos = await requestResult.json();
        return todos[todos.length - 1]['id'] + 1;
    }

  render(){
    const {error, todos} =this.state

    return <div className="Dashboard">
      <h1 className="top">Всего задач: {todos.length}</h1>
      <h2>{error}</h2>
      <TodoAdd addTodo={this.addTodo} />
      {todos.map(task =>(<Task 
      task={task}
      key={task.id}
      toggleCompleted={() => this.changeToDo(task.id)}
      deleteTodo={() => this.confirmDeleting(task.id)}
     ></Task>
     
       )) 
     }<br></br>
     <button onClick={this.handleClick} className="exit">Выйти</button>
    </div>
  }
}

export default Dashboard;
