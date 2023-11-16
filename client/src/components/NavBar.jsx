import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Button from '@material-ui/core/Button'

const Navbar = () => {
  return (
    <nav>
        <Link to="/"><Button>Home</Button></Link>
        <Link to="/signin"><Button>Sign In</Button></Link>
        <Link to="/signup"><Button>Sign up</Button></Link>
    </nav>
  );
};

export default Navbar;