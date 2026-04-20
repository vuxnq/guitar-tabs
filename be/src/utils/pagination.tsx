import type { Request } from "express";

export function getPagination(query: Request["query"], defaultLimit = 25) {
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : defaultLimit;
  
  const safeLimit = Math.min(limit, 50);
  const skip = (page - 1) * safeLimit;

  return { page, limit: safeLimit, skip, take: safeLimit };
}

export function paginateResponse<T>(data: T[], total: number, page: number, limit: number) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
