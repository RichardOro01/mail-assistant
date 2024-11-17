'use client';

import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { PaginationComponent } from '@/components/ui/pagination';
import { useNavigationSearchParams } from '@/hooks/use-navigation-search-params';
import { PageFilter } from '@/types/filters';

interface MailListPaginationProps {
  initialValue: number;
  totalPages: number;
}

const MailListPagination: React.FC<MailListPaginationProps> = ({ initialValue, totalPages }) => {
  debugRendering('MailListPagination');

  const { changeSearchParams } = useNavigationSearchParams();
  const [page, setPage] = useState(initialValue);

  const handleChangePage = (page: number) => {
    setPage(page);
    changeSearchParams(PageFilter, page.toString());
  };
  return <PaginationComponent currentPage={page} totalPages={totalPages} onPageChange={handleChangePage} />;
};

export default MailListPagination;
