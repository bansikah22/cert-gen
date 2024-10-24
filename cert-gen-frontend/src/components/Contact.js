import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Get in touch with Bansico through any of the following channels:</p>
      <ul className={styles.contactList}>
        <li>
          <strong>Phone:</strong> +1 (555) 123-4567
        </li>
        <li>
          <strong>Email:</strong> info@bansico.com
        </li>
        <li>
          <strong>Address:</strong> 123 Certificate Way, Education City, 12345
        </li>
      </ul>
      <div className={styles.socialLinks}>
        <h3>Connect with us on social media:</h3>
        <a href="https://www.linkedin.com/company/bansico" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/bansico" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://twitter.com/bansico" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </div>
  );
};

export default Contact;