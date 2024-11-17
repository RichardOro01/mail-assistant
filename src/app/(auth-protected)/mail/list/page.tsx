import { debugRendering } from '@/lib/debug';
import MailListView from '@/sections/mail/list/mail-list-view';
import { EmailFilters } from '@/types/filters';
import React from 'react';

interface MailListProps {
  searchParams: EmailFilters;
}

const MailList: React.FC<MailListProps> = ({ searchParams: filters }) => {
  debugRendering('MailList');
  return <MailListView {...{ filters }} />;
};

export default MailList;
