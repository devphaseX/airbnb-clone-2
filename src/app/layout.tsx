import './globals.css';
import { Navbar } from '../components/navbar/Navbar';
import { LoginModal } from '../components/modals/LoginModal';
import { RegisterModal } from '../components/modals/RegisterModal';
import { ToastProvider } from '../components/ui/Toaster';
import { ProfileProvider } from '../components/ProfileProvider/ProfileProvider';
import { getSession, SafeUser } from '@/lib/getSession';
import '../config/schema.env';
import { Categories } from '@/components/ui/Categories';
import { RentModal } from '@/components/modals';
import '../data/validations';
export const metadata = {};

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
        </>
        {children}
      </body>
    </html>
  );
}
