import Sidebar from "@/components/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-0 lg:pt-6 h-full">
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
