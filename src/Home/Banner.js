const Banner = () => {
  return (
    <header id="showcase" className="">
      <div className="bg-banner w-full h-80 bg-no-repeat flex flex-col justify-center">
        <div className="font-bold bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm">
          <h1 className="text-center mb-4 px-0.5 text-xl font-bold">
            We deliver packages across the country
          </h1>
          <p className="px-5 text-center text-gray-800 ">
            You want your packages to get to your desire destination on time and
            safely? Leave the worries we've got you covered
          </p>
        </div>
        <a href="#section-2" className="btn">
          Read More
        </a>
      </div>
    </header>
  );
};

export default Banner;
