"use client";
import CardStack from "../components/ui/card-stack";

const Stats = () => {
    return (
        <div className="w-1/3 h-full">
            <div className="h-[90%] w-full flex">
                <span className=" text-5xl font-integralcfBold tracking-tighter ">
                    <span className="font-bold">98</span>
                    <span className="font-medium">K</span>
                </span>
                <div className="font-bold text-4xl h-full flex items-center">
                    +
                </div>
            </div>
            <div className="h-[10%] w-full pl-3 text-[#565656] text-xl text-left">
                Artwork
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <div className="h-screen w-screen">
            <div className="w-full flex h-full border-b">
                <div className="h-full w-3/5 flex items-center justify-end">
                    <div className="h-[70%] flex flex-col w-[80%] text-left items-start justify-evenly ">
                        <span className="text-5xl font-integralcfBold font-bold text-left tracking-tighter">
                            DISCOVER, AND COLLECT
                            <br />
                            DIGITAL ART AND NFTS
                        </span>
                        <span className="text-xl font-dmsans text-left text-[#565656] tracking-wide">
                            Digital marketplace for crypto collectibles and
                            <br />
                            non-fungible tokens (NFTs). Buy, Sell, and discover
                            <br />
                            exclusive digital assets.
                        </span>
                        <button className="h-[10%] w-1/4 rounded-[2rem] hover:border-2 bg-[#3D00B7] text-white hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7] font-semibold text-xl">
                            Explore now
                        </button>
                        <div className="h-[10%] w-[50%]  flex justify-around">
                            <Stats />
                            <Stats />
                            <Stats />
                        </div>
                    </div>
                </div>
                <div className="h-full w-2/5 flex items-center justify-start">
                    <div className="h-[50%] w-[80%] flex items-center">
                        <CardStack items={CARDS} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const CARDS = [
    {
        id: 0,
        name: "Manu Arora",
        designation: "Senior Software Engineer",
        content: (
            <p>
                These cards are amazing, <>I want to use them</> in my project.
                Framer motion is a godsend ngl tbh fam 🙏
            </p>
        ),
    },
    {
        id: 1,
        name: "Elon Musk",
        designation: "Senior Shitposter",
        content: (
            <p>
                I dont like this Twitter thing, <>deleting it right away</>{" "}
                because yolo. Instead, I would like to call it <>X.com</> so
                that it can easily be confused with adult sites.
            </p>
        ),
    },
    {
        id: 2,
        name: "Tyler Durden",
        designation: "Manager Project Mayhem",
        content: (
            <p>
                The first rule of
                <>Fight Club</> is that you do not talk about fight club. The
                second rule of
                <>Fight club</> is that you DO NOT TALK about fight club.
            </p>
        ),
    },
];
