import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
};

export default HomePage;
