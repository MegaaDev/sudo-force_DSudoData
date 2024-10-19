/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Loader } from '@mantine/core';
import axios from 'axios';
import { Buffer } from 'buffer';
import { ethers } from 'ethers'
import { abi } from '../../utils/abi'
import image from './../assets/image.png'

import { useDisclosure } from '@mantine/hooks';
import FileUpload from '../../components/ui/file-upload';
import { IconFilter, IconPlus } from '@tabler/icons-react';
import { Modal } from '@mantine/core';
import placeHolderImage from '@images/placeholder.png';
import Image from 'next/image';
import { addFile, getAllFiles, buyAccess, getFileData } from '@/utils/helper';

import React, { useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../components/ui/expandable"

const pinataApiKey = 'd61dd22ec8928187a5f3';
const pinataSecretApiKey =
  'd49a4844a11d1a745558056a37504e92ebfc10ad2a4f0f7f94ce6a19212f8cfe';


const ShareIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-shield-share'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 21a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 .193 6.025' />
      <path d='M16 22l5 -5' />
      <path d='M21 21.5v-4.5h-4.5' />
    </svg>
  );
};

const StarIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-star'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' />
    </svg>
  );
};

const DownloadIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-download'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
      <path d='M7 11l5 5l5 -5' />
      <path d='M12 4l0 12' />
    </svg>
  );
};

const QuestionMarkIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-question-mark'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' />
      <path d='M12 19l0 .01' />
    </svg>
  );
};

const VerticalDots = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
      <path d='M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
      <path d='M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
    </svg>
  );
};

const File = () => {
  return (
    <>
      <div className='h-72 w-64 ml-1 mr-1 rounded-xl border mt-1 flex flex-col items-center justify-around shadow-sm hover:shadow-lg hover:translate-x-1 hover:-translate-y-1 transition-all cursor-pointer bg-white'>
        <div className='h-[67%] w-[90%] bg-gray-100'>
          <Image
            src={placeHolderImage}
            alt='placeholder_image'
            className='object-fit h-full w-full'
          />
        </div>
        <div className='h-[10%] w-[80%] text-xs flex items-center'>NAME</div>
        <div className='h-[15%] w-[80%] flex justify-around  '>
          <div className='w-[10%] h-full'>
            <ShareIcon />
          </div>
          <div className='w-[10%] h-full'>
            <StarIcon />
          </div>
          <div className='w-[10%] h-full'>
            <DownloadIcon />
          </div>
          <div className='w-[10%] h-full'>
            <QuestionMarkIcon />
          </div>
          <div className='w-[10%] h-full'>
            <VerticalDots />
          </div>
        </div>
      </div>
    </>
  );
};
type Card = {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  fileType: string;
}

export default function page() {
  const QuickAccessArray = [1, 2, 3, 4, 5, 6];
  const FilesArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const FoldersArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const [opened, { open, close }] = useDisclosure(false);
  const [fileType, setSelectedType] = useState('');
  const [buf, setBuf] = useState<Buffer | undefined>(undefined);
  const [hash, setHash] = useState('');
  const [loader, setLoader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [decryptionKey, setDecryptionKey] = useState('');

  const [cardsTemp, setCards] = useState([])

  const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    setDecryptionKey(Buffer.from(exportedKey).toString('hex'));
    return key;
  };
  const generateKey2 = async () => {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const exportedKey = await window.crypto.subtle.exportKey("raw", key);
    let dkey = Buffer.from(exportedKey).toString("hex");
    setDecryptionKey(dkey);
    return [key, dkey];
  };

  const encryptBuffer = async (buffer: BufferSource, key: CryptoKey) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      buffer
    );
    return { encryptedBuffer: new Uint8Array(encrypted), iv };
  };

  const captureFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.stopPropagation();
    // event.preventDefault();
    const files = event.target.files;
    if (!files) {
      alert('No file selected');
      return;
    }
    const file = files[0];

    const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type');
      return;
    }

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader: FileReader) => {
    if (reader.result) {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      setBuf(buffer);
    } else {
      alert('File reading failed');
    }
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoader(true);

    const buffer = buf;
    if (!buffer) {
      alert('No file selected');
      setLoader(false);
      return;
    }

    try {
      const [key, dkey] = await generateKey2();

      const { encryptedBuffer, iv } = await encryptBuffer(buffer, key);

      const data = new FormData();
      const encryptedBlob = new Blob([iv, encryptedBuffer]);
      data.append('file', encryptedBlob, 'encryptedFile');

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const headers = {
        pinata_api_key: String(pinataApiKey),
        pinata_secret_api_key: String(pinataSecretApiKey),
      };

      const response = await axios.post(url, data, { headers });
      const ipfsId = response.data.IpfsHash;
      console.log('Generated IPFS Hash: ', ipfsId);
      setHash(ipfsId);
      setShowLinks(true);
      addFile(ipfsId, dkey, name, String(thumbnail), fileType, price, contract)
        .then((res) => {
          console.log("Added file to blockchain: ", res);
        })
        .catch((e) => {
          console.error(e);
        });

    } catch (err) {
      console.error(err);
      alert('An error occurred. Please check the console');
      setShowLinks(false);
    }

    setLoader(false);
  };

  //   if (loader) {
  //     return (
  //       <>
  //         <div className='h-screen w-screen'>
  //           <div className='h-[10%]'></div>
  //           <div className='h-[90%]'>
  //             <Loader />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(ethers);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x0A39c2B29fc024362F3179d4Dc3E00c253Cbfb95";

        const contract = new ethers.Contract(contractAddress, abi, signer);
        // contract.getFiles().then((files) => {
        //   console.log(files);
        // }).catch((e) => {
        //   console.error(e);
        // })
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
        console.log("Metamask is installed");
        console.log(contract, provider, account);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  useEffect(() => {
    if (!contract) return;
    getAllFiles(contract)
      .then((res) => {
        console.log("got files from blockchain: ", res);
        // console.log(res.1)
        setCards(res);
        setTimeout(() => {

          console.log(cardsTemp)
        }, 3000)
      })
      .catch((e) => {
        console.error(e);
      });

  }, [contract]);

  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bucket, setBucket] = useState("");
  const [days, setDays] = useState(0);
  const [active, setActive] = useState(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();



  const handlePurchase = (ipfsKey, price) => {
    buyAccess(ipfsKey, price, contract)
      .then((res) => {
        console.log("purchased the product")
        const hotFile = getFileData(ipfsKey, contract);




      })
      .catch((e) => {
        console.error(e);
      });
  }



  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className='w-screen h-screen'>
      <div className='fixed right-0 bottom-0 w-24 h-32'>
        <button
          className='h-14 w-14 rounded-[15%] hover:border-2 flex items-center justify-center bg-[#3D00B7] text-white  hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7] hover:translate-x-1 hover:-translate-y-1 transition-all hover:shadow-lg shadow-sm'
          onClick={open}
        >
          <IconPlus />
        </button>
      </div>
      <Modal opened={opened} onClose={close} title=''>
        {loader ? (
          <Loader />
        ) : (
          <>
            {showLinks ? (
              <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
                <h6 className='text-lg font-semibold mb-2'>IPFS Hash:</h6>
                <p className='text-sm text-gray-700 mb-4 break-all'>{hash}</p>
                <h6 className='text-lg font-semibold mb-2'>Decryption Key:</h6>
                <p className='text-sm text-gray-700 mb-4 break-all'>
                  {decryptionKey}
                </p>

              </div>
            ) : (
              <div className='flex flex-col'>
                <div className='flex flex-col items-center mb-4'>
                  <h1 className='text-2xl font-semibold mb-2'>
                    Upload and Encrypt Files to IPFS
                  </h1>
                  <h5 className='text-lg text-gray-600 mb-4'>
                    Choose file to encrypt and upload to IPFS
                  </h5>
                  <select
                    className='w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                    value={fileType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value='' disabled>
                      Select Type
                    </option>
                    <option value='subscription'>Subscription</option>
                    <option value='one_time_buy'>One time buy</option>
                    <option value='ml'>ML</option>
                  </select>
                  <input
                    type='text'
                    placeholder='Name'
                    className='w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type='number'
                    placeholder='Price per day'
                    className='w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  {fileType === 'subscription' && (
                    <select
                      className='w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                      value={bucket}
                      onChange={(e) => setBucket(e.target.value)}
                    >
                      <option value='' disabled>
                        Select Bucket
                      </option>
                      <option value='bucket1'>Bucket 1</option>
                      <option value='bucket2'>Bucket 2</option>
                      <option value='bucket3'>Bucket 3</option>
                    </select>
                  )}
                  {fileType === 'subscription' && (
                    <input
                      type='number'
                      placeholder='No. of days for subscription'
                      className='w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                    />
                  )}
                  <input
                    type='text'
                    placeholder='Thumbnail URL'
                    className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D00B7]'
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>
                <Form
                  onSubmit={onSubmit}
                  className='flex flex-col items-center'
                >
                  {/* <input type='file' onChange={captureFile} required /> */}
                  <FileUpload
                    onChange={(files: File[]) =>
                      captureFile({
                        target: { files },
                      } as unknown as React.ChangeEvent<HTMLInputElement>)
                    }
                  />
                  {buf && (
                    <Button
                      type='submit'
                      className='bg-[#5933c5] text-white hover:bg-white hover:text-[#5933c5] hover:border-[#5933c5] border-2 transition-all rounded-lg px-4 py-2 shadow-sm hover:shadow-lg w-full'
                    >
                      Upload
                    </Button>
                  )}
                </Form>
              </div>
            )}
          </>
        )}
      </Modal>
      <div className='h-[10%]'></div>
      <div className="h-[7%] w-[83%] mt-2 flex items-center justify-between">
        <div className='w-full justify-start flex flex-row gap-[10px] px-[15%]'>   <div className="h-full w-[40%] flex items-center justify-around font-dmsans">
          <button className="h-[75%]  px-[20px] rounded-3xl hover:border-2 bg-[#3D00B7] text-white hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7]">
            All
          </button>
          <button className="h-[75%] px-[20px] rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white">
            Subscription
          </button>
          <button className="h-[75%] px-[20px] rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white">
            Shop
          </button>
          <button className="h-[75%] px-[20px] rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white">
            Runtimes
          </button>
        </div></div>

        <div className="h-full w-[20%] flex items-center">
          <button className="h-[75%] pl-10 pr-10 rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white flex items-center justify-evenly">
            All Filters
            <IconFilter className="ml-2 " />
          </button>
        </div>
      </div>
      {/* <div className='w-full flex flex-col items-center justify-start overflow-y-scroll'>
        <div className='w-[83%] min-h-[23%] flex flex-col justify-around m-4'>
          <span className='font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]'>
            Quick Access
          </span>
          <div className='w-full'>
            <div className='flex flex-row flex-wrap items-start justify-centre '>
              {QuickAccessArray.map((item, index) => (
                <File />
              ))}
            </div>
          </div>
        </div>
        <div className='w-[83%] min-h-[23%] flex flex-col justify-around m-4'>
          <span className='font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]'>
            Folders
          </span>
          <div className='w-full'>
            <div className='flex flex-row flex-wrap items-start justify-centre '>
              {QuickAccessArray.map((item, index) => (
                <File />
              ))}
            </div>
          </div>
        </div>
        <div className='w-[83%] min-h-[23%] flex flex-col justify-around m-4'>
          <span className='font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]'>
            Files
          </span>
          <div className='w-full'>
            <div className='flex flex-row flex-wrap items-start justify-centre '>
              {QuickAccessArray.map((item, index) => (
                <File />
              ))}
              {QuickAccessArray.map((item, index) => (
                <File />
              ))}
              {QuickAccessArray.map((item, index) => (
                <File />
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <button
              key={`button-${active[3]}-${id}`}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </button>
            <div
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white  sm:rounded-3xl overflow-hidden"
            >
              <div className='relative'>
                <img
                  width={200}
                  height={200}
                  src={'images/placeholder.png'}
                  alt={active[3]}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
                <p
                  className="absolute top-[20px] left-[20px] px-4 py-3 text-sm rounded-full font-bold bg-[#3000b7] text-white"
                >
                  {Number(active.price) + "WIE"}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <h3 className="font-medium text-neutral-700 text-base">
                      {active[3]}
                    </h3>
                    <p className="text-neutral-600  text-base">
                      {active.fileType}
                    </p>
                  </div>
                  <div className='flex items-center flex-row'>

                    <p className='px-4 cursor-pointer py-3 text-sm rounded-sm font-bold bg-[#3000b7] text-white'
                      onClick={() => handlePurchase(active.contentHash, Number(active.price))}
                    >Purchase</p>
                  </div>


                </div>
                <div className="pt-4 relative px-4">
                  <div className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {"description"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="  w-full  flex flex-wrap gap-4 px-[10%]">
        {cardsTemp?.map((card, index) => (
          <div
            key={card[3]}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col w-[260px]  hover:bg-neutral-50 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <div>
                <img
                  width={100}
                  height={100}
                  src={'images/placeholder.png'}
                  alt={card[3]}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </div>
              <div className='w-[full] flex flex-row justify-between items-start'>
                <div className="flex justify-center items-start flex-col">
                  <h3 className="font-medium text-neutral-800 text-center md:text-left text-base">
                    {card[3]}
                  </h3>
                  <p className="text-neutral-600 text-center md:text-left text-base">
                    {card.fileType}
                  </p>

                </div>
                <div> <p className='p-[3px] px-[20px] rounded-full bg-[#3000b7] text-[white]'>{Number(card.price)}</p></div>
              </div>

            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}


export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

