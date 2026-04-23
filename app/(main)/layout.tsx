import Sidebar from "@/components/Sidebar";
import TabletHeader from "@/components/TabletHeader";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Sidebar className="hidden lg:flex" />
      <TabletHeader />
      <main className="lg:pl-[256px] h-full lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-0 lg:pt-6 h-full flex items-center justify-center ">
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
