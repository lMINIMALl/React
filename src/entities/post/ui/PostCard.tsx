import { useEffect, useState, type MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommentList } from "../../../widgets/CommentList/ui/CommentList";
import type { User } from "../../../entities/user/model/types";

interface Comment {
  id: number;
  text: string;
}

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  user?: User;
  showBackButton?: boolean;
  showComments?: boolean;
}
export default function PostCard({
  id,
  title,
  body,
  user,
  showBackButton = false,
  showComments = false,
}: PostCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showComments) return;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data: { id: number; body: string }[]) => {
        setComments(
          data.map((c) => ({
            id: c.id,
            text: c.body,
          }))
        );
      });
  }, [id, showComments]);

  const handleBack: MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/posts");
  };

  return (
    <li className="post-card">
      <div className="post-card-btn-wrapper">
        {showBackButton ? (
          <button className="post-detail-btn" onClick={handleBack}>
            Назад
          </button>
        ) : (
          <Link to={`/posts/${id}`} state={{ user }}>
            <button className="post-detail-btn">Открыть пост</button>
          </Link>
        )}
      </div>

      {user ? (
        <div className="post-author">
          <img src={user.avatar} alt={user.name} className="post-avatar" />
          <Link to={`/users/${user.id}`} className="post-author-link">
            {user.name}
          </Link>
        </div>
      ) : (
        <div className="post-author">Loading author...</div>
      )}

      <h3>{title}</h3>
      <p>{body}</p>

      {showComments && <CommentList comments={comments} />}
    </li>
  );
}
