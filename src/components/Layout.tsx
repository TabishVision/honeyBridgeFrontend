// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useLocalStorage } from '../hooks/useLocalStorage';
import { Switch } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { WalletContext } from '../contexts';
import SelectWalletModal from './SelectWalletModal';
import WalletHeader from './WalletHeader';

require('./Layout.css');

function Layout (): React.ReactElement<null> {
  const walletContext = useContext(WalletContext);
  const [theme, setTheme] = useLocalStorage('sub-wallet-theme', 'dark');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!walletContext.wallet && !walletContext.evmWallet) {
      navigate('/');
    }

    const isDark = theme === 'light';

    document.body.style.backgroundColor = isDark ? '#020412' : '#FFF';
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [theme, navigate, walletContext]);

  const _onChangeTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [setTheme, theme]);

  return (<div className={'main-layout '}>
    
    <div className={`main-content ${theme === 'dark' ? '-dark' : '-light'}`}>
      {/* <Switch
        checkedChildren='Light'
        className={(!!walletContext.wallet || !!walletContext.evmWallet) ? 'sub-wallet-switch-theme with-header' : 'sub-wallet-switch-theme'}
        defaultChecked={theme === 'light'}
        onChange={_onChangeTheme}
        unCheckedChildren='Dark'
      /> */}
      {/* <WalletHeader visible={!!walletContext.wallet || !!walletContext.evmWallet} /> */}
      <Outlet />
      <SelectWalletModal theme={theme} />
    </div>
  </div>);
}

export default Layout;
