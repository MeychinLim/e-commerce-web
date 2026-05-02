type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return <h1 className="text-3xl font-bold mb-8">{title}</h1>;
};

export default PageTitle;
