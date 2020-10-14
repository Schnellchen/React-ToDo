import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './styles.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }

    onClickRemove() {
        let id = parseInt(this.props.id);
        this.props.removeTask(id);
    }

    onClickDone() {
        let id = parseInt(this.props.id);
        this.props.taskDone(id);
    }

    render() {
        let style = this.props.item.done ? "done" : "";
        return(
            <li className={"to-do-list li"}>
                <div className={"to-do-list__item colors__item_navy"}>
                    <div className="task__manage">
                        <input className="task__checkbox" onClick = {this.onClickDone} type="checkbox"/>
                    </div>
                    <div className="task__body">
                        <p className={`task__text ${style}`}> {this.props.item.text}</p>
                        <div className="removeIcon" onClick={this.onClickRemove}>X</div>
                    </div>
                </div>
            </li>
        )
    }
}

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.onClickRemoveDone = this.onClickRemoveDone.bind(this);
    }

    onClickRemoveDone() {
        this.props.removeDone();
    }

    render() {
        let tasks = this.props.tasks.map((item) => {
            return (
                <Task item = {item} id = {item.id} removeTask = {this.props.removeTask} taskDone = {this.props.taskDone}/>
            )
        });
        return (
            <ul>
                {tasks}
                <div className="removeDoneIcon" onClick={this.onClickRemoveDone}>Удалить все</div>
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
        event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы
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
            tasks: [],
            counter: -1,
        }
        this.addTask = this.addTask.bind(this); // Установка контекста этого родительского компонента для того, чтобы вызывать эти методы через пропсы в дочках
        this.removeTask = this.removeTask.bind(this);
        this.taskDone = this.taskDone.bind(this);
        this.changeTask = this.changeTask.bind(this);
        this.removeDone = this.removeDone.bind(this);
    }

    // Добавление таска в массив. Передается в пропсе в NewTaskForm
    addTask(task) {
        let counter = this.state.counter + 1;
        this.state.tasks.push(
            {
                id: counter,
                text: task,
                done: false,
            }
        )
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks, counter: counter});
        console.log(this.state.tasks);
    }

    removeTask(taskId){
        console.log(taskId); //   Через фильтр
       let tasks = this.state.tasks.filter((item) => item.id !== taskId);
       this.setState({tasks: tasks});
        console.log(this.state.tasks);
    }

    removeDone(){
        let tasks = this.state.tasks.filter((item) => item.done !== true);
        this.setState({tasks: tasks});
    }

    taskDone(taskId){
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.done = !task.done;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    changeTask(taskId, text) {
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.text = text;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    render() {
        return (
            <div className="wrapper">
                <div className="to-do-app">
                    <TasksList tasks = {this.state.tasks} removeTask = {this.removeTask} removeDone = {this.removeDone} taskDone = {this.taskDone}/>
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

