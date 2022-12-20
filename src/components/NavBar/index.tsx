import { Dispatch, useState } from 'react';
import NavProfile from '../Root/NavProfile';
import { NavLogo, NavSpace, StyledArrow, StyledNavBar } from './index.style';
import { ServiceType } from './NavBar.type';
import NavSelector from './NavSelector';
import logoHorizontal from '../../assets/logo-horizontal.svg';

// Components
const Arrow = () => <StyledArrow>{'>'}</StyledArrow>;
const Logo = () => <img src={logoHorizontal} alt="개더링" />;

interface NavProps {
  serviceName: ServiceType;
  setServiceName: Dispatch<ServiceType>;
}

function NavBar({ serviceName, setServiceName }: NavProps) {
  const [isPending, setIsPending] = useState(false);
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <StyledNavBar>
        <NavLogo>
          <Logo />
        </NavLogo>
        <div className="service-name">
          <button
            className="nav-button"
            type="button"
            onClick={() => setShowNav((prev) => !prev)}
          >
            <Arrow />
            <span>{serviceName}</span>
          </button>
        </div>
        <NavSelector
          setServiceName={setServiceName}
          setIsPending={setIsPending}
          showNav={showNav}
          setShowNav={setShowNav}
        />
        <NavProfile />
      </StyledNavBar>
      <NavSpace />
    </>
  );
}

export default NavBar;
