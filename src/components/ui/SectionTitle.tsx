const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="font-bold text-sm md:text-2xl lg:text-3xl text-center">
      {title}
    </h1>
  );
};

export default SectionTitle;
