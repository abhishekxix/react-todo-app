import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { FaEdit, FaSave, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import { useTodoDispatch } from '../../context/TodoContext';

/**
 * Returns the TodoItem component
 *
 * @param {Object} { id, content, done }
 * @param {string}  params.id      The id of the Todo Item.
 * @param {string}  params.content The content of the Todo Item.
 * @param {boolean} params.done    The done status of the Todo Item.
 *
 * @return {JSX.Element}
 */
export default function TodoItem({ id, content, done }) {
	const [isEditing, setIsEditing] = useState(false);
	const [currentContent, setCurrentContent] = useState(content);

	const { removeTodoItem, editTodoItem, toggleTodoItem } = useTodoDispatch();

	/**
	 * Handles the editing of the todo Item.
	 *
	 * @return {void}
	 */
	const handleEditing = () => {
		if (!isEditing) {
			setCurrentContent(content);
			return setIsEditing(true);
		}
		editTodoItem(id, currentContent);

		// Validate the input.
		if (currentContent.trim() === '') {
			setCurrentContent(content);
		}
		return setIsEditing(false);
	};

	const handleChange = (evt) => {
		setCurrentContent(evt.target.value);
	};

	return (
		<div className={`todo-item${done ? ' todo-item--done' : ''}`}>
			{/* Render the input element if editing currently. */}
			{isEditing ? (
				<input
					type="text"
					value={currentContent}
					maxLength={50}
					onChange={handleChange}
				/>
			) : (
				<p>{currentContent}</p>
			)}
			<div className="todo-item__btn-container">
				<button type="button" onClick={handleEditing}>
					{isEditing ? <FaSave /> : <FaEdit />}
				</button>
				<button type="button" onClick={() => removeTodoItem(id)}>
					<FaTrash />
				</button>
				<button type="button" onClick={() => toggleTodoItem(id)}>
					{done ? <FaUndo /> : <FaCheck />}
				</button>
			</div>
		</div>
	);
}

TodoItem.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	done: PropTypes.bool.isRequired,
};
