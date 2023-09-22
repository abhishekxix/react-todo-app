import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidV4 } from 'uuid';

const TodoContext = createContext(null);
const TodoDispatchContext = createContext(null);

/**
 * Fetches the initial state from the local storage.
 *
 * @return {array} The initial state array.
 *
 * @see todoReducer for more information about the state
 */
function getInitialState() {
	const todoListStored = localStorage.getItem('todolist');

	if (!todoListStored) {
		return [];
	}

	return JSON.parse(todoListStored);
}

/**
 * Handles state for todo list.
 *
 *
 * @param {array} todoList Array of Todo Item objects {
 * 		Each object is of the following schema: {
 * 			id:			string,
 * 			content: 	string,
 * 			done:		bool
 * 		}
 * }
 * @param {object} action The action for the reducer.
 *
 * @return {array} New todolist based on state manipulation logic.
 */
function todoReducer(todoList, action) {
	switch (action.type) {
		case 'ADD':
			// Add a new Todo Item object.
			return [
				{ id: uuidV4(), content: action.content, done: false },
				...todoList,
			];

		case 'REMOVE':
			// Remove a Todo Item object.
			return todoList.filter((item) => item.id !== action.id);

		case 'EDIT':
			// Edit the content of a Todo Item object.
			return todoList.map((item) => {
				if (item.id !== action.id) {
					return item;
				}

				return { ...item, content: action.content };
			});

		case 'TOGGLE':
			// Toggle the `done` state of a Todo Item object.
			return todoList.map((item) => {
				if (item.id !== action.id) {
					return item;
				}
				const isDone = item.done;

				return { ...item, done: !isDone };
			});

		default:
			// Return the previous state in case the action type is not found.
			return todoList;
	}
}

/**
 * Returns the value of the TodoList context.
 *
 * @return {array} The state stored in the context.
 */
export function useTodoList() {
	return useContext(TodoContext);
}

/**
 * Returns the object containing the functions for state dispatch.
 *
 * @return {object}
 *
 * @see TodoProvider for more information about the dispatch functions.
 */
export function useTodoDispatch() {
	return useContext(TodoDispatchContext);
}

/**
 * Returns the TodoProvider JSX element.
 *
 * @param {JSX.Element} children The children element of the context provider.
 * @return {JSX.Element} Returns the JSX element.
 */
export function TodoProvider({ children }) {
	const [todoList, dispatch] = useReducer(todoReducer, getInitialState());

	/**
	 * Dispatches the `ADD` action for todo list item.
	 *
	 * @param {string} content The content of the list item.
	 * @return {void}
	 */
	function addTodoItem(content) {
		if (content.trim() === '') {
			return;
		}
		dispatch({ type: 'ADD', content: content.trim() });
	}

	/**
	 * Dispatches the `EDIT` action for the todo list item.
	 *
	 * @param {string} id The unique ID of the list item.
	 * @param {string} content The content of the list item.
	 * @return {void}
	 */
	function editTodoItem(id, content) {
		if (content.trim() === '') {
			return;
		}
		dispatch({ type: 'EDIT', id, content: content.trim() });
	}

	/**
	 * Dispatches the `REMOVE` action for the todo list item.
	 *
	 * @param {string} id The unique ID of the list item.
	 *
	 * @return {void}
	 */
	function removeTodoItem(id) {
		dispatch({ type: 'REMOVE', id });
	}

	/**
	 * Dispatches the `TOGGLE` action for the todo list item.
	 *
	 * @param {string} id The unique ID of the list item.
	 */
	function toggleTodoItem(id) {
		dispatch({ type: 'TOGGLE', id });
	}

	// useMemo used to memoize dispatch functions to pass in the value for context.
	const dipatchFunctions = useMemo(
		() => ({
			addTodoItem,
			editTodoItem,
			removeTodoItem,
			toggleTodoItem,
		}),
		[]
	);

	return (
		<TodoContext.Provider value={todoList}>
			<TodoDispatchContext.Provider value={dipatchFunctions}>
				{children}
			</TodoDispatchContext.Provider>
		</TodoContext.Provider>
	);
}

TodoProvider.propTypes = {
	children: PropTypes.element,
};

TodoProvider.defaultProps = {
	children: null,
};
