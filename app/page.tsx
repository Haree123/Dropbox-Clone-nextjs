import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919]">
        <div className="flex flex-col p-10 bg-[#2B2929] dark:bg-slate-800 text-white">
          <h1 className="font-bold text-5xl">
            Welcome to Dropbox.
            <br /> <br />
            Storing everything for you and your business needs. All in one
            place.
          </h1>

          <p className="mb-20">
            Enhance your personal storage with Dropbox, offering a simple and
            efficent way to upload, organize and access files from anywhere.
            Securely store important documents and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution.
          </p>

          <Link
            href="/dashboard"
            className="cursor-pointer flex items-center bg-blue-500 w-fit p-5"
          >
            Try it for Free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800">
          <video autoPlay muted loop>
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your Browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mx-10 my-20 text-center">
        <p className="font-bold text-4xl">Cloud Storage you can count on</p>

        <div className="flex flex-col justify-start space-y-10 lg:flex-row items-center space-x-4 lg:space-y-0 my-20">
          <div className="flex flex-col flex-1">
            <p className="font-bold text-3xl">1B+</p>
            <p className="font-bold text-2xl mt-5">mobile app downloads</p>
            <p className="text-sm mt-5">
              with Editors Choice Awards from the Google Play and Apple App
              Store.
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-bold text-3xl">600K+</p>
            <p className="font-bold text-2xl mt-5">teams globally</p>
            <p className="text-sm mt-5">
              use Dropbox to share work, safeguard content, and grow their
              business.
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-bold text-3xl">4.5B</p>
            <p className="font-bold text-2xl mt-5">connections and counting</p>
            <p className="text-sm mt-5">
              created through Dropbox file sharing.
            </p>
          </div>
        </div>
      </div>

      <div className="my-20 text-center">
        <p className="font-bold text-4xl">Keep Everyting at your fingertips</p>

        <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 justify-center items-center my-20">
          <div>
            <div className="bg-[#EEE9E2] dark:bg-[#1E1919] p-10">
              <Image
                src="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/Dropbox_DWG/MultiblockCard1_840x816.jpg?id=cd74929b-c11a-45d0-aae4-1eac15984c30&width=828&output_type=webp"
                alt=""
                height={350}
                width={350}
              />
            </div>
            <p className="font-bold mt-7 text-start">Simple organization</p>
            <p className="mt-4 text-sm text-start max-w-md">
              Keep all your files in one place, and organize it just the way you
              want.
            </p>
          </div>
          <div>
            <div className="bg-[#EEE9E2] dark:bg-[#1E1919] p-10">
              <Image
                src="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/Dropbox_DWG/MultiblockCard2_840x829.jpg?id=abd2c8cb-aab4-4287-8723-bef17297a6c0&width=828&output_type=webp"
                alt=""
                height={350}
                width={350}
              />
            </div>
            <p className="font-bold mt-7 text-start">Anytime access</p>
            <p className="mt-4 text-sm text-start max-w-md">
              Get to your files and photos wherever and whenever you need
              them-on desktop.
            </p>
          </div>
          <div>
            <div className="bg-[#EEE9E2] dark:bg-[#1E1919] p-10">
              <Image
                src="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/Dropbox_DWG/storage-watermark-ui-transparent-2560x2560.png?id=0a37ebad-1922-414f-9a5c-07bd331c55c3&width=828&output_type=webp"
                alt=""
                height={348}
                width={350}
              />
            </div>
            <p className="font-bold mt-7 text-start">Seamless security.</p>
            <p className="mt-4 text-sm text-start max-w-md">
              Be sure your content is protected across all your devices with
              industry-leading encryption.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#2B2929] dark:bg-slate-800 h-fit p-20 flex flex-col items-center space-y-20 text-white">
        <div className="flex flex-col items-center justify-center space-y-10 lg:space-x-72 lg:space-y-0 lg:flex-row">
          <p className="font-bold text-5xl">Get Started with Dropbox</p>

          <Link
            href="/dashboard"
            className="cursor-pointer flex items-center bg-blue-500 w-fit p-5"
          >
            Get Started!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <p className="font-bold text-3xl text-center max-w-2xl">
            Trusted by over 700 million registered users and 600,000 teams
          </p>
        </div>
      </div>

      <div className="bg-[#010001] h-auto p-10 text-white flex flex-col justify-center items-center">
        <p className="font-bold text-3xl">
          <b>Disclaimer</b>
        </p>
        <p className="mx-12 mt-3  text-sm text-center">
          This Video is made for learning and building my portfolio. We do not
          own or affiliate with Dropbox or/and of its subsidiaries in any form.
        </p>
      </div>
    </main>
  );
}
