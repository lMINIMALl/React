import { useState, useCallback } from "react";
import "./CommentList.css";

type Comment = {
  id: number;
  text: string;
};

type Props = {
  comments: Comment[];
};

export const CommentList = ({ comments }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="comment-list">
      <button onClick={toggle} className="button">
        {isOpen ? "Скрыть комментарии" : "Показать комментарии"} ({comments.length})
      </button>

      <ul className={`comments-container ${isOpen ? "open" : ""}`}>
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
