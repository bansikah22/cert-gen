import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadCertificate } from '../services/api';

const CertificateDownload = () => {
  const { id } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const download = async () => {
      setIsDownloading(true);
      try {
        await downloadCertificate(id);
      } catch (error) {
        console.error('Error downloading certificate:', error);
      } finally {
        setIsDownloading(false);
      }
    };
    download();
  }, [id]);

  return (
    <div>
      {isDownloading ? (
        <p>Downloading your certificate...</p>
      ) : (
        <p>Your download should begin shortly. If it doesn't, <button onClick={() => downloadCertificate(id)}>click here</button>.</p>
      )}
    </div>
  );
};

export default CertificateDownload;