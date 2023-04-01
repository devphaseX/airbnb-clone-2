import './globals.css';
import { Navbar } from '../component/navbar/Navbar';
import { RegisterModal } from '../component/modals/RegisterModal';
import { ToastProvider } from '../component/ui/Toaster';

export const metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>
          <ToastProvider />
          <RegisterModal />
          <Navbar />
        </>
        {children}
      </body>
    </html>
  );
}
