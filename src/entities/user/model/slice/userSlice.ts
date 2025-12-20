import { createSlice, createEntityAdapter, type PayloadAction, type EntityState, type EntityAdapter } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  avatar: string;
};

const usersAdapter: EntityAdapter<User, number> = createEntityAdapter<User, number>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

interface UsersState extends EntityState<User, number> {
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = usersAdapter.getInitialState({
  loading: false,
  error: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      usersAdapter.setAll(state, action.payload);
    },
    addUser: (state, action: PayloadAction<User>) => {
      usersAdapter.addOne(state, action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      usersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removeUser: (state, action: PayloadAction<number>) => {
      usersAdapter.removeOne(state, action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<{
  users: UsersState;
}>((state) => state.users);
