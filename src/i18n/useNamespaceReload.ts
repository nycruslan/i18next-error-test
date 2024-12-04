import { useEffect } from 'react';
import { type i18n as I18nInstance } from 'i18next';

const useNamespaceReload = (namespace: string, i18n: I18nInstance) => {
  useEffect(() => {
    if (!i18n.hasResourceBundle(i18n.language, namespace)) {
      i18n.reloadResources(i18n.language, namespace); // Force reload the namespace
    }
  }, [namespace, i18n]);

  return `${i18n.language}|${namespace}`;
};

export default useNamespaceReload;
