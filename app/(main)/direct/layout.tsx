type DirectLayoutProps = {
  children: React.ReactNode;
};

const DirectLayout = ({ children }: DirectLayoutProps) => {
  return <main>{children}</main>;
};

export default DirectLayout;
