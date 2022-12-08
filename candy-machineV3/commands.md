`create-config` command to create a basic configuration file.

Deployment Commands

The deployment of a Candy Machine V3 follows the same steps:

1. `sugar validate` to verify that all metadata is in place;
2. `sugar upload` to upload the metadata to the selected storage;
3. `sugar deploy` to create and deploy a Candy Machine;
4. `sugar verify` to verify that all information is on-chain.

Sugar Guards Commands

1. `sugar guard add` to create a new candy guard over a candy machine;
2. `sugar guard update` to update the configuration of an existing candy guard;
3. `sugar guard show` to print the current configuration;
4. `sugar guard remove` to remove the candy guard from a candy machine;
5. `sugar guard withdraw` to close a candy guard account and retrieve the rent funds.


Guards Example

    Allow List
The AllowList guard validates the payer's address against a merkle tree-based allow list of addresses. The hash should be specified as a hexadecimal value.

"allowList" : {
    "merkleRoot": "<HASH>"
}

Mint Limit
The id configuration represents the unique identification for the limit

"mintLimit" : {
    "id": number,
    "limit": number
}


"guards": {
    "default": {
      "botTax": {
        "value": 0.01,
        "lastInstruction": true
      }
    },
    "groups": [
      {
        "label": "OGs",
        "guards": {
          "startDate": {
            "date": "2022-10-20 12:00:00 +0000"
          },
          "tokenGate": {
            "amount": 1,
            "mint": "7nE1GmnMmDKiycFkpHF7mKtxt356FQzVonZqBWsTWZNf"
          },
          "solPayment": {
            "value": 1,
            "destination": "PanbgtcTiZ2PveV96t2FHSffiLHXXjMuhvoabUUKKm8"
          }
        }
      },
      {
        "label": "Public",
        "guards": {
          "startDate": {
            "date": "2022-10-20 18:00:00 +0000"
          },
          "solPayment": {
            "value": 2,
            "destination": "PanbgtcTiZ2PveV96t2FHSffiLHXXjMuhvoabUUKKm8"
          }
        }
      }
    ]
  }
}