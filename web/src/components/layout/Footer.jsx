import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { getFooterHTML, getLogo, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName();
  const logo = getLogo();
  const [statusState] = useContext(StatusContext);
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const currentYear = new Date().getFullYear();

  const customFooter = useMemo(
    () => (
      <footer className='relative h-auto py-16 px-6 md:px-24 w-full flex flex-col items-center justify-between overflow-hidden'>
        <div className='absolute hidden md:block top-[204px] left-[-100px] w-[151px] h-[151px] rounded-full bg-[#FFD166]'></div>
        <div className='absolute md:hidden bottom-[20px] left-[-50px] w-[80px] h-[80px] rounded-full bg-[#FFD166] opacity-60'></div>

        <div className='flex flex-col md:flex-row items-center justify-between w-full max-w-[1110px] gap-6'>
          <div className='flex items-center gap-4'>
            {isDemoSiteMode && (
              <img
                src={logo}
                alt={systemName}
                className='w-12 h-12 rounded-full bg-gray-800 p-1.5 object-contain'
              />
            )}
            <Typography.Text className='text-sm !text-semi-color-text-1'>
              © {currentYear} {systemName}
            </Typography.Text>
          </div>
        </div>
      </footer>
    ),
    [logo, systemName, currentYear, isDemoSiteMode],
  );

  useEffect(() => {
    loadFooter();
  }, []);

  return (
    <div className='w-full'>
      {footer ? (
        <div
          className='custom-footer'
          dangerouslySetInnerHTML={{ __html: footer }}
        ></div>
      ) : (
        customFooter
      )}
    </div>
  );
};

export default FooterBar;


