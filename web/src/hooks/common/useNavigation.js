import { useMemo } from 'react';

export const useNavigation = (t, headerNavModules) => {
  const mainNavLinks = useMemo(() => {
    const defaultModules = {
      console: true,
      pricing: true,
    };

    const modules = headerNavModules || defaultModules;

    const allLinks = [
      {
        text: t('控制台'),
        itemKey: 'console',
        to: '/console',
      },
      {
        text: t('模型广场'),
        itemKey: 'pricing',
        to: '/pricing',
      },
    ];

    return allLinks.filter((link) => {
      if (link.itemKey === 'pricing') {
        return typeof modules.pricing === 'object'
          ? modules.pricing.enabled
          : modules.pricing;
      }
      return modules[link.itemKey] === true;
    });
  }, [t, headerNavModules]);

  return {
    mainNavLinks,
  };
};
