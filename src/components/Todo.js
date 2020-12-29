import React, { Component } from 'react'
import './Todo.css'
import Todolist from './Todolist'
import TodoApi from "../api/todo"
import TodoCounter from './TodoCounter'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        this.state = {
            todos: [],
            text: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        console.log('组件已经挂载成功')
        // this.api.all((r) => {
        //     this.setState({
        //         todos: r,
        //     })
        // })
    }

    // 更新事件的完成状态
    onUpdate(todo) {
        let todos = this.state.todos
        let t = todos.find(e => e.id === todo.id)
        t.done = todo.done
        this.setState({
            todos: todos
        })
    }

    // 更新事件的删除状态
    onDelete(id) {
        let todos = this.state.todos
        let index = todos.findIndex(e => e.id === id)
        todos.splice(index, 1)
        this.setState({
            todos: todos,
        })
    }

    onChange(e) {
        this.setState({
            text:e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault()
        // 如果输入框为空
        if (this.state.text.length === 0) {
            console.log('输入框不能为空')
            return
        }

        let task = this.state.text
        let todos = this.state.todos
        let id = 0
        if (todos.length !== 0) {
            id = todos.length + 1
        }
        let data = {
            task: task,
            id: id,
            done: false,
        }
        todos.push(data)
        console.log('todos', todos, todos.length)
        this.setState({
            todos:todos,
            text:'',
        })
        // console.log('state', this.state)
        // this.api.add(data, (r) => {
        //     todos.push(r)
        //     this.setState({
        //         todos: todos,
        //         text: ''
        //     })
        // })
    }

    render() {
        let todos = this.state.todos
        let undone = todos.filter(e => e.done === false)
        let list_count = todos.length
        return (
            <div id='todolist'>
                <h2>待办事项
                    <span>今天是 {new Date().toDateString()}，你一共有 {list_count} 个待办事项，还有 {undone.length} 个正在进行中。</span>
                </h2>
                <Todolist todos={todos} onUpdate={this.onUpdate} onDelete={this.onDelete}/>
                {/*<TodoCounter todos={todos}/>*/}
                <form onSubmit={ this.onSubmit }>
                    <input
                        id='new-todo'
                        onChange={ this.onChange }
                        value={ this.state.text }
                        placeholder='✍️  输入新的待办事项...'
                    />
                    <button>添加第 { todos.length + 1} 个待办事项</button>
                </form>
            </div>
        )
    }
}

export default Todo