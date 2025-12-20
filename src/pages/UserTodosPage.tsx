import { useParams, useNavigate } from "react-router-dom";
import { useGetTodosByUserQuery } from "../entities/todos/api/todosApi";
import { useUsers } from "../features/PostList/model/hooks/useUsers";

export const UserTodosPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: todos, isLoading, error } = useGetTodosByUserQuery(userId);

  const { users } = useUsers();
  const user = users.find(u => u.id === userId);

  if (isLoading) return <div>Загрузка задач...</div>;
  if (error) return <div>Ошибка загрузки задач</div>;

  return (
    <div className="todos-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        Назад
      </button>

      <h2>Задачи пользователя {user?.name}</h2>

      <ul className="todos-list">
        {todos?.map(todo => (
          <li key={todo.id} className={`todo-card ${todo.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span className="todo-title">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
