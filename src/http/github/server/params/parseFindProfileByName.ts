export const parseFindProfileByName = (searchParams: URLSearchParams) => {
  return {
    status: searchParams.get('username') ?? '',
  };
};
