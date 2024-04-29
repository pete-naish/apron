import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createUser, getAllUsers } from "../utils";

export async function GET() {
  const users = getAllUsers();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
  const userData = await req.json();
  const user = createUser(userData);

  revalidatePath("/");
  return NextResponse.json(user, { status: 200 });
}
