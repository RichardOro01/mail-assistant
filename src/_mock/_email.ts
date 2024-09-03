import { IConversation, IEmail } from '@/types/email';
import { subYears, subMonths, subHours, subMinutes, subDays } from 'date-fns';

export const _emails1: IEmail[] = [
  {
    id: '1',
    date: subMinutes(new Date(), 45),
    from: { name: 'Loe Doe', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  },
  {
    id: '2',
    date: subHours(new Date(), 4),
    from: { name: 'Loe Doe', email: 'y6BpC@example.com' },
    html: '<p>Pariatur occaecat aute sunt esse aliquip aliqua aute adipisicing id excepteur. Magna consequat reprehenderit magna officia consectetur irure. Ex culpa incididunt id aute sunt. Elit sint enim in nulla ea dolor ipsum officia. Ex ullamco occaecat id est aute est nulla ex veniam et cillum voluptate ex.</p>',
    text: 'Pariatur occaecat aute sunt esse aliquip aliqua aute adipisicing id excepteur. Magna consequat reprehenderit magna officia consectetur irure. Ex culpa incididunt id aute sunt. Elit sint enim in nulla ea dolor ipsum officia. Ex ullamco occaecat id est aute est nulla ex veniam et cillum voluptate ex.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _emails2: IEmail[] = [
  {
    id: '1',
    date: subHours(new Date(), 4),
    from: { name: 'John Doe', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _emails3: IEmail[] = [
  {
    id: '1',
    date: subDays(new Date(), 13),
    from: { name: 'John Doe', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _emails4: IEmail[] = [
  {
    id: '1',
    date: subMonths(new Date(), 6),
    from: { name: 'Anastasia', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _emails5: IEmail[] = [
  {
    id: '1',
    date: subMonths(new Date(), 13),
    from: { name: 'John Doe', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _emails6: IEmail[] = [
  {
    id: '1',
    date: subYears(new Date(), 3),
    from: { name: 'John Doe', email: 'b5YpC@example.com' },
    html: '<p>Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.</p>',
    text: 'Enim aliqua officia ad proident voluptate occaecat ex eiusmod commodo cillum. Sit in ut aliquip esse. Duis duis laborum labore officia et consequat excepteur. Est qui nostrud aute ad aliqua commodo irure nostrud.',
    to: [{ name: 'John Doe', email: 'b5YpC@example.com' }]
  }
];

export const _conversations: IConversation[] = [
  {
    id: '1',
    subject: 'MongoDB',
    emails: _emails1,
    tags: ['game', 'personal'],
    read: false
  },
  {
    id: '2',
    subject: 'Chess',
    emails: _emails2,
    tags: ['game', 'personal'],
    read: true
  },
  {
    id: '3',
    subject: 'Penetration',
    emails: _emails3,
    tags: ['game', 'work'],
    read: true
  },
  {
    id: '4',
    subject: 'Work',
    emails: _emails4,
    tags: ['game', 'work'],
    read: true
  }
];

export const _getConversationByID = (id: string | null) => {
  if (!id) return null;
  return _conversations.find((conversation) => conversation.id === id);
};
