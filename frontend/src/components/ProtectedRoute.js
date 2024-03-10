import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const ProtectedRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated !== "true") {
    return <Navigate to ="/login"/>
  }

  return children;
};

export default ProtectedRoute;
