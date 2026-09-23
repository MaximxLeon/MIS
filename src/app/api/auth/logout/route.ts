import { NextResponse } from 'next/server';

import { deleteSession } from '@/server/auth/session';
import { handleApiError } from '@/server/errors';

export async function POST() {
  try {
    await deleteSession();

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
