import { NextResponse } from "next/server";

import { registerSchema } from "@/shared/api/auth";
import { registerService } from "@/server/auth";
import { createSession } from "@/server/auth/session";
import { mapUserToResponse } from "@/server/api/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      const errors: Record<string, string[]> = {};

      for (const issue of parsedBody.error.issues) {
        const field = issue.path.join(".") || "form";

        errors[field] ??= [];
        errors[field].push(issue.message);
      }

      return NextResponse.json(
        {
          message: "Некорректные данные",
          errors,
        },
        { status: 400 },
      );
    }

    const user = await registerService.execute(parsedBody.data);

    await createSession(user.id);

    return NextResponse.json(
      {
        user: mapUserToResponse(user),
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("email уже существует")
    ) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    if (
      error instanceof Error &&
      error.message.includes("номером телефона уже существует")
    ) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    console.error("Register error:", error);

    return NextResponse.json(
      { message: "Ошибка при регистрации" },
      { status: 500 },
    );
  }
}
