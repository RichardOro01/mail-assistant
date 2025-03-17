'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { useMailContext } from '../provider/hooks';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useTranslationClient } from '@/i18n/client';
import MailListSummary from './mail-list-summary';
import clsx from 'clsx';

const MailListTableSelection: React.FC = () => {
  debugRendering('MailListTableSelection');

  const { t } = useTranslationClient('mail-list');
  const { selectedMailsCheckbox, isAllSelectedMailCheckbox, selectAllMailCheckbox, deselectAllMailCheckbox } =
    useMailContext();

  const handleCheckAll = (checked: CheckedState) => (checked ? selectAllMailCheckbox() : deselectAllMailCheckbox());

  return (
    <div
      className={clsx(
        'flex justify-start items-center gap-4 pl-5 pr-4 sticky top-0 z-10 border-slate-200 transition-all overflow-hidden',
        {
          'h-0 pb-0': !selectedMailsCheckbox.length,
          'pb-2 border-b': !!selectedMailsCheckbox.length
        }
      )}>
      <div className='flex items-center gap-2'>
        <Checkbox checked={isAllSelectedMailCheckbox()} onCheckedChange={handleCheckAll} />
        {selectedMailsCheckbox.length} {selectedMailsCheckbox.length === 1 ? t('selected') : t('many_selected')}
      </div>
      <div>
        <MailListSummary />
      </div>
    </div>
  );
};

export default MailListTableSelection;
