import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <h2>About Bansico</h2>
      <p>Bansico is a leading company specializing in generating certificates for successfully completed courses. We believe in recognizing and celebrating educational achievements.</p>
      <p>Our mission is to provide high-quality, verifiable certificates that showcase the skills and knowledge acquired by learners across various fields. With our state-of-the-art certificate generation system, we ensure that each certificate is unique, secure, and professionally designed.</p>
      <p>At Bansico, we partner with educational institutions, online learning platforms, and corporate training programs to deliver certificates that carry weight in the professional world. Our certificates serve as a testament to the hard work and dedication of learners, helping them advance in their careers and personal growth.</p>
    </div>
  );
};

export default AboutUs;