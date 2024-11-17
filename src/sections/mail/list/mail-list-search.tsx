'use client';

import React, { useEffect, useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';
import { useNavigationSearchParams } from '@/hooks/use-navigation-search-params';
import { useDebouncedCallback } from 'use-debounce';
import LoadingCircle from '@/components/ui/loading-circle';
import { SearchFilter } from '@/types/filters';

interface MailListSearchProps {
  initialValue: string;
}

const MailListSearch: React.FC<MailListSearchProps> = ({ initialValue }) => {
  debugRendering('MailListSearch');

  const { t } = useTranslationClient('mail-list');
  const { changeSearchParams, removeSearchParams, searchParams } = useNavigationSearchParams();
  const [searchValue, setSearchValue] = useState(initialValue || '');
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeSearchParams = useDebouncedCallback((value: string) => {
    setIsSearching(true);
    if (!value) {
      removeSearchParams(SearchFilter);
    } else {
      changeSearchParams(SearchFilter, value);
    }
  }, 300);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    handleChangeSearchParams(value);
  };

  useEffect(() => {
    if ((searchParams.get(SearchFilter) || '') === searchValue) setIsSearching(false);
  }, [searchParams, searchValue]);

  return (
    <Input
      endAdornment={isSearching ? <LoadingCircle size={18} /> : <Search color='gray' size={18} />}
      placeholder={t(SearchFilter)}
      onChange={handleChange}
      value={searchValue}
    />
  );
};

export default MailListSearch;
