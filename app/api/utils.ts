import { User } from "@/app/types";
import { v4 as uuidV4 } from "uuid";
import { revalidatePath } from "next/cache";

import { users } from "./data";

export function createUser(user: Omit<User, "id">): User {
  const newUser = { ...user, id: uuidV4() };
  users.push(newUser);
  return newUser;
}

export function updateUser(
  id: string,
  update: Partial<User>
): User | undefined {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return undefined;
  const updatedUser = { ...users[userIndex], ...update };
  users[userIndex] = updatedUser;
  revalidatePath("/");
  return updatedUser;
}

export function deleteUser(id: string): boolean {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;
  users.splice(userIndex, 1);
  revalidatePath("/");
  return true;
}

export function getUser(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function getAllUsers(): User[] {
  return users;
}
