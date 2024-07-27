type IProps = {
  children: React.ReactNode;
};

const GlassWrapper = ({ children }: IProps) => {
  return <div className="w-full p-10 border rounded-lg">{children}</div>;
};

export default GlassWrapper;
