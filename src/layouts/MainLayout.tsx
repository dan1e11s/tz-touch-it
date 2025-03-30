import { useRef, useEffect, useState, ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <Navbar ref={navbarRef} />
      <main style={{ paddingTop: navbarHeight }}>{children}</main>
    </>
  );
};

export default MainLayout;
