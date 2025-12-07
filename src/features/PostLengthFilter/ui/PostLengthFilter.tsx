import { useState, useCallback } from "react";

type Props = {
  onChangeOrder: (ascending: boolean) => void;
};

export const PostLengthFilter = ({ onChangeOrder }: Props) => {
  const [ascending, setAscending] = useState(true);

  const toggleOrder = useCallback(() => {
    setAscending((prev) => {
      const newOrder = !prev;
      onChangeOrder(newOrder);
      return newOrder;
    });
  }, [onChangeOrder]);

  return (
    <div>
      <button onClick={toggleOrder} className="button">
        {ascending ? "⮝" : "⮟"}
      </button>
    </div>
  );
};
