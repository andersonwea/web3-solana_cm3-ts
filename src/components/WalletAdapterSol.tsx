import React, {FC, ReactNode, useMemo} from 'react'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@mui/material";

import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter
}   from '@solana/wallet-adapter-wallets'
import '@solana/wallet-adapter-react-ui/styles.css'
import { clusterApiUrl } from '@solana/web3.js'

const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });


const WalletAdapterSol: FC<{ children: ReactNode}> = ({children}) => {
    const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork
    const endpoint = useMemo(() => clusterApiUrl(network), [network])
    //const endpoint = "https://metaplex.devnet.rpcpool.com/"

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new TorusWalletAdapter(),
    ], [])

    return (
        <ThemeProvider theme={theme}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                        <WalletModalProvider>{children}</WalletModalProvider>
                    </WalletDialogProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    )
}

export default WalletAdapterSol