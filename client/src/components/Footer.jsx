import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#222',
      color: '#fff',
      padding: '10px',  // Reduced padding
      textAlign: 'center',
      position: 'relative',
      bottom: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    }}>

      {/* Location Section */}
      <div style={{ flex: '1', margin: '5px', minWidth: '250px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF9800' }}>Location</h3>
        <p style={{ fontSize: '14px', color: '#8BC34A' }}>Super Market, 456 Market Street, City, Country</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.120730929308!2d77.57303684481633!3d11.277562672451001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96d661db84bdd%3A0xceccb22a93bf1188!2sPerundurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1740386384921!5m2!1sen!2sin"
          width="250"
          height="150"
          style={{ border: '0', marginTop: '5px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Follow Us Section */}
      <div style={{ flex: '1', margin: '5px', minWidth: '250px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF5722' }}>Follow Us</h3>
        <a href="https://www.instagram.com/supermarket"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#C13584', margin: '0 5px', textDecoration: 'none', fontSize: '14px' }}>
          Instagram
        </a>
        <a href="https://wa.me/19876543210"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#25D366', margin: '0 5px', textDecoration: 'none', fontSize: '14px' }}>
          WhatsApp
        </a>
        <a href="https://www.facebook.com/supermarket"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#1877F2', margin: '0 5px', textDecoration: 'none', fontSize: '14px' }}>
          Facebook
        </a>
        <a href="https://twitter.com/supermarket"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#1DA1F2', margin: '0 5px', textDecoration: 'none', fontSize: '14px' }}>
          Twitter
        </a>
      </div>

      {/* Contact & Copyright Section */}
      <div style={{ flex: '1', margin: '5px', minWidth: '250px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF9800' }}>Contact Information</h3>
        <p style={{ fontSize: '14px', color: '#4CAF50' }}><strong>Contact:</strong> +1 (987) 654-3210</p>
        <p style={{ fontSize: '14px', color: '#E91E63' }}><strong>Email:</strong> support@supermarket.com</p>

        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8b400' }}>
          &copy; {new Date().getFullYear()} Super Market. All rights reserved.
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
