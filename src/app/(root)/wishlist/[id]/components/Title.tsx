interface TitleProps {
  title: string;
  description: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="w-full text-center lg:text-start font-heebo md:space-y-5 space-y-2 md:mb-0 mb-[20px]">
      <h1 className="text-white md:text-[36px] text-[24px] md:font-semibold font-extrabold max-md:text-2xl leading-[1]">
        {title}
      </h1>
      <p 
        className="md:text-[#DBDBDB] text-[#CDCDCD] text-[16px] md:font-normal w-full lg:w-[60%] lg:px-0 md:px-1 leading-[1.2]">
        {description}
      </p>
    </div>
  );
};

export default Title;
