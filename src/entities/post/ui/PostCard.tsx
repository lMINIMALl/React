import { useEffect, useState } from "react";
import { CommentList } from "../../../widgets/CommentList/ui/CommentList";
import "./PostCard.css";

type Props = {
  id: number;
  title: string;
  body: string;
  onClick?: () => void;
};

export default function PostCard({ id, title, body, onClick }: Props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(
          data.map((c: any) => ({
            id: c.id,
            text: c.body,
          }))
        );
      });
  }, [id]);

  return (
    <li className="post-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{body}</p>

      <CommentList comments={comments} />
    </li>
  );
}
