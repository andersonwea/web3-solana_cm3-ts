import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
import fs, { read } from 'fs'

const main = async() => {

   const  mintWallet = '/home/chain/workspace/solana/candy-machine-sol/cm3-ts/candy-machineV3/wallet/minZAaZA2q7gzhQtKpByGuCmh6UWzMGS4HmYR9TQLxM.json'

    const loadKeypair = function (filename: string) : Keypair{
        const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[]
        const secretKey = Uint8Array.from(secret)
        return Keypair.fromSecretKey(secretKey)
    }

    const authority = loadKeypair(mintWallet)

    const connection = new Connection(clusterApiUrl("devnet"));

    const metaplex = new Metaplex(connection)
    metaplex.use(keypairIdentity(authority))

    const candyMachine = await metaplex.candyMachines().findByAddress({address: new PublicKey("BhgVTdKAZ7QLk1i62Vkcn2Br9GU7D7EenuoGTLm8SgUd")})

    const  nft  = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: new PublicKey("GuSiNDJi83dyDL4DWL5YMEB4JLt9BAjn49nsf3fyeUsk"),
        group: 'OG'
    });

    console.log(nft.response.signature)
    // console.log(nft.nft.name)

    // const groups = candyMachine.candyGuard?.groups.map((group: any) => {
    //     return {
    //         label: group.label
    //     }
    // })

    // console.log(groups)
    

}

main()
