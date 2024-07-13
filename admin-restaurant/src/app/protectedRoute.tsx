import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = ({WrappedComponent}:any) => {
  return (props:any) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated !== 'true') {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
