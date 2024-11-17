'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

interface PaginationItemProps extends React.ComponentProps<'li'> {
  disabled?: boolean;
}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, disabled, ...props }, ref) => (
    <li ref={ref} className={clsx(cn('', className), { 'pointer-events-none opacity-75': disabled })} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  LinkProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'size'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label='Go to previous page' size='default' className={cn('gap-1 pl-2.5', className)} {...props}>
    <ChevronLeft className='h-4 w-4' />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label='Go to next page' size='default' className={cn('gap-1 pr-2.5', className)} {...props}>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

interface PaginationComponentProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onPageChange }) => {
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const centerPages =
    totalPages === 5
      ? [3]
      : totalPages === 6
        ? [3, 4]
        : currentPage >= 5
          ? currentPage >= totalPages - 3
            ? [totalPages - 4, totalPages - 3, totalPages - 2]
            : [currentPage - 1, currentPage, currentPage + 1]
          : [3, 4, 5];

  const PaginationPage = ({ page }: { page: number }) => {
    return (
      <PaginationItem onClick={() => onPageChange(page)}>
        <PaginationLink isActive={currentPage === page} href='#'>
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <PaginationPrevious href='#' />
        </PaginationItem>
        <PaginationPage page={1} />
        {totalPages >= 2 && (
          <>
            {currentPage >= 5 && totalPages >= 8 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationPage page={2} />
            )}
          </>
        )}
        {totalPages >= 5 && (
          <>
            {centerPages.map((page) => (
              <PaginationPage key={page} page={page} />
            ))}
          </>
        )}

        {totalPages >= 4 && (
          <>
            {currentPage <= totalPages - 4 && totalPages >= 8 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationPage page={totalPages - 1} />
            )}
          </>
        )}
        {totalPages >= 3 && <PaginationPage page={totalPages} />}
        <PaginationItem disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationComponent
};
