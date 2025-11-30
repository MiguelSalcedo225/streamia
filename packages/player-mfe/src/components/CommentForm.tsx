import React, { useState } from "react";

interface CommentFormProps {
	onSubmit: (text: string) => void;
	loading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, loading }) => {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			onSubmit(text);
			setText("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="comment-form">
			<textarea
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Escribe un comentario..."
				disabled={loading}
			/>
			<button type="submit" disabled={loading || !text.trim()}>
				{loading ? "Enviando..." : "Comentar"}
			</button>
		</form>
	);
};

export default CommentForm;
