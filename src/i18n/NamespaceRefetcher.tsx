import { useEffect, useRef } from 'react';
import { type i18n as I18nInstance } from 'i18next';

interface NamespaceRefetcherProps {
  i18n: I18nInstance;
}

const NamespaceRefetcher = ({ i18n }: NamespaceRefetcherProps) => {
  const reloadedNamespaces = useRef(new Set<string>()); // Track reloaded namespaces

  useEffect(() => {
    const backendConnector = i18n.services.backendConnector;

    if (!backendConnector) return;

    const getFailedNamespaces = () =>
      Object.entries(backendConnector.state || {})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, status]) => status === 0) // Failed state
        .map(([key]) => key.split('|')[1]); // Extract namespace

    const reloadNamespaces = (namespaces: string[]) => {
      namespaces.forEach((namespace) => {
        if (!reloadedNamespaces.current.has(namespace)) {
          reloadedNamespaces.current.add(namespace); // Mark as reloaded
          i18n.reloadResources(i18n.language, namespace); // Reload
        }
      });
    };

    // Initial reload of failed namespaces
    reloadNamespaces(getFailedNamespaces());

    // Handle individual namespace failures dynamically
    const handleFailedLoading = (namespace: string) => {
      if (
        backendConnector.state[`${i18n.language}|${namespace}`] === 0 && // Still failed
        !reloadedNamespaces.current.has(namespace)
      ) {
        reloadNamespaces([namespace]);
      }
    };

    i18n.on('failedLoading', handleFailedLoading);

    return () => {
      i18n.off('failedLoading', handleFailedLoading);
    };
  }, [i18n]);

  return null;
};

export default NamespaceRefetcher;
