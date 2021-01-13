import React, { Fragment } from 'react';
import '../Header/Header.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// Import action
import { dangXuatAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { userLogin } from '../../config/setting';
// Use material library
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function Header(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const taiKhoan = useSelector(
    (state) => state.QuanLyNguoiDungReducer.taiKhoan
  );

  const dispatch = useDispatch();

  const LogOut = () => {
    dispatch(dangXuatAction());
  };
  const renderMenuControl = () => {
    // Nếu account có quyền Admin
    if (
      JSON.parse(localStorage.getItem(userLogin)).maLoaiNguoiDung === 'QuanTri'
    ) {
      return (
        <MenuItem onClick={handleClose}>
          <NavLink
            to='/dashboard'
            style={{ textDecoration: 'none', color: '#222' }}
          >
            <i className='fa fa-user mr-1'></i>
            Admin
          </NavLink>
        </MenuItem>
      );
    } else {
      return null;
    }
  };
  const renderLogin = () => {
    if (taiKhoan) {
      return (
        <Fragment>
          <div
            className='login__link'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          >
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhaoenSOpLdyff66kLuweUoEFOE_DMmdBRFQ&usqp=CAU'
              alt='user'
            />
            <span className='login__text'>{taiKhoan}</span>
          </div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                    >
                      {renderMenuControl()}
                      <MenuItem onClick={handleClose}>
                        <NavLink
                          to='/profile'
                          style={{ textDecoration: 'none', color: '#222' }}
                        >
                          <i className='fa fa-user mr-1'></i>
                          Profile
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={LogOut}>
                        <i className='fa fa-sign-out-alt mr-1'></i>Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      );
    }
    return (
      <NavLink className='login__link' to='/login'>
        <img
          src='https://cdn.onlinewebfonts.com/svg/img_388254.png'
          alt='user'
        />
        <span className='login__text'>Đăng Nhập</span>
      </NavLink>
    );
  };
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light bg-nav'>
        <div className='navbar-brand'>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <img src='https://i.imgur.com/Ct0rm5H.png' alt='logo' />
            <span className='text-logo'></span>
          </NavLink>
        </div>
        <div className='header__mobile'>
          <div className='header__login'>{renderLogin()}</div>
        </div>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <i className='fa fa-film'></i>
              <NavLink className='nav-link' to='/allmovie'>
                Phim
              </NavLink>
            </li>
            <li className='nav-item'>
              <i class='fas fa-layer-group'></i>

              <NavLink className='nav-link' to='/clustercinema'>
                Cụm Rạp
              </NavLink>
            </li>
            <li className='nav-item'>
              <i class='far fa-newspaper'></i>
              <NavLink className='nav-link' to='/news'>
                Tin Tức
              </NavLink>
            </li>
            <li className='nav-item'>
              <i class='fas fa-mobile-alt'></i>
              <NavLink className='nav-link' to='/#forMobile'>
                Ứng dụng
              </NavLink>
            </li>
          </ul>
          <div className='header__login'>{renderLogin()}</div>
        </div>
      </nav>
    </header>
  );
}
