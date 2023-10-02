import bannerImg from "../../assets/graduation-illustration.png";
const Banner = () => {
  return (
    <div className="hero min-h-screen ">
      <div className="container">
        <div className="flex w-full items-center justify-around flex-col-reverse lg:flex-row">
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold">
              Join Our Alumni Network
            </h1>
            <p className="py-6">
              Stay connected, share experiences, and empower the next generation
              of graduates.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
          <img
            src={bannerImg}
            alt="banner image"
            className="w-2/3 md:max-w-sm rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
