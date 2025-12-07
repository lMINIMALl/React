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

      {isOpen && (
        <div className="comments-container">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
