'use client';
import { Container, Logo } from '../ui';
import { Search } from './Search';
import { UserMenu } from './UserMenu';

const Navbar = () => (
  <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-sm">
    <div className="py-4 border-b-[1px] ">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>
    </div>
  </div>
);

export { Navbar };