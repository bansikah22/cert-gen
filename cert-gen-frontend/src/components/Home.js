import React from 'react';
import styles from './Home.module.css';
import ceoImage from './assests/me.jpeg';

const Home = ({ user }) => {
  const coOwners = [
    { 
      id: 1,
      name: 'John Doe', 
      role: 'CEO', 
      image: ceoImage,
      bio: 'John has over 20 years of experience in the tech industry and is passionate about revolutionizing certificate management.'
    },
    { 
      id: 2,
      name: 'Jane Smith', 
      role: 'CTO', 
      image: ceoImage,
      bio: 'Jane is a brilliant software architect with a knack for creating user-friendly and secure systems.'
    },
    { 
      id: 3,
      name: 'Mike Johnson', 
      role: 'CFO', 
      image: ceoImage,
      bio: 'Mike brings his financial expertise to ensure Bansico remains at the forefront of the certificate management industry.'
    },
  ];

  const productFeatures = [
    { id: 1, title: 'Secure Certificate Creation', description: 'Generate tamper-proof certificates with unique identifiers and advanced encryption.' },
    { id: 2, title: 'Customizable Templates', description: 'Choose from a wide range of professional templates or create your own to match your brand.' },
    { id: 3, title: 'Bulk Generation', description: 'Efficiently create multiple certificates for large groups or events.' },
    { id: 4, title: 'Verification Portal', description: 'Allow third parties to easily verify the authenticity of certificates issued through our system.' },
    { id: 5, title: 'Analytics Dashboard', description: 'Gain insights into certificate issuance and verification trends.' },
    { id: 6, title: 'Integration Capabilities', description: 'Seamlessly integrate with your existing systems through our robust API.' },
  ];

  return (
    <div className={styles.home}>
      <section className={styles.welcome}>
        <h1>Welcome to Bansico {user ? `, ${user.name}` : ''}</h1>
        <p>Your trusted partner in certificate generation and management.</p>
      </section>

      <section className={styles.product}>
        <h2>Our Product</h2>
        <p>
          Bansico offers a state-of-the-art certificate generation and management system, designed to meet the evolving needs of businesses and educational institutions. Our platform provides:
        </p>
        <div className={styles.featureGrid}>
          {productFeatures.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <p>
          With Bansico, you can streamline your certification process, enhance credibility, and focus on what matters most - recognizing achievements and fostering growth.
        </p>
      </section>

      <section className={styles.coOwners}>
        <h2>Meet Our Co-Owners</h2>
        <div className={styles.ownerGrid}>
          {coOwners.map((owner) => (
            <div key={owner.id} className={styles.ownerCard}>
              <img src={owner.image} alt={owner.name} className={styles.ownerImage} />
              <h3>{owner.name}</h3>
              <p className={styles.ownerRole}>{owner.role}</p>
              <p className={styles.ownerBio}>{owner.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;