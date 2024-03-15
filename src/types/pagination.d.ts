interface Pagination<Data> {
  data: Data[];
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
  lastPage: number;
  total: number;
}

interface PaginationPayload {
  page?: number;
  size?: number;
  sort?: string;
  dir?: string;
  search?: string;
  tab?: string;
}
