import React from 'react';
import { downloadCertificate, deleteCertificate } from '../services/api';
import styles from './CertificateItem.module.css';

const CertificateItem = ({ certificate, onDelete, onMessage }) => {
  const handleDownload = async () => {
    try {
      await downloadCertificate(certificate.id);
      onMessage('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error downloading certificate:', error);
      onMessage(`Error downloading certificate: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCertificate(certificate.id);
      onDelete(certificate.id);
      onMessage('Certificate deleted successfully!');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      onMessage(`Error deleting certificate: ${error.message}`);
    }
  };

  return (
    <div className={styles.card}>
      <h3>{certificate.name}</h3>
      <p>Course: {certificate.course}</p>
      <p>Manufactured: {certificate.manufacturedDate}</p>
      <p>Expires: {certificate.expiryDate}</p>
      <div className={styles.buttonContainer}>
        <button onClick={handleDownload} className={styles.downloadButton}>Download PDF</button>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default CertificateItem;