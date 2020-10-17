import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: "",
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
        this.onDoubleClickEdit = this.onDoubleClickEdit.bind(this);
        // (?) Мб лучше сделать отдельный компонент?
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    onClickRemove() {
        let id = this.props.id;
        this.props.removeTask(id);
    }

    onClickDone() {
        let id = parseInt(this.props.id);
        this.props.taskDone(id);
    }

    onDoubleClickEdit() {
        let value = this.props.item.text;
        this.setState({value: value, isEdit: true});
    }

    onBlur() {
        console.log("im not focused");
        let text = this.state.value.trim();
        if (text) {
            this.props.editTask(this.props.item.id, text);
            this.setState({value: '', isEdit: false});
        } else {
            let id = this.props.item.id;
            this.props.removeTask(id);
            this.setState({value: '', isEdit: false});
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onKeyDown(event) {
        switch (event.key) {
            case "Enter":
                let text = this.state.value.trim();
                if (text) {
                    this.props.editTask(this.props.item.id, text);
                    this.setState({value: '', isEdit: false});
                } else {
                    let id = this.props.item.id;
                    this.props.removeTask(id);
                    this.setState({value: '', isEdit: false});
                }
                break;
            case "Escape":
                this.setState({isEdit: false});
                break;
            default: return;
        }
    }

    render() {
        let style = this.props.item.done ? "task__text_done" : "";

        let div = 
        <React.Fragment>
            <div className="task__manage">
                <input type="checkbox" checked={this.props.item.done} onClick={this.onClickDone} className="task__checkbox"/>
            </div>
            <div className="task__body" >
                <p className={`task__text ${style}`}>{this.props.item.text}</p>
            </div>
            <div className="task__manage">
                <div className="task__remove" onClick={this.onClickRemove}>×</div>
            </div>
        </React.Fragment>

        let input = <React.Fragment>
            <div className="task__manage">      
            </div>
            <input className="task__edit" autoFocus value={this.state.value} onKeyDown={this.onKeyDown} onChange = {this.handleChange}
            onFocus={this.onFocus} onBlur={this.onBlur} />
        </React.Fragment>

        let block = this.state.isEdit ? input : div;

        return(
            <li className="to-do-list__item" onDoubleClick={this.onDoubleClickEdit}>
                    <div className="task">
                        {block}
                    </div>
                </li>
        )
    }
}

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTasks: "all",
        };
        this.onClickRemoveDone = this.onClickRemoveDone.bind(this);
        this.onClickShowDone = this.onClickShowDone.bind(this);
        this.onClickShowUndone = this.onClickShowUndone.bind(this);
        this.onClickShowAll = this.onClickShowAll.bind(this);
    }

    onClickRemoveDone() {
        this.props.removeDone();
    }

    onClickShowDone() {
        this.setState({currentTasks:"done"});
    }
    onClickShowUndone() {
        this.setState({currentTasks:"undone"});
    }
    onClickShowAll() {
        this.setState({currentTasks:"all"});
    }


    render() {
        let tasks = this.props.tasks;
        let tasksDone = this.props.tasks.filter((item) => item.done === true);
        //let allTasksCount = tasks.length;
        let doneTasksCount = tasksDone.length;
        let undoneTasksCount = tasks.length - tasksDone.length;
        let clearDoneStyle = (doneTasksCount > 0) ? "task-menu__clear" : "task-menu__clear_hidden";

        switch (this.state.currentTasks) {
            case "all":
                tasks = tasks.map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            case "done":
                tasks = tasksDone.map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            case "undone":
                tasks = this.props.tasks.filter((item) => item.done === false).map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            default: return;
        }

        return (
            <React.Fragment>
                <ul className="task-list">
                {tasks}
            </ul>
            <div className="task-menu">
            <div className="task-menu__counter">
                <p> {undoneTasksCount + " items left"} </p>
            </div>
            <div className="task-menu__filter">
            <div className={(this.state.currentTasks === "all") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"} onClick={this.onClickShowAll}>All</div>
            <div className={(this.state.currentTasks === "undone") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"}  onClick={this.onClickShowUndone}>Active</div>
            <div className={(this.state.currentTasks === "done") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"}  onClick={this.onClickShowDone}>Completed</div>
            </div>
            <div className={clearDoneStyle}>
                <div className="task-menu__btn-clear" onClick={this.onClickRemoveDone}>Clear completed</div>
            </div>
        </div>
            </React.Fragment>
                  
        );
    }
}

class NewTaskForm extends React.Component { // Компонент доска
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            allDone: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickDoneAll = this.onClickDoneAll.bind(this);
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
        this.setState({value: ''});
        event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы
    }

    onClickDoneAll() {
        let tasks = this.props.tasks;
        if (tasks.length === 0) {
            return ;
        }

        
        if (tasks.some((item) => item.done === false)) {
            this.props.allTasksDone(true);
            this.setState({allDone: true});
        } else {
            this.props.allTasksDone(false);
            this.setState({allDone: false});
        }
    }

    render() {
        console.log((this.state.allDone && !this.props.tasks.some((item) => item.done === false)) && this.props.tasks.length > 0)
        let selectorStyle = (this.state.allDone && !this.props.tasks.some((item) => item.done === false) && this.props.tasks.length > 0) ? "task-selector__btn task-selector__btn_chosen" : "task-selector__btn";
        return (
            <form onSubmit = {this.handleSubmit} className="new-task">
                <div className="task-selector">
                    <p onClick={this.onClickDoneAll} className={selectorStyle}>❯</p>
                </div>
                <input placeholder="What needs to be done?" 
                className="new-task__input" maxlength="85" autoFocus type="text" onChange = {this.handleChange}
                value={this.state.value}/>
                <div className="new-task__controls">
                    <button className="new-task__btn" id="new-task__btn">Add</button>
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
        // Установка контекста этого родительского компонента для того, чтобы вызывать эти методы через пропсы в дочках
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.taskDone = this.taskDone.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeDone = this.removeDone.bind(this);
        this.allTasksDone = this.allTasksDone.bind(this);
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

    // Удаление таска. Передается через TasksList в Task
    removeTask(taskId){
       let tasks = this.state.tasks.filter((item) => item.id !== taskId);
       this.setState({tasks: tasks});
    }

    // Передается в TasksList
    removeDone(){
        let tasks = this.state.tasks.filter((item) => item.done !== true);
        this.setState({tasks: tasks});
    }

    // Передается через TasksList в Task
    taskDone(taskId){
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.done = !task.done;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Передается в TasksList
    allTasksDone(allDone) {
        this.state.tasks.forEach((item) => item.done = allDone);
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Передается через TasksList в Task
    editTask(taskId, text) {
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.text = text;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Функция отрисовки элементов
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                        <h1 className="header__text">todos</h1>
                    </header>
                <div className="to-do-app">
            <NewTaskForm tasks = {this.state.tasks} addTask = {this.addTask} allTasksDone = {this.allTasksDone}/>
            <TasksList tasks = {this.state.tasks} removeTask = {this.removeTask} removeDone = {this.removeDone}
                       taskDone = {this.taskDone} editTask = {this.editTask}/>
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