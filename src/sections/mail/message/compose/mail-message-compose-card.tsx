import MailMessageComposeFormContainer from './mail-message-compose-form-container';

const MailMessageComposeCard: React.FC = () => {
  return (
    <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px] w-full h-fit'>
      <MailMessageComposeFormContainer />
    </div>
  );
};

export default MailMessageComposeCard;
