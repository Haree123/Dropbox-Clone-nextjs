import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      <div className="mt-5">
        <p className="text-center">
          <b>Disclaimer</b>
        </p>
        <p className="mx-12 my-3 text-sm">
          This Video is made for learning and building my portfolio. We do not
          own or affiliate with Dropbox or/and of its subsidiaries in any form.
          Copyright Disclaimer under section 107 of the Copyright Act 1976,
          allowance is made for fair use of this video for educational purposes.
        </p>
      </div>
    </main>
  );
}
