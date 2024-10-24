import React, { useState, useEffect } from 'react';
import { getCertificates } from '../services/api';
import CertificateItem from './CertificateItem';
import styles from './CertificateList.module.css';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setMessage(`Error fetching certificates: ${error.message}`);
    }
  };

  const handleCertificateCreated = (newCertificate) => {
    setCertificates([...certificates, newCertificate]);
    setMessage('Certificate created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = (id) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2>Certificates</h2>
      {message && <div className={message.includes('Error') ? styles.error : styles.success}>{message}</div>}
      <div className={styles.gridContainer}>
        {certificates.map(cert => (
          <CertificateItem 
            key={cert.id} 
            certificate={cert} 
            onDelete={handleDelete} 
            onMessage={handleMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificateList;