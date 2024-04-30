import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { deleteUser, updateUser } from "../../utils";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userData = await req.json();
  const user = updateUser(params.id, userData);

  revalidatePath("/");
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deleteUser(params.id);

  revalidatePath("/");
  return NextResponse.json(deleted, { status: 200 });
}
