const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

export const getCertificates = async () => {
  const response = await fetch(`${API_URL}/certificates`);
  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }
  return response.json();
};

export const createCertificate = async (certificateData) => {
  const response = await fetch(`${API_URL}/certificates/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(certificateData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create certificate');
  }
  
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    // If it's not JSON, it's likely the PDF
    return {
      message: "Certificate created successfully",
      id: response.headers.get("X-Certificate-Id") // Assuming the backend sends the certificate ID in a header
    };
  }
};

export const downloadCertificate = async (id) => {
  const response = await fetch(`${API_URL}/certificates/${id}`, {
    headers: {
      'Accept': 'application/pdf',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to download certificate');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `certificate-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const deleteCertificate = async (id) => {
  const response = await fetch(`${API_URL}/certificates/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete certificate');
  }
};