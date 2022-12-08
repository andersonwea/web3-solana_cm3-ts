import React, { useMemo } from 'react'
import MintButton from './MintButton'
import WalletAdapterSol from './WalletAdapterSol'
//import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { Connection } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

let error: string | undefined = undefined

const getCandyMachineId = (): string => {
    if (!process.env.REACT_APP_CANDY_MACHINE_ID) {
        error = "Missing Candy Machine ID value in .env file"
        throw new Error(error)
    }
    return process.env.REACT_APP_CANDY_MACHINE_ID as string
}

const getNetwork = (): string => {
    if (!process.env.REACT_APP_SOLANA_NETWORK) {
        error = "Missing Solana Network in .env file"
        throw new Error(error)
    }
    return process.env.REACT_APP_SOLANA_NETWORK as string
}

const getRpcHost = (): string => {
    if (!process.env.REACT_APP_SOLANA_RPC_HOST) {
        error = "Missing RPC Host in .env file"
        throw new Error(error)
    }
    return process.env.REACT_APP_SOLANA_RPC_HOST as string
}


const UseMintSolana = () => {
    let candyMachineId: string = ""
    let connection: Connection | null = null
    let rpcHost: string = ""
    let network: WalletAdapterNetwork = "devnet" as WalletAdapterNetwork
    let isError = false

    try {
        isError = false
        candyMachineId = getCandyMachineId()
        network = getNetwork() as WalletAdapterNetwork
        rpcHost = getRpcHost()

        connection = new Connection(rpcHost)

    } catch (e) {
        isError = true
        console.error(e)
    }


    const toRender = isError ? (
        <div style={{
            width: '100%',
            marginTop: '20%',
            textAlign: 'center',
            color: 'white'
        }}>
            {error}
        </div>    
    ) : (
        <WalletAdapterSol>  
        <MintButton
        candyMachineId={candyMachineId}
        connection={connection as Connection}
        txTimeout={500000}
        rpcHost={rpcHost}
        network={network}
        error={error}
        />
        </WalletAdapterSol>
    )

  return (
    <div>{ toRender }</div>
  )
}

export default UseMintSolana