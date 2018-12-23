export const createSamplePaging = () => ({
  limit: 0,
  currentPage: 0,
  total: 0,
  totalPage: 0,
});

export const createSampleListing = () => ({
  isFetching: false,
  error: null,
  data: [],
  paging: createSamplePaging(),
});

export const createSampleResource = () => ({
  isFetching: false,
  error: null,
  data: null,
});

