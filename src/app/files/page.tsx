"use client";
import { useDisclosure } from "@mantine/hooks";
import FileUpload from "../../components/ui/file-upload";
import { IconPlus } from "@tabler/icons-react";
import { Modal } from "@mantine/core";
import placeHolderImage from "@images/placeholder.png";
import Image from "next/image";

const ShareIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-shield-share"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 .193 6.025" />
            <path d="M16 22l5 -5" />
            <path d="M21 21.5v-4.5h-4.5" />
        </svg>
    );
};

const StarIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-star"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
    );
};

const DownloadIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-download"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <path d="M7 11l5 5l5 -5" />
            <path d="M12 4l0 12" />
        </svg>
    );
};

const QuestionMarkIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
        </svg>
    );
};

const VerticalDots = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
    );
};

const File = () => {
    return (
        <>
            <div className="h-72 w-64 ml-1 mr-1 rounded-xl border mt-1 flex flex-col items-center justify-around shadow-sm hover:shadow-lg hover:translate-x-1 hover:-translate-y-1 transition-all cursor-pointer bg-white">
                <div className="h-[67%] w-[90%] bg-gray-100">
                    <Image
                        src={placeHolderImage}
                        alt="placeholder_image"
                        className="object-fit h-full w-full"
                    />
                </div>
                <div className="h-[10%] w-[80%] text-xs flex items-center">
                    NAME
                </div>
                <div className="h-[15%] w-[80%] flex justify-around  ">
                    <div className="w-[10%] h-full">
                        <ShareIcon />
                    </div>
                    <div className="w-[10%] h-full">
                        <StarIcon />
                    </div>
                    <div className="w-[10%] h-full">
                        <DownloadIcon />
                    </div>
                    <div className="w-[10%] h-full">
                        <QuestionMarkIcon />
                    </div>
                    <div className="w-[10%] h-full">
                        <VerticalDots />
                    </div>
                </div>
            </div>
        </>
    );
};

export default function page() {
    const QuickAccessArray = [1, 2, 3, 4, 5, 6];
    const FilesArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const FoldersArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className="w-screen h-screen">
            <div className="fixed right-0 bottom-0 w-24 h-32">
                <button
                    className="h-14 w-14 rounded-[15%] hover:border-2 flex items-center justify-center bg-[#3D00B7] text-white  hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7] hover:translate-x-1 hover:-translate-y-1 transition-all hover:shadow-lg shadow-sm"
                    onClick={open}
                >
                    <IconPlus />
                </button>
            </div>
            <Modal opened={opened} onClose={close} title="">
                <FileUpload />
            </Modal>
            <div className="h-[10%]"></div>
            <div className="w-full flex flex-col items-center justify-start overflow-y-scroll">
                <div className="w-[83%] min-h-[23%] flex flex-col justify-around m-4">
                    <span className="font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]">
                        Quick Access
                    </span>
                    <div className="w-full">
                        <div className="flex flex-row flex-wrap items-start justify-start ">
                            {QuickAccessArray.map((item, index) => (
                                <File />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-[83%] min-h-[23%] flex flex-col justify-around m-4">
                    <span className="font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]">
                        Folders
                    </span>
                    <div className="w-full">
                        <div className="flex flex-row flex-wrap items-start justify-start ">
                            {QuickAccessArray.map((item, index) => (
                                <File />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-[83%] min-h-[23%] flex flex-col justify-around m-4">
                    <span className="font-dmsans font-semibold text-xl tracking-tighter h-full text-[#565656]">
                        Files
                    </span>
                    <div className="w-full">
                        <div className="flex flex-row flex-wrap items-start justify-start ">
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
            </div>
        </div>
    );
}
