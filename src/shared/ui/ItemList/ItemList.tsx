import type { ReactNode } from "react";

type ItemListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
  onItemClick?: (item: T) => void;
  className?: string; 
};

export function ItemList<T>({
  items,
  renderItem,
  getKey,
  onItemClick,
  className,
}: ItemListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={getKey(item)}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
          style={{ cursor: onItemClick ? "pointer" : "default" }}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
