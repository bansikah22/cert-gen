import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} Bansico. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/company/bansico" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/bansico" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com/bansico" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;