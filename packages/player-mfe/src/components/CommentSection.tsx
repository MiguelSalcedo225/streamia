import React from "react";
import CommentCard from "./CommentCard";

interface Comment {
	_id: string;
	user: string;
	text: string;
	date: string;
}

interface CommentSectionProps {
	comments: Comment[];
	onDelete: (id: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onDelete }) => (
	<div className="comment-section">
		{comments.map(comment => (
			<CommentCard key={comment._id} comment={comment} onDelete={onDelete} />
		))}
	</div>
);

export default CommentSection;
