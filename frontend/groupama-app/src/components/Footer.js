// A simple React footer

import React from 'react';
  
const Footer = () => (
  <footer className="footer">
    <div >
        &copy; {new Date().getFullYear()} Copyright:{' '} Groupomania.com
        
      </div>
  </footer>
);
  
export default Footer;