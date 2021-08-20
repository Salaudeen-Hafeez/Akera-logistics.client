const Banner = () => {
  return (
    <header id="showcase" className="">
      <div className="bg-banner w-full h-80 items-center flex flex-col justify-center">
        <div className="font-bold bg-mainbg rounded-lg bg-opacity-60 backdrop-filter ">
          <h1 className="text-center mb-4 px-0.5 text-xl font-bold">
            We deliver packages across the country
          </h1>
          <p className="px-5 text-center">
            You want your packages to get to your desire destination on time and
            safely? Leave the worries we've got you covered
          </p>
          <button className="py-2 text-center w-full">Read More</button>
        </div>
      </div>
    </header>
  );
};

export default Banner;
