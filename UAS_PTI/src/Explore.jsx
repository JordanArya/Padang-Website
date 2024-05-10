import React from "react";
import "./Explore.css"
import Data from "./Destination"
import './scss/styles.scss'
import { data } from "autoprefixer";
import { useParams, Link } from "react-router-dom";
export default function FeaturedImageGallery() {
  const params = useParams()
  const indexs = params.id;
  const Datas = Data[indexs-1];
 
  const [active, setActive] = React.useState(
    Datas.imgURL[1],
  );
 
  return (
      <>
      <nav aria-label="breadcrumb" class="w-max">
      <ol class="flex flex-wrap items-center w-full px-4 py-2 rounded-md">
        <li
          class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
          <a href="#" class="opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20"
              fill="currentColor">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
              </path>
            </svg>
          </a>
          <span
            class="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
            /
          </span>
        </li>
        <li
          className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
          <Link to={{
                    pathname: `/`,
                    }}>
          <button href="#" className="opacity-60">
            <span>
              Search
            </span>
          </button>
          </Link>
          <span
            class="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">/</span>
        </li>
        <li
          class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
          <a href="#">
            Explore
          </a>
        </li>
      </ol>
    </nav>

    <div className="Carouser-container grid grid-cols-10 ">
      <div className="col-span-5 text-left ">
      
        <h1 className="Destination-title">{Datas.TempatWisata}</h1>
        <hr />
        <div className="TextBox text-justify">
            {Datas.ket}
        </div>
  </div>

    <div className="grid gap-10 justify-items-center col-span-5 ">
      <div id="MainImg-Container">

        <img
          className="rounded-lg md:h-[480px] w-full h-full object-fill"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-4 gap-4 h-64 relative" id="Thumbnail">
        {Datas.imgURL.map((imgURL,index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgURL)}
              src={imgURL}
              className="cursor-pointer rounded-lg  w-full h-full object-fill"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}