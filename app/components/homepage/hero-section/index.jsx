// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
          
          My name is {' '}
          <br></br>
          <span className="text-pink-500">{personalData.name}</span>
          <br></br>
          {` and I study`}
          <br></br>
          <span className="text-[#16f2b3]"> Computer Science </span>
          <br></br>
          {` at The Ohio State University.`}


        </h1>

        <div className="my-12 flex justify-center gap-5">
          <Link
            href={personalData.github}
            target="_blank"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <BsGithub size={50} />
          </Link>
          <Link
            href={personalData.linkedIn}
            target="_blank"
            className="transition-all text-pink-500 hover:scale-125 duration-300"
          >
            <BsLinkedin size={50} />
          </Link>

        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="#contact"
            className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
          >
            <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3">
              <span>Contact me</span>
              <RiContactsFill size={16} />
            </button>
          </Link>
         
         
          {/*
          <Link
            className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
            role="button"
            target="_blank"
            href={personalData.resume}
          >
            <span>Get Resume</span>
            <MdDownload size={16} />
          </Link>
          */}
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;