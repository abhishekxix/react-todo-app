import React, { useState } from 'react';
import { useTodoDispatch } from '../../context/TodoContext';

/**
 * Returns the AddTodo component.
 *
 * @return {JSX.Element} The AddTodo element.
 */
export default function AddTodo() {
	const [currentContent, setCurrentContent] = useState('');
	const [isInputValid, setIsInputValid] = useState(true);

	const { addTodoItem } = useTodoDispatch();

	/**
	 * Handles the add todo item event.
	 *
	 * @param {React.SyntheticEvent} evt The event object.
	 */
	const handleAdd = (evt) => {
		evt.preventDefault();
		addTodoItem(currentContent);
		setCurrentContent('');
	};

	/**
	 * Handles the change in the input element.
	 *
	 * @param {React.SyntheticEvent} evt The event object.
	 * @return {void}
	 */
	const handleChange = (evt) => {
		setCurrentContent(evt.target.value);

		// Validate input.
		if (evt.target.value.trim() === '') {
			setIsInputValid(false);
			return;
		}
		setIsInputValid(true);
	};

	return (
		<form className="add-todo-item" onSubmit={handleAdd}>
			<input
				type="text"
				maxLength={50}
				onChange={handleChange}
				value={currentContent}
			/>
			<button
				className={isInputValid ? '' : 'invalid-input'}
				type="submit"
			>
				Add
			</button>
		</form>
	);
}
