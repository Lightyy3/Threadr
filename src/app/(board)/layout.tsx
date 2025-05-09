/* eslint-disable react/jsx-no-undef */
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import BottomBar from "@/components/Bottombar"; // NEW component
import Link from "next/link";
import Image from "next/image";

import UserProfileMenuMobile from "@/components/Profilebar";

export default function BoardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="bg-[#5A04FF] w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 xl:px-8">
      {/* Top Nav for desktop */}
      <div className="flex justify-center  lg:hidden">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/icons/output.png"
            alt="Logo"
            width={148} // smaller width
            height={56} // smaller height
            style={{ minWidth: "120px", minHeight: "25px" }} // adjusted to match size
          />
        </Link>
        <div className="flex items-center gap-2 px-6 ml-5 text-white hover:text-black transition-colors cursor-pointer">
          <UserProfileMenuMobile />
        </div>
      </div>
      <div className="hidden md:block mb-4">
        <LeftBar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="w-full lg:flex-1 border-t  lg:border-t-0 lg:border-x border-white">
          {children}
          {modal}
        </main>

        {/* Right sidebar (desktop only) */}
        <aside className="hidden lg:block lg:w-[300px]">
          <RightBar />
        </aside>
      </div>

      {/* Bottom nav for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomBar />
      </div>
    </div>
  );
}
