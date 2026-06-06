import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".about-image", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  }, { dependencies: [] });

  return (
    <div id="about" className="min-h-screen w-full">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Kibo's World
        </p>

        <AnimatedTitle
          title="The desk<b>t</b>op friend that stays with y<b>o</b>u through every pr<b>o</b>blem"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The desktop companion of your dreams—always on, locally secure</p>
          <p className="text-gray-500">
            KIBO combines state-of-the-art vector RAG memory with custom skin rendering,
            passive system monitoring, and private offline-capable neural speech.
          </p>
        </div>
      </div>

      <div className="relative h-dvh w-full" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
