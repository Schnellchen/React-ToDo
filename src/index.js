import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './styles.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickRemove() {
        let index = parseInt(this.props.index);
        this.props.removeTask(index)
    }

    render() {
        return(
            <li className={"to-do-list li"}>
                <div className={"to-do-list__item colors__item_navy"}>
                    <div className="task__manage">
                        <input className="task__checkbox" type="checkbox"></input>
                    </div>
                    <div className="task__body">
                        <p className="task__text"> {this.props.item.text}</p>
                        <div onClick={this.onClickRemove}>X</div>
                    </div>
                </div>
            </li>
        )
    }
}

class TasksList extends React.Component {

    render() {
        let tasks = this.props.tasks.map((item, index) => {
            return (
                <Task item = {item} index = {index} removeTask = {this.props.removeTask}/>
            )
        });
        return (
            <ul>
                {tasks}
            </ul>
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

    //Меняет состояние каждый раз при изменении input
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    //Вызываетcя при нажатии ENTER в input формы или по кнопке
    handleSubmit(event) {
        let text = this.state.value.trim();
        if (text){
            this.props.addTask(text);
        }
        event.preventDefault(); // Предотвращение поведения по умолчанию?
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit} className="new-task">
                <input type="text" onChange = {this.handleChange} placeholder="Add new item" className="new-task__input" maxLength="85" id="new-task__input"/>
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
        this.removeTask = this.removeTask.bind(this);
        //this.taskDone = this.taskDone.bind(this);
    }

    // Добавление таска в массив. Передается в пропсе в NewTaskForm
    addTask(task) {
        this.state.tasks.push(
            {
                index: this.state.tasks.length+1,
                text: task,
                done: false,
            }
        )
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
        console.log(this.state.tasks);
    }

    removeTask(taskIndex){
        console.log(taskIndex); //   Через фильтр
       let tasks = this.state.tasks.splice(taskIndex, 1);
       this.setState({tasks: tasks});
        console.log(this.state.tasks);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="to-do-app">
                    <TasksList tasks = {this.state.tasks} removeTask = {this.removeTask}/>
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

