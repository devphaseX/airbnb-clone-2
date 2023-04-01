import './globals.css';
import { Navbar } from '../component/navbar/Navbar';
import { RegisterModal } from '../component/modals/RegisterModal';

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
          <RegisterModal />
          <Navbar />
        </>
        {children}
      </body>
    </html>
  );
}
