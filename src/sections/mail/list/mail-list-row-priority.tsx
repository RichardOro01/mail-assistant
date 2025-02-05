import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { MessagePriorityType } from '@/types/ai';

interface MailListRowPriorityProps {
  priority: MessagePriorityType;
}

const MailListRowPriority: React.FC<MailListRowPriorityProps> = ({ priority }) => {
  debugRendering('MailListRowPriority');
  return <div>{priority}</div>;
};

export default MailListRowPriority;
