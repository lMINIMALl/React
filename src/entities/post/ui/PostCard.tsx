type Props = {
  title: string;
  text: string;
};

function PostCard({ title, text }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default PostCard;
