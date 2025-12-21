import { useState, useCallback } from "react";

type Props = {
  onChange: (minLength: number) => void;
};

export const PostLengthFilter = ({ onChange }: Props) => {
  const [minLength, setMinLength] = useState(0);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinLength(value);
    onChange(value); 
  }, [onChange]);

  return (
    <div style={{ marginBottom: 16 }}>
      <label>
        Фильтр по количеству слов заголовка:
        <input
          type="number"
          min={0}
          value={minLength}
          onChange={handleChange}
          style={{ marginLeft: 8, width: 60 }}
        />
      </label>
    </div>
  );
};
