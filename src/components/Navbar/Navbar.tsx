import { forwardRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { setOpen, reset } from '@/store/features/search/searchSlice';
import { selectCart } from '@/store/features/cart/cartSlice';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import Container from '@/components/Container/Container';
import SearchModal from '@/components/Search/SearchModal';
import FiltersModal from '@/components/Filters/FiltersModal';

import MenuIcon from '@/assets/svg/menu.svg?react';
import CloseIcon from '@/assets/svg/close.svg?react';

import styles from './Navbar.module.scss';

const Navbar = forwardRef<HTMLElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCloseSearch = () => {
    setShowSearch(false);
    dispatch(setOpen(false));
    dispatch(reset());
  };

  const handleOpenSearch = () => {
    setShowSearch(true);
    dispatch(setOpen(true));
    setIsMenuOpen(false);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const handleOpenFilters = () => {
    setShowFilters(true);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        ref={ref}
        className={`${styles.navbar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <Container>
          <div className={styles.inner}>
            <nav className={`${styles.left} ${isMenuOpen ? styles.open : ''}`}>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <button onClick={handleOpenSearch}>Search</button>
            </nav>
            <div className={styles.logo}>MINIMART</div>
            <nav className={`${styles.right} ${isMenuOpen ? styles.open : ''}`}>
              <NavLink
                to="/shop"
                style={{
                  textDecoration: items.length > 0 ? 'underline' : 'none',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </NavLink>
              <button onClick={handleOpenFilters}>Filters</button>
            </nav>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <MenuIcon />
            </button>
          </div>
        </Container>
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileLogo}>MINIMART</div>
              <button className={styles.closeButton} onClick={toggleMenu}>
                <CloseIcon />
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
              <button onClick={handleOpenSearch}>Search</button>
              <NavLink
                to="/shop"
                style={{
                  textDecoration: items.length > 0 ? 'underline' : 'none',
                }}
                onClick={toggleMenu}
              >
                Shop
              </NavLink>
              <button onClick={handleOpenFilters}>Filters</button>
            </nav>
          </div>
        )}
      </header>
      {showSearch && <SearchModal onClose={handleCloseSearch} />}
      {showFilters && <FiltersModal onClose={handleCloseFilters} />}
    </>
  );
});

export default Navbar;
