import MailLayout from '@/sections/mail/mail-layout';
import MailProvider from '@/sections/mail/provider/mail-provider';
import { LayoutBaseProps } from '@/types/utils';

const Layout = ({ children }: LayoutBaseProps) => {
  return (
    <MailProvider>
      <MailLayout>{children}</MailLayout>
    </MailProvider>
  );
};

export default Layout;
