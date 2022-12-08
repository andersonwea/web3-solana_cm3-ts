import { useCallback, useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'

import styled from 'styled-components'
import Button from "@mui/material/Button";

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import { CandyMachineState, getCandyMachineState, mint, NFT, getNftPrice } from './candy-machine'


export interface MintButtonProps {
  candyMachineId: string;
  connection: Connection;
  txTimeout: number;
  rpcHost: string;
  network: WalletAdapterNetwork;
  error: string | undefined;
}

const MintButton = (props: MintButtonProps) => {
  const anchorWallet = useAnchorWallet();
  const { connect, connected, publicKey, wallet } = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineState>();
  const [nft, setNft] = useState<NFT>();
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [error, setError] = useState("");

  const metaplex = new Metaplex(props.connection);

  const refreshCandyMachineState = useCallback(
    async() => {
      if (!publicKey) {
        return;
      }

      const candyMachine = await getCandyMachineState(metaplex, new PublicKey(props.candyMachineId));
      setCandyMachine(candyMachine);
    },
    [anchorWallet, props.candyMachineId, props.rpcHost]
  );

  const getMintButtonContent = () => {
    if (!candyMachine) {
      return "Loading...";
    }

    if (isUserMinting) {
      return "Minting in progress..."
    } else if (candyMachine.itemsRemaining === 0 ) {
      return "Sold out"
    } else {
      return "Mint"
    }
  }

  const mintButtonClicked = async () => {
    setIsUserMinting(true);

    metaplex.use(walletAdapterIdentity(wallet!.adapter));
    const nft = await mint(metaplex, candyMachine!, "OG");

    if (nft) {
     
      setNft(nft);
    } else {
   
      // setError("Minting unsuccessful!");
    }
    
    setIsUserMinting(false);
    refreshCandyMachineState();
  }
  useEffect(() => {
    refreshCandyMachineState()
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ]);

  useEffect(() => {
    (function loop() {
      setTimeout(() => {
        refreshCandyMachineState();
        loop();
      }, 20000);
    })();
  }, [refreshCandyMachineState]);
 
  return (
    <div>
      <div>
        <div>
          {error || props.error ? (
            <span>
              {error || props.error}
            </span>
          ) : undefined}
          {!connected ? (
            <ConnectButton onClick={(e) => {
              if (
                wallet?.adapter.name === SolanaMobileWalletAdapterWalletName
              ) {
                connect();
                e.preventDefault();
              }
            }}
            >
              <span>
                Connect Wallet
              </span>
            </ConnectButton>
          ) : (
            <>
              <div>
                <div>
                  <span>Remaining </span>
                  <span>{`${candyMachine ? candyMachine.itemsRemaining : "Loading.."}`}</span>
                </div>
                <div>
                  <span>Price </span>
                  <span>{`${candyMachine ? getNftPrice(candyMachine, "OG") + " SOL " : "Loading.."}`}</span>
                </div>
              </div>
              <div>
                <UseMintButton onClick={async () => await mintButtonClicked()} disabled={isUserMinting || candyMachine?.itemsRemaining === 0}>
                  <span >{ getMintButtonContent() }</span>
                </UseMintButton>
              </div>
            </>
          )}
          {nft ? (
            <div>
              <img src={nft.imageUri} alt="NFT" width="100%"/>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default MintButton

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const UseMintButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
`;

