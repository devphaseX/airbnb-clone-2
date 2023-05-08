'use client';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export { ClientOnly };
