'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { MessagePriorityType } from '@/types/ai';
import { AlertCircle, AlertTriangle, CheckCircle2, Frown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LoadingCircle from '@/components/ui/loading-circle';
import { useTranslationClient } from '@/i18n/client';

interface MailListRowPriorityProps {
  priority: MessagePriorityType | 'loading';
}

const getPriorityIcon = (priority: MailListRowPriorityProps['priority']) => {
  switch (priority) {
    case 'high':
      return <AlertCircle className='w-5 h-5 text-red-500' />;
    case 'medium':
      return <AlertTriangle className='w-5 h-5 text-yellow-500' />;
    case 'low':
      return <CheckCircle2 className='w-5 h-5 text-green-500' />;
    case 'none':
      return <Frown className='w-5 h-5 text-gray-500' />;
    case 'loading':
      return <LoadingCircle />;
  }
};

const MailListRowPriority: React.FC<MailListRowPriorityProps> = ({ priority }) => {
  debugRendering('MailListRowPriority');
  const { t } = useTranslationClient('priority');
  return (
    <div className='flex items-center space-x-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={(e) => e.stopPropagation()}>{getPriorityIcon(priority)}</TooltipTrigger>
          <TooltipContent>
            <p>{t(`${priority}_explain`)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Badge variant={priority === 'high' ? 'destructive' : 'outline'} className='w-full justify-center'>
        {t(priority !== 'loading' ? priority : 'priority')}
      </Badge>
    </div>
  );
};

export default MailListRowPriority;
