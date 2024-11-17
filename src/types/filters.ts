export const SearchFilter = 'search';

export type EmailFilters = {
  [SearchFilter]: string;
};

export type EmailFiltersKeys = keyof EmailFilters;
