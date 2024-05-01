import { Gender, User } from "../types";

const initialUsers: User[] = [
  {
    id: "4dfd3842-f146-4bed-937f-610bf2eabecc",
    gender: Gender.Male,
    firstName: "Eric",
    lastName: "Smith",
    age: 35,
  },
  {
    id: "80e015e8-d540-491e-ba14-afbb0800aee9",
    gender: Gender.Female,
    firstName: "Kate",
    lastName: "Johnson",
    age: 29,
  },
  {
    id: "c02b9064-3302-42bf-a122-03b5b7e3a2ab",
    gender: Gender.Male,
    firstName: "Nick",
    lastName: "Roswell",
    age: 42,
  },
  {
    id: "a9a4cc61-d4c7-4177-90d3-8df3172aae64",
    gender: Gender.Female,
    firstName: "Michele",
    lastName: "Houston",
    age: 27,
  },
  {
    id: "211132dd-a824-47d0-8c4f-51d45df59152",
    gender: Gender.Female,
    firstName: "Caryl",
    lastName: "Baker",
    age: 27,
  },
];

export let users: User[] = [...initialUsers];

export function resetUsers() {
  users = [...initialUsers];
}
