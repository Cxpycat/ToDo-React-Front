import React from "react";

class TodoAdd extends React.Component {

    state = {
        input: ''
    };

    addTodo = () => {
        const {input} = this.state;
        if(input) {
            this.props.addTodo(input);
            this.setState({input: ''});
        }
    }

    inputChange = event => {
        this.setState({input: event.target.value})
    }

    handleEnter = event => {
        if(event.key === 'Enter'){
            this.addTodo();
        }
    }

    render() {
        const {input} = this.state;

        return (
            <>
                <input className="ToDo-input" type="text" placeholder="Название..." value={input} onChange={this.inputChange} onKeyPress={this.handleEnter}/>
                <span className="addBtn" onClick={this.addTodo}>Добавить</span>
            </>
        );
    }
}

export default TodoAdd;