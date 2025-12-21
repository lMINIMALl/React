import { useParams, useNavigate } from "react-router-dom";
import type { MouseEventHandler } from "react";
import { useGetTodosByUserQuery } from "../entities/todos/api/todosApi";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import { ItemList } from "../shared/ui/ItemList/ItemList";
import type { Todo } from "../entities/todos/model/types";

export const UserTodosPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: todos, isLoading, error } = useGetTodosByUserQuery(userId);
  const { users } = useUsers();
  const user = users.find((u) => u.id === userId);

  const handleBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isLoading) return <div>Загрузка задач...</div>;
  if (error) return <div>Ошибка загрузки задач</div>;

  return (
    <div className="todos-page">
      <button onClick={handleBack} className="back-btn">
        Назад
      </button>

      <h2>Задачи пользователя {user?.name}</h2>

      <ItemList<Todo>
        items={todos ?? []}
        className="todos-list"
        getKey={(todo) => todo.id}
        renderItem={(todo) => (
          <li key={todo.id} className={`todo-card ${todo.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span className="todo-title">{todo.title}</span>
          </li>
        )}
      />
    </div>
  );
};
