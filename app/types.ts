export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type User = {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  age: number;
};

export type EditableUser = {
  gender: Gender | null;
  firstName: string;
  lastName: string;
  age: number | null;
};
