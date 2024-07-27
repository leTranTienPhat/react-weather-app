import Header from "@/components/layout/Header";

type IProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: IProps) => {
  return (
    <div className="h-screen w-full bg-site-background overflow-y-scroll">
      <div className="container max-w-[700px] mx-auto flex flex-col gap-y-28">
        <Header />
        <div className="grow pb-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
