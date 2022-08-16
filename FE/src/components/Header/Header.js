import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import "@fontsource/poppins";
import './Header.css';


function Header() {
  const [open, setOpen] = useState(0);

  return (
    <nav className="navbar">
      <a href='/' className='logo'>
        <img className="Opensea-logo" src="https://nftwolf.io/wp-content/uploads/2021/09/opensea-logo.png"></img>
      </a>
      <ul className="navbar-nav">
        <NavItem openNum={1} open={open} setOpen={setOpen} icon='Explore'>
          <DropdownMenu menu={["Explore OpenSea NFTs", "Explore uploaded NFTs"]} href={["/", "/explore"]}></DropdownMenu>
        </NavItem>
        <NavItem openNum={2} open={open} setOpen={setOpen} icon='Create'>
          <DropdownMenu menu={["Minting", "Import an existing Contract"]} href={["/create/minting", "/create/import"]}></DropdownMenu>
        </NavItem>
        <NavItem openNum={3} open={open} setOpen={setOpen} icon='My Page'>
          <DropdownMenu menu={["My Account", "My Collections"]} href={["/my-account", "/my-collections/"]}></DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  );
}

function NavItem(props) {
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => {
        if(props.open === props.openNum){
          props.setOpen(0);
        }
        else{
          props.setOpen(props.openNum);
        }
      }}>
        {props.icon}
      </a>

      {(props.open === props.openNum) && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href={props.href} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </a>
    );
  }

  return (
    <div className={props.menu[0] === "My Account" ? "dropdown-last" : "dropdown"} style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem href={props.href[0]}>{props.menu[0]}</DropdownItem>
          <DropdownItem href={props.href[1]}>{props.menu[1]}</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
export default Header;