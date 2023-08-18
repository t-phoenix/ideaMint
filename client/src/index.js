import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import mylogo from './assets/mylogo.svg';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai,  polygon, xdcTestnet, xdc } from 'wagmi/chains'

const chains = [xdcTestnet, xdc, polygonMumbai, polygon]

const projectId = 'e8c0411f89c933ea0d0a53571d544509'


const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

const root = ReactDOM.createRoot(document.getElementById('root'));

const w3mTheme = {
  '--w3m-accent-color': '#9bfb97',
  '--w3m-accent-fill-color': '#272e2e',
  // '--w3m-logo-image-url': mylogo,
  '--w3m-background-color': '#9bfb97',
  '--w3m-container-border-radius': '20px',
  '--w3m-button-border-radius': '20px'

}


root.render(
  <React.StrictMode>

    <WagmiConfig client={wagmiClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeVariables={w3mTheme} />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
