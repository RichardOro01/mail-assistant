'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useI18NContext } from '@/i18n/context';
import { languages } from '@/i18n/settings';
import { Check, Globe } from 'lucide-react';
import React from 'react';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useI18NContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {languages.map((lang) => (
          <DropdownMenuItem key={lang} className='flex justify-between' onClick={() => changeLanguage(lang)}>
            {lang}
            {lang === language && <Check width={16} height={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
