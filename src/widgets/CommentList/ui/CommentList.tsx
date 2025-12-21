import { useState, useCallback, type FC } from "react";

export interface Comment {
  id: number;
  text: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="comment-list">
      <button onClick={toggle} className="button" type="button">
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
