import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next-instance';

interface ContentProviderProps {
  defaultNS: string;
  children: ReactNode;
}

const ContentProvider: React.FC<ContentProviderProps> = ({
  defaultNS,
  children,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('i18next Error:', error);
      setError('An error occurred while loading translations.');
    };

    i18n.on('failedLoading', handleError);

    return () => {
      i18n.off('failedLoading', handleError);
    };
  }, []);

  if (error) {
    return <div>{error}</div>; // Render the error message
  }

  return (
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
      <Suspense fallback={<div>Loading translations...</div>}>
        {children}
      </Suspense>
    </I18nextProvider>
  );
};

export { ContentProvider };
