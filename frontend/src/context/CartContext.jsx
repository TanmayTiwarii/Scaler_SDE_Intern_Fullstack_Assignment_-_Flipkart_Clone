import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth();

  // Load cart items and handle syncing
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          // Sync guest cart to user cart
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            if (parsedCart && parsedCart.length > 0) {
              // Upload guest items
              for (const item of parsedCart) {
                try {
                  await api.post('/cart/add', {
                    productId: item.id,
                    quantity: item.quantity
                  });
                } catch (e) {
                  console.error('Failed to sync guest cart item', e);
                }
              }
              // Clear guest cart once synced
              localStorage.removeItem('cartItems');
            }
          }
          
          const res = await api.get('/cart');
          setCartItems(res.data.cart);
        } catch (err) {
          console.error('Error fetching cart from server', err);
        }
      } else {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        } else {
          setCartItems([]);
        }
      }
    };
    fetchCart();
  }, [user, token]);

  // Sync to local storage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product) => {
    if (user) {
      try {
        await api.post('/cart/add', {
          productId: product.id,
          quantity: 1
        });
        // re-fetch state
        const res = await api.get('/cart');
        setCartItems(res.data.cart);
      } catch (err) {
        console.error('Error adding to cart on server', err);
      }
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        await api.delete(`/cart/${productId}`);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      } catch (err) {
        console.error('Error removing from cart on server', err);
      }
    } else {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return;
    if (user) {
      try {
        await api.put('/cart/update', { productId, quantity });
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      } catch (err) {
        console.error('Error updating quantity on server', err);
      }
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await api.delete('/cart');
        setCartItems([]);
      } catch (err) {
        console.error('Error clearing cart on server', err);
      }
    } else {
      setCartItems([]);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
