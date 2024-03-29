import MobileHeader from "@/components/MobileHeader";
import MobileNavigation from "@/components/MobileNavigation";
import Posts from "@/components/Posts";
import Sidebar from "@/components/Sidebar";
import Storys from "@/components/Story";
import Suggested from "@/components/Suggested";

export default function Home() {
  return (
    <>
      <div className="flex items-start justify-center w-full h-full space-x-2">
        <div className="flex items-center justify-start flex-col w-full">
          <MobileHeader />
          <div className="mb-10 mt-20 md:mt-6 lg:mb-4 lg:mt-0">
            <Storys />
          </div>
          <Posts />
          <MobileNavigation />
        </div>
        <Suggested />
      </div>
    </>
  );
}
