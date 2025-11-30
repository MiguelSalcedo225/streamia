import React from "react";

interface Comment {
	_id: string;
	user: string;
	text: string;
	date: string;
}

interface CommentCardProps {
	comment: Comment;
	onDelete: (id: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => (
	<div className="comment-card">
		<div className="comment-card__header">
			<span className="comment-card__user">{comment.user}</span>
			<span className="comment-card__date">{comment.date}</span>
			<button onClick={() => onDelete(comment._id)}>Eliminar</button>
		</div>
		<div className="comment-card__text">{comment.text}</div>
	</div>
);

export default CommentCard;
