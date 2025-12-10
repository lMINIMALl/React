import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
};

export const UserTodosPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    const fetchUser = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => {
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    });

    const fetchTodos = fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`).then(res => {
      if (!res.ok) throw new Error("Failed to fetch todos");
      return res.json();
    });

    Promise.all([fetchUser, fetchTodos])
      .then(([userData, todosData]) => {
        setUser(userData);
        setTodos(todosData);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleBack = () => navigate(-1);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todos-page">
      <button onClick={handleBack}>
        Назад
      </button>

      <h2>Задачи пользователя {user?.name ?? "Без имени"}</h2>

      <ul className="todos-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-card ${todo.completed ? "completed" : ""}`}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <span className="todo-title">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
