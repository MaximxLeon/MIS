import { NextResponse } from 'next/server';

import { requireSession } from '@/server/auth/session';
import { handleApiError } from '@/server/errors';
import { mapUserToResponse } from '@/server/user';

export async function GET() {
  try {
    const session = await requireSession();

    return NextResponse.json({
      user: mapUserToResponse(session.user),
    });
  } catch (error) {
    return handleApiError(error);
  }
}