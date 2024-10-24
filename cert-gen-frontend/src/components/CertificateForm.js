import React, { useState } from 'react';
import { createCertificate } from '../services/api';
import styles from './CertificateForm.module.css';

const CertificateForm = ({ onCertificateCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    manufacturedDate: '',
    expiryDate: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCertificate(formData);
      if (result.id) {
        onCertificateCreated(result);
        setMessage('Certificate created successfully!');
      } else {
        setMessage('No ID returned. Check certificates list.');
      }
      setFormData({
        name: '',
        course: '',
        manufacturedDate: '',
        expiryDate: '',
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      setMessage(`Error creating certificate: ${error.message}`);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.formContainer}>
      {message && <div className={message.includes('Error') ? styles.error : styles.success}>{message}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="course" className={styles.label}>Course</label>
          <input
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="manufacturedDate" className={styles.label}>Manufactured Date</label>
          <input
            id="manufacturedDate"
            name="manufacturedDate"
            type="date"
            value={formData.manufacturedDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expiryDate" className={styles.label}>Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Create Certificate</button>
      </form>
    </div>
  );
};

export default CertificateForm;