import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="h-40 border-t">
        <section className="max-w-5xl mx-auto p-8 flex flex-col 3sm:flex-row items-center justify-between md:justify-evenly h-full">
          <div className="my-4 md:my-6 text-center">
            <div className="flex items-center space-x-1">
              <img src="apxLOGO.svg" alt="apx logo" className="w-5 h-5" />
              <p className="text-2xl md:text-3xl font-bold italic tracking-tighter">
                APX
              </p>
            </div>
            <p className="text-base md:text-lg font-medium tracking-widest">
              APPAREL
            </p>
          </div>
          <div className='text-center'>
            Icons made by{" "}
            <a
              href="https://www.freepik.com"
              title="Freepik"
              className="text-link font-medium"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              className="text-link font-medium"
            >
              www.flaticon.com
            </a>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
