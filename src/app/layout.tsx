import './globals.css';
import { Navbar } from '../component/navbar/Navbar';
import { RegisterModal, LoginModal, RentModal } from '../component/modals';
import { ToastProvider } from '../component/ui/Toaster';
import { Categories } from '../component/ui/Categories';
import { ProfileProvider } from '../component/ProfileProvider/ProfileProvider';
import { getSession, SafeUser } from '@/lib/getSession';
import '../config/schema.env';
export const metadata = {};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  console.log({ user });
  return (
    <html lang="en">
      <body>
        <>
          <ToastProvider />
          <ProfileProvider user={user as SafeUser | null}>
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
