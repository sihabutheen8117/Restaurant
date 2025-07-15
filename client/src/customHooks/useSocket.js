// hooks/useSocket.js
"use client"

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (userType = 'user', userData = {}) => {

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [orders, setOrders] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const socketRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setConnectionStatus('connected');
      
      // Connect based on user type
      if (userType === 'admin') {
        newSocket.emit('admin-connect', userData);
      } else {
        newSocket.emit('user-connect', {
          userId: userData.userId || 'user_' + Date.now(),
          name: userData.name || 'User',
          ...userData
        });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setConnectionStatus('disconnected');
    });

    // Admin-specific events
    if (userType === 'admin') {
      newSocket.on('admin-connected', (data) => {
        console.log('Admin connected:', data);
        setConnectionStatus('admin-connected');
      });

      newSocket.on('order-received', (orderData) => {
        console.log('New order received from socket:', orderData);
        setOrders(prev => [orderData, ...prev]);
      });

      console.log("admin connected to the socket io")

      // newSocket.on('order-status-changed', (statusData) => {
      //   console.log('Order status changed:', statusData);
      //   setOrders(prev => prev.map(order => 
      //     order.orderId === statusData.orderId 
      //       ? { ...order, status: statusData.status }
      //       : order
      //   ));
      // });
    }

    // User-specific events
    if (userType === 'user') {
      newSocket.on('user-connected', (data) => {
        console.log('User connected:', data);
        setConnectionStatus('user-connected');
      });

      newSocket.on('order-confirmed', (data) => {
        console.log('Order confirmed:', data);
      });

      newSocket.on('order-status-updated', (statusData) => {
        console.log('Order status updated:', statusData);
        // Update local order status
        setOrders(prev => prev.map(order => 
          order.orderId === statusData.orderId 
            ? { ...order, status: statusData.status }
            : order
        ));
      });

      newSocket.on('admin-response', (responseData) => {
        console.log('Admin response:', responseData);
        // Handle admin response (show notification, etc.)
      });
    }

    // Error handling
    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('error');
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userType]);

  // Helper functions
  // const sendOrder = (orderData) => {
  //   if (socket && isConnected) {
  //     socket.emit('new-order', orderData);
  //   }
  // };

  // const updateOrderStatus = (orderId, status, userSocketId) => {
  //   if (socket && isConnected) {
  //     socket.emit('update-order-status', {
  //       orderId,
  //       status,
  //       userSocketId,
  //       timestamp: new Date()
  //     });
  //   }
  // };

  // const sendAdminResponse = (responseData) => {
  //   if (socket && isConnected) {
  //     socket.emit('admin-order-response', responseData);
  //   }
  // };

  return {
    socket,
    isConnected,
    orders,
    connectionStatus,
    // sendOrder,
    // updateOrderStatus,
    // sendAdminResponse,
    setOrders
  };
};