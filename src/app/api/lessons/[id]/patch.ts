import { getSession } from "@/auth";
import { db } from "@/db";
import { lessons } from "@/db/schema/lessons";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { role } = await getSession();

  if (role === "student") {
    return Response.json({}, { status: 401 });
  }

  const { id } = await params;
  const { complete } = await request.json();

  const entry = await db
    .update(lessons)
    .set({
      ...(complete && { complete }),
    })
    .where(eq(lessons.id, id))
    .returning();

  return Response.json(entry[0]);
};
