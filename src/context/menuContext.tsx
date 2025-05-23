"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  isMobileMenuOpen: boolean;
  toogleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toogleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu, openMenu, closeMenu, isMobileMenuOpen, toogleMobileMenu, openMobileMenu, closeMobileMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};
