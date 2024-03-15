export function setParam(
  params: URLSearchParams,
  key: string,
  value?: string | number | null,
) {
  if (value) {
    params.set(key, String(value));
  } else {
    params.delete(key);
  }
}

export function getPaginationPayload(searchParams: SearchParamsString) {
  return {
    page: Number(searchParams.page) || 1,
    size: Number(searchParams.size) || 10,
    search: searchParams.search,
    sort: searchParams.sort,
    dir: searchParams.dir,
    tab: searchParams.tab,
  };
}
