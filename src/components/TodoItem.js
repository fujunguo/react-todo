import React, { Component } from 'react'
import TodoApi from "../api/todo"
import { Link } from 'react-router-dom'

class TodoItem extends Component{
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        let { task, id, done } = this.props.todo
        this.state = {
            // 使用 editing 管理正在编辑/非编辑的状态
            // 通过 state 的变化来改变 UI
            editing: false,
            text: task,
            todo: {
                task,
                id,
                done,
            }
        }
    }

    updateTodo = (todoId, data) => {
        let todo = this.state.todo
        todo.done = data.done
        todo.task = data.task
        this.setState({
            todo: todo,
            editing: false,
        })
        this.updateCounter()
        // this.api.update(todoId, data, (r) =>{
        //     this.setState({
        //         todo: r,
        //         editing: false,
        //     })
        //     // 待从后端获取到最新的 todo 事件后，再更新父组件的事件完成状态
        //     this.updateCounter()
        // })
    }

    updateCounter = () => {
        let func = this.props.onUpdate
        func(this.state.todo)
    }

    toggleComplete = () => {
        let { id, task, done } = this.state.todo
        let data = {
            done: !done,
            task: task,
        }
        let todoId = String(id)
        this.updateTodo(todoId, data)
    }

    onEdit = () => {
        this.setState({
            editing: true,
        })

    }

    onDelete = () => {
        let { id } = this.state.todo
        let todoId = String(id)
        let func = this.props.onDelete
        // id 是数字，todoId 是字符串，应该传 id 给父组件 Todo
        func(id)
        // this.api.delete(todoId, (r) => {
        //     let func = this.props.onDelete
        //     // id 是数字，todoId 是字符串，应该传 id 给父组件 Todo
        //     func(id)
        // })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    onSubmit = () => {
        let { id } = this.props.todo
        let text = this.state.text
        let todoId = String(id)
        let data = {
            task: text,
        }
        this.updateTodo(todoId, data)
    }

    onCancel = () => {
        this.setState({
            editing: false,
        })
    }

    render() {
        let { id, task, done } = this.state.todo
        let todo = null
        // 正在编辑的时候是一个组件
        // 完成编辑的时候是另一个组件
        if (this.state.editing) {
            todo = (
                <div className='box'>
                    <input type='text' value={this.state.text} onChange={this.onChange}/>
                    <span className='actions'>
                         <button onClick={this.onSubmit} className='btn-picto'>
                            <i aria-hidden="true" className="material-icons">check</i>
                        </button>
                        <button onClick={this.onCancel} className='btn-picto'>
                            <i aria-hidden="true" className="material-icons">cancel</i>
                        </button>
                    </span>
                </div>
            )
        } else {
            let text = this.state.todo.done ? '取消完成' : '标记完成'
            let completeStatus = this.state.todo.done ? 'check_box' : 'check_box_outline_blank'
            let boxStatus = completeStatus + ' box'
            todo = (
                <div className={`${boxStatus}`}>
                    {/*todo 的详细信息*/}
                    {/*<Link to={`/todo/${id}`}>{ task }</Link>*/}
                    <span className='label'>{ task }</span>
                    <span className='actions'>
                        <button onClick={this.onEdit} className='btn-picto'>
                            <i aria-hidden="true" className="material-icons">edit</i>
                        </button>
                        <button onClick={this.onDelete} className='btn-picto' type='button' aria-label='Delete' title='Delete'>
                            <i aria-hidden="true" className="material-icons">delete</i>
                        </button>
                        <button onClick={this.toggleComplete} className='btn-picto'>
                            <i aria-hidden="true" className="material-icons">{completeStatus}</i>
                        </button>
                    </span>
                </div>
            )
        }
        let cls = done ? 'todo-complete':''
        return (
            <div className={`todo-cell ${cls}`}>
                { todo }
            </div>
        )
    }
}

export default TodoItem