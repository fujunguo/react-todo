import React, { Component } from 'react'
import TodoItem from './TodoItem'

class Todolist extends Component {
    render() {
        let todos = this.props.todos
        // console.log('todo', todos)
        return (
            <ul className='todoitem'>
                { todos.map(t => (
                    <li key={ t.id }>
                        <TodoItem todo={t} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
                    </li>)
                )
                }
            </ul>
        )
    }
}

export default Todolist