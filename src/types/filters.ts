export const SearchFilter = 'search';
export const PageFilter = 'page';

export type EmailFilters = {
  [SearchFilter]: string;
  [PageFilter]: string;
};

export type EmailFiltersKeys = keyof EmailFilters;
