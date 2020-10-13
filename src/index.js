import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

let firstTask = {index: 1, text:"I'm the first", done: false};
let tasks = [];

class Task extends React.Component {

}

class TasksList extends React.Component {

    render() {
        return (
            <li>
                <div class = "to-do-list__item bgColor task">
                    <div class = "task__manage" >
                        <input class = "task__checkbox" type = "checkbox"></input>
                    </div>
                    <div class = "task__body">
                        <p class = "task__text"></p>
                    </div>
                </div>
                </li>
        );
    }
}

class NewTaskForm extends React.Component { // Компонент доска

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let text = this.state.value;
        this.props.addTask(text);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="new-task">
                <input type="text" onChange={this.handleChange} placeholder="Add new item" className="new-task__input" maxLength="85" id="new-task__input"></input>
                    <div className="new-task__options">
                        <div className="colors">
                            <div className="colors__item colors__item_red"></div>
                            <div className="colors__item colors__item_pink"></div>
                            <div className="colors__item colors__item_purple"></div>
                            <div className="colors__item colors__item_navy"></div>
                            <div className="colors__item colors__item_blue"></div>
                            <div className="colors__item colors__item_yellow"></div>
                        </div>
                    </div>
                    <div className="new-task__controls">
                        <button className="new-task__btn">Add</button>
                    </div>
            </form>
        );
    }
}

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [], // Массив с тасками
        }
        this.addTask = this.addTask.bind(this); // Установка контекста для того, чтобы вызывать эти методы через пропсы
        /*this.removeTask = this.removeTask.bind(this);
        this.taskDone = this.taskDone.bind(this); */
    }
    // Добавление таска в массив
    addTask(task) {
        this.state.tasks.push(
            {
                index: this.state.tasks.length+1,
                text: task,
                done: false,
            }
        )
        tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
        console.log(this.state.tasks);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="to-do-app">
                    <TasksList/>
                    <NewTaskForm addTask = {this.addTask}/>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <ToDoApp />,
    document.getElementById('root')
);

