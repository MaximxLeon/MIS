import 'server-only';

import {
  createHash,
  randomBytes,
} from 'node:crypto';

import {
  cookies,
  headers,
} from 'next/headers';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { AppError } from '@/server/errors';
import { prisma } from '@/server/prisma';

const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 дней
const SESSION_LAST_USED_UPDATE_INTERVAL = 5 * 60 * 1000;

function generateSessionToken() {
  return randomBytes(32).toString("base64url");
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    throw new AppError({
      status: ERROR_STATUS.UNAUTHORIZED,
      code: ERROR_CODES.UNAUTHORIZED,
      message: "Необходима авторизация",
      details: {},
    });
  }

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  const session = await prisma.session.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    cookieStore.delete(SESSION_COOKIE_NAME);

    return null;
  }

  const now = new Date();

  const shouldUpdateLastUsed =
    !session.lastUsedAt ||
    now.getTime() - session.lastUsedAt.getTime() >
      SESSION_LAST_USED_UPDATE_INTERVAL;

  if (shouldUpdateLastUsed) {
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        lastUsedAt: now,
      },
    });

    return {
      ...session,
      lastUsedAt: now,
    };
  }

  return session;
}

export async function createSession(userId: string) {
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const requestHeaders = await headers();

  const ipAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ??
    requestHeaders.get("x-real-ip") ??
    null;

  const userAgent = requestHeaders.get("user-agent");

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress,
      userAgent,
      lastUsedAt: new Date(),
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    const tokenHash = hashSessionToken(token);

    await prisma.session.deleteMany({
      where: {
        tokenHash,
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function deleteAllSessions(userId: string) {
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });

  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}
