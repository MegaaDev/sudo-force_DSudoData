import Link from "next/link";

const Search = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
        </svg>
    );
};

function Header() {
    return (
        <div className="w-full h-[10%] border-b absolute top-0 left-0 ">
            <div className="w-full h-full flex">
                {/* Left */}
                <div className="w-[50%] h-full  flex justify-end">
                    <div className="h-full w-[82%] flex justify-around items-center font-semibold text-base">
                        <Link href="/">
                            <span className="font-bold text-[2.5rem] font-integralcfBold tracking-[-0.2em] text-[#3D00B7]">
                                DATA FORCE
                            </span>
                        </Link>
                        <span className=" font-dmsans">Marketplace</span>
                        <span className=" font-dmsans">Resource</span>
                        <span className=" font-dmsans">About</span>
                    </div>
                </div>
                {/* Right */}
                <div className="w-[50%] h-full flex justify-start">
                    <div className="h-full w-[82%] flex justify-around items-center text-sm font-dmsans font-semibold">
                        <div className="w-[40%] rounded-3xl border h-[50%] flex justify-around">
                            <input
                                type="text"
                                className="w-[80%] hover:border-none focus:border-none active:border-none active:outline-none focus:outline-none"
                                placeholder="Search"
                            />
                            <div className="w-[10%] h-full items-center flex">
                                <Search />
                            </div>
                        </div>
                        <div className="w-[20%] h-[50%] rounded-3xl">
                            <Link href="/files">
                                <button className="h-full w-full rounded-3xl hover:border-2 bg-[#3D00B7] text-white hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7]">
                                    My Files
                                </button>
                            </Link>
                        </div>
                        <div className="w-[20%] h-[50%] rounded-3xl">
                            <button className="h-full w-full rounded-3xl border-2 border-[#3D00B7] text-[#3D00B7] hover:bg-[#3D00B7] hover:text-white">
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
