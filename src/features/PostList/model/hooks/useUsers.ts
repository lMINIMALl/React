import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  avatar: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        const usersWithAvatar = data.map((u: any) => ({
          id: u.id,
          name: u.name,
          avatar: `https://i.pravatar.cc/150?img=${u.id}`,
        }));
        setUsers(usersWithAvatar);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { users, isLoading, error };
};
