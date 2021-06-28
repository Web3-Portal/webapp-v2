import { ReactComponent as IconSync } from 'assets/icons/sync.svg';
import { ReactComponent as IconEarn } from 'assets/icons/earn.svg';
import { ReactComponent as IconVote } from 'assets/icons/vote.svg';
import { ReactComponent as IconFiat } from 'assets/icons/fiat.svg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuPrimaryItem } from 'elements/sidebar/menuPrimary/MenuPrimaryItem';

export interface BaseMenuItem {
  label: string;
  to: string;
}

export interface MenuItem extends BaseMenuItem {
  icon: JSX.Element;
  subMenu: BaseMenuItem[];
}

interface MenuPrimaryProps {
  isMinimized: boolean;
  setIsSidebarOpen?: Function;
}

const menu: MenuItem[] = [
  {
    label: 'Trade',
    to: '/',
    icon: <IconSync />,
    subMenu: [
      { label: 'Swap', to: '/' },
      { label: 'Tokens', to: '/tokens' },
    ],
  },
  {
    label: 'Earn',
    to: '/portfolio',
    icon: <IconEarn />,
    subMenu: [
      { label: 'Pools', to: '/pools' },
      { label: 'Portfolio', to: '/portfolio' },
    ],
  },
  {
    label: 'DAO',
    to: '/governance',
    icon: <IconVote />,
    subMenu: [
      { label: 'Governance', to: '/governance' },
      { label: 'Vote', to: '/vote' },
    ],
  },
  {
    label: 'Fiat',
    to: '/fiat',
    icon: <IconFiat />,
    subMenu: [],
  },
];

export const MenuPrimary = ({
  isMinimized,
  setIsSidebarOpen,
}: MenuPrimaryProps) => {
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setActiveNav(
      menu.findIndex(
        (x) =>
          location.pathname === x.to ||
          x.subMenu.some((sub) => sub.to === location.pathname)
      )
    );
  }, [location]);

  return (
    <nav className="mt-30">
      {menu.map((item, index) => {
        return (
          <MenuPrimaryItem
            key={index}
            {...item}
            isActive={activeNav === index}
            isMinimized={isMinimized}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        );
      })}
    </nav>
  );
};
