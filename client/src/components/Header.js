import React from 'react'
import logo from '../assets/logo.svg';

const Header = () => {
  return (
    <div style={{ display: 'flex', padding: '5px', backgroundColor: '#3db0f7', justifyContent: 'space-around', alignContent: 'center', position: 'sticky', top: 0 }}>
      <div>
        <img src={logo} alt={'img'} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <a href='/create' style={{ color: 'white', fontSize: '14px', fontWeight: 500, marginRight: '20px', cursor: 'pointer', textDecoration: 'none' }}>Create Form</a>
        <a href='/' style={{ color: 'white', fontSize: '14px', fontWeight: 500, marginRight: '20px', cursor: 'pointer', textDecoration: 'none' }}>View Forms</a>
      </div>
    </div>
  )
}

export default Header;