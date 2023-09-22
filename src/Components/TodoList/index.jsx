import React, { useEffect } from 'react';
import TodoItem from '../TodoItem';
import { useTodoList } from '../../context/TodoContext';

/**
 * Returns the TodoList component.
 *
 * @return {JSX.Element}
 */
export default function TodoList() {
	const todoList = useTodoList();

	// Save the todolist to localstorage on change.
	useEffect(
		() => localStorage.setItem('todolist', JSON.stringify(todoList)),
		[todoList]
	);

	if (todoList.length === 0) {
		return (
			<div className="todolist">
				<p>No Items</p>
			</div>
		);
	}

	return (
		<div className="todolist">
			{/* Render each todo list item. */}
			{todoList.map((item) => (
				<TodoItem
					key={item.id}
					id={item.id}
					content={item.content}
					done={item.done}
				/>
			))}
		</div>
	);
}
