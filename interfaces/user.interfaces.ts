export type UserRole = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  photo: string;
  roles: UserRole[];
};

export type FetchStudentsResponse = {
  status: string;
  users: User[];
};

export type FetchStudentResponse = {
  status: string;
  user: User;
};

export type StudentState = {
  loading: boolean;
  user: User | null;
};
