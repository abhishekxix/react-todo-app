import React from 'react';
import TodoList from './Components/TodoList';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './Components/AddTodo';

/**
 * Returns the App component wrapped in Context provider.
 *
 * @return {JSX.Element}
 */
export default function App() {
	return (
		<TodoProvider>
			<div id="todo-app">
				<h1 className="app-heading">TODO App</h1>
				<TodoList />
				<AddTodo />
			</div>
		</TodoProvider>
	);
}
