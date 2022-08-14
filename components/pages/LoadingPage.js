import React from 'react';

export default function LoadingPage() {
  return <div style={loadingStyles}>Loading ...</div>;
}

const loadingStyles = {
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
