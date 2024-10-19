export const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_contentHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "_decryptKey",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "addFile",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_contentHash",
          type: "string",
        },
      ],
      name: "buyAccess",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "uploader",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "contentHash",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "FileAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "contentHash",
          type: "string",
        },
      ],
      name: "FilePurchased",
      type: "event",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "allContentHashes",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "filesByHash",
      outputs: [
        {
          internalType: "string",
          name: "contentHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "decryptKey",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "exists",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_contentHash",
          type: "string",
        },
      ],
      name: "getFileData",
      outputs: [
        {
          internalType: "string",
          name: "contentHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "decryptKey",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getFiles",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getUserFiles",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "contentHash",
              type: "string",
            },
            {
              internalType: "string",
              name: "decryptKey",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "authorizedUsers",
              type: "address[]",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
          ],
          internalType: "struct FileStorage.File[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userFiles",
      outputs: [
        {
          internalType: "string",
          name: "contentHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "decryptKey",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "exists",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];