import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";

export default function BoardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="bg-[#5A04FF] max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex flex-col justify-between">
      <div className="px-2 xsm:px-4 xxl:px-8 ">
        <LeftBar />
      </div>
      <div className="flex mt-8 ml-20">
        <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-white ">
          {children}
          {modal}
        </div>
        <div className="hidden lg:flex ml-4 md:ml-8 flex-1 mb-4 translate-y-[-30px]">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
