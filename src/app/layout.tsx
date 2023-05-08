import './globals.css';
import { Navbar } from '../components/navbar/Navbar';
import { LoginModal } from '../components/modals/LoginModal';
import { RegisterModal } from '../components/modals/RegisterModal';
import { ToastProvider } from '../components/ui/Toaster';
import { ProfileProvider } from '../components/ProfileProvider/ProfileProvider';
import { Categories } from '@/components/ui/Categories';
import { RentModal } from '@/components/modals';
import '../data/env/validation/env.schema.zod';
import { getSession, SafeUser } from '@/action/getSession';
export const metadata = { title: 'Airbnb' };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <>
          <ToastProvider />
          <ProfileProvider user={(session?.user as SafeUser) ?? null}>
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <Navbar />
            <Categories />
          </ProfileProvider>
          <div className="pb-20 pt-28">{children}</div>
        </>
        {children}
      </body>
    </html>
  );
}

[
  { icon: 'https://icon.something.com/board', message: 'Something has happen' },
  { icon: 'https://icon.something.com/board', message: 'Something has happen' },
  { icon: 'https://icon.something.com/board', message: 'Something has happen' },
  { icon: 'https://icon.something.com/board', message: 'Something has happen' },
  { icon: 'https://icon.something.com/board', message: 'Something has happen' },
].map(({ icon, message }) => <Card icon={icon} message={message} />);

interface CardProps {
  icon: string;
  message: string;
}

function Card({ icon, message }: CardProps) {
  return (
    <li>
      <div>
        <img src={icon} alt="image" />
      </div>
      <div>
        <p>{message}</p>
      </div>
    </li>
  );
}
