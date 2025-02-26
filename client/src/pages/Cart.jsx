import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Cart = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [cart, setCart] = useState([]);
  const razorpayKey = "rzp_test_XbIlUvUdWP4TMK"; // Your Razorpay key

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script after component unmount
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      localStorage.removeItem('cart');
      setCart([]);
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#121212', minHeight: '80vh' }}>
        <p style={{ fontSize: '18px', color: '#28a745' }}>Loading user status...</p>
      </div>
    );
  }

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Razorpay Payment Handler
  const handlePayment = () => {
    if (window.Razorpay) {
      const options = {
        key: razorpayKey, // Your Razorpay key
        amount: totalPrice * 100, // amount in paise (Razorpay expects amount in paise)
        currency: 'INR',
        name: 'Your Store',
        description: 'Purchase from your store',
        image: 'https://example.com/logo.png', // Optional: logo image URL
        handler: function (response) {
          console.log("Payment Response:", response);
          alert("Payment Successful!");
          // You can send this response to your server for verification and order processing
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9876543210',
        },
        notes: {
          address: 'Hello World',
        },
        theme: {
          color: '#28a745',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Razorpay script not loaded!');
      alert('Razorpay script not loaded correctly.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: '#e0e0e0', minHeight: '80vh' }}>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '24px', marginBottom: '10px', color: '#fff' }}>🛒 Your cart is empty!</p>
          <p style={{ fontSize: '18px', color: '#bbb', marginBottom: '20px' }}>
            It looks like you haven't added any products yet.
          </p>
          <p style={{ fontSize: '20px', color: '#e0e0e0' }}>
            Why not <span role="img" aria-label="shopping">🛍️</span> explore our products and add some items?
          </p>
          <Link to="/products">
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: '#121212',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '20px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index} // Use index if item.id is not available
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '1rem',
                borderBottom: '1px solid #333',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  marginRight: '1rem',
                  borderRadius: '8px',
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#e0e0e0' }}>{item.name}</h3>
                <p style={{ margin: 0, fontSize: '16px', color: '#bbb' }}>
                  Rs. {item.price} x {item.qty}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(index)} // Pass the index for removal
                style={{
                  background: '#d9534f',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <h3 style={{ textAlign: 'right', color: '#e0e0e0', marginTop: '20px' }}>
            Total: Rs. {totalPrice.toFixed(2)}
          </h3>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button
              onClick={handlePayment}
              style={{
                background: '#28a745',
                color: '#121212',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
