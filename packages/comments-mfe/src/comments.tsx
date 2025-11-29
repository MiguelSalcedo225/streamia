import { useEffect, useState } from "react";
import { getComments, createComment } from "./api";
import "./styles/comments.scss";


interface Comment {
  _id: string;
  text: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

interface CommentsProps {
  movieId: string;
  token?: string;
}

export default function Comments({ movieId, token }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getComments(movieId).then(setComments).catch(console.error);
  }, [movieId]);

  const handleSubmit = async () => {
    if (!token || !text.trim()) return;

    try {
      await createComment(movieId, text, token);
      const updated = await getComments(movieId);
      setComments(updated);
      setText("");
    } catch (e) {
      console.error(e);
    }
  };


 return (
    <section className="movie-detail__comments">
      <h2 className="movie-detail__comments-title">
        Comentarios
        <span className="movie-detail__comments-count">
          ({comments.length})
        </span>
      </h2>

      <div className="movie-detail__comments-list">
        {comments.length === 0 ? (
          <div className="movie-detail__no-comments">
            <h3>No hay comentarios aún</h3>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="movie-detail__comment">
              <div className="movie-detail__comment-header">
                <strong className="movie-detail__comment-username">
                  {c.userId.firstName} {c.userId.lastName}
                </strong>
                <span className="movie-detail__comment-time">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="movie-detail__comment-text">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}