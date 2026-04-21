export type Artist = {
  id: number;
  name: string;
  releases?: Release[];
};

export type Release = {
  id: number;
  title: string;
  artistId: number;
  artist?: Artist;
  tracks?: Track[];
};

export type Track = {
  id: number;
  title: string;
  releaseId: number;
  release: Release;
  tabs?: Tab[];
};

export type Tab = {
  id: number;
  content: string;
  author: string;
  trackId: number;
  track?: Track;
  createdAt: Date;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
