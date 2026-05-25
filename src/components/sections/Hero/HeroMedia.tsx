import { useCallback, useEffect, useRef, useState } from "react";
import { useLottie } from "lottie-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import heroLottie from "../../../assets/hero-lottie.json";
import audioWelcome from "../../../assets/audio_1_welcome.mp3";
import audioThankYou from "../../../assets/audio_2_thank_you.mp3";
import audioSuccess from "../../../assets/audio_3_success.mp3";
import logo1 from "../../../assets/logo-1.svg";
import logo2 from "../../../assets/logo-2.svg";
import logo3 from "../../../assets/logo-3.svg";
import "swiper/css";

const AUDIO_STAGES = [
  { progress: 0.08, audioIndex: 0, name: "Welcome" },
  { progress: 0.38, audioIndex: 1, name: "Thank You" },
  { progress: 0.73, audioIndex: 2, name: "Success" },
] as const;

const heroLogosBase = [
  { src: logo1, alt: "Jobber" },
  { src: logo2, alt: "Housecall Pro" },
  { src: logo3, alt: "ServiceTitan" },
];

const heroLogos = Array.from({ length: 3 }, (_, setIndex) =>
  heroLogosBase.map((logo, index) => ({
    id: setIndex * heroLogosBase.length + index + 1,
    ...logo,
  })),
).flat();

export default function HeroMedia() {
  const { View, animationItem } = useLottie({
    animationData: heroLottie,
    loop: true,
    autoplay: true,
  });

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const soundOnRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const stageIndexRef = useRef(0);
  const lottieLoopRef = useRef(1);

  const [soundOn, setSoundOn] = useState(false);

  const applyMuteState = useCallback(() => {
    audioRefs.current.forEach((audio, index) => {
      if (!audio) return;

      audio.muted = !soundOnRef.current;
      audio.volume = 1;

      console.log(`[AUDIO ${index + 1}] mute state applied`, {
        muted: audio.muted,
        soundOn: soundOnRef.current,
      });
    });
  }, []);

  const stopAllAudios = useCallback(() => {
    audioRefs.current.forEach((audio, index) => {
      if (!audio) return;

      audio.pause();
      audio.currentTime = 0;

      console.log(`[AUDIO ${index + 1}] stopped/reset`);
    });
  }, []);

  const unlockAudios = useCallback(async () => {
    if (audioUnlockedRef.current) {
      console.log("[AUDIO] Already unlocked");
      return;
    }

    const audios = audioRefs.current.filter(Boolean) as HTMLAudioElement[];

    console.log("[AUDIO] Unlock started", {
      audiosCount: audios.length,
    });

    try {
      await Promise.all(
        audios.map(async (audio, index) => {
          console.log(`[AUDIO ${index + 1}] unlocking`);

          audio.pause();
          audio.currentTime = 0;
          audio.muted = true;
          audio.volume = 0;

          await audio.play();

          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
          audio.muted = !soundOnRef.current;

          console.log(`[AUDIO ${index + 1}] unlocked`);
        }),
      );

      audioUnlockedRef.current = true;
      console.log("[AUDIO] All audios unlocked");
    } catch (error) {
      console.log("[AUDIO] Unlock failed:", error);
    } finally {
      applyMuteState();
    }
  }, [applyMuteState]);

  const playStageAudio = useCallback(
    (audioIndex: number, audioName: string) => {
      const currentAudio = audioRefs.current[audioIndex];

      if (!currentAudio) {
        console.log(`[AUDIO ${audioIndex + 1}] not found`, {
          audioName,
        });
        return;
      }

      console.log(
        `[LOTTIE LOOP ${lottieLoopRef.current}] stage audio trigger`,
        {
          stage: stageIndexRef.current + 1,
          audioIndex: audioIndex + 1,
          audioName,
          soundOn: soundOnRef.current,
        },
      );

      stopAllAudios();

      currentAudio.currentTime = 0;
      currentAudio.muted = !soundOnRef.current;
      currentAudio.volume = 1;

      currentAudio.onended = () => {
        console.log(`[AUDIO ${audioIndex + 1}] ended`, {
          audioName,
          loop: lottieLoopRef.current,
        });
      };

      console.log(`[AUDIO ${audioIndex + 1}] trying to play`, {
        audioName,
        muted: currentAudio.muted,
        volume: currentAudio.volume,
      });

      currentAudio
        .play()
        .then(() => {
          console.log(`[AUDIO ${audioIndex + 1}] started successfully`, {
            audioName,
          });
        })
        .catch((error) => {
          console.log(`[AUDIO ${audioIndex + 1}] play failed`, {
            audioName,
            error,
          });
        });
    },
    [stopAllAudios],
  );

  useEffect(() => {
    if (!animationItem) {
      console.log("[LOTTIE] animationItem not ready yet");
      return;
    }

    console.log("[LOTTIE] animationItem ready", {
      totalFrames: animationItem.totalFrames,
      duration: animationItem.getDuration?.(true),
    });

    const handleEnterFrame = () => {
      const totalFrames = animationItem.totalFrames || 1;
      const currentFrame = animationItem.currentFrame ?? 0;
      const progress = currentFrame / totalFrames;

      const currentStage = AUDIO_STAGES[stageIndexRef.current];

      if (!currentStage) return;

      if (progress >= currentStage.progress) {
        console.log(`[LOTTIE LOOP ${lottieLoopRef.current}] stage reached`, {
          stage: stageIndexRef.current + 1,
          triggerAt: Math.round(currentStage.progress * 100) + "%",
          currentProgress: Math.round(progress * 100) + "%",
          currentFrame,
          totalFrames,
          audioName: currentStage.name,
        });

        playStageAudio(currentStage.audioIndex, currentStage.name);

        stageIndexRef.current += 1;
      }
    };

    const handleLoopComplete = () => {
      console.log(`[LOTTIE LOOP ${lottieLoopRef.current}] completed`);

      stageIndexRef.current = 0;
      lottieLoopRef.current += 1;

      console.log(`[LOTTIE LOOP ${lottieLoopRef.current}] started`);
    };

    animationItem.addEventListener("enterFrame", handleEnterFrame);
    animationItem.addEventListener("loopComplete", handleLoopComplete);

    return () => {
      console.log("[LOTTIE] cleanup events");

      animationItem.removeEventListener("enterFrame", handleEnterFrame);
      animationItem.removeEventListener("loopComplete", handleLoopComplete);
    };
  }, [animationItem, playStageAudio]);

  useEffect(() => {
    console.log("[AUDIO] initial mute setup");
    applyMuteState();

    return () => {
      console.log("[COMPONENT] unmount cleanup");
      stopAllAudios();
    };
  }, [applyMuteState, stopAllAudios]);

  const handleToggle = async () => {
    soundOnRef.current = !soundOnRef.current;
    setSoundOn(soundOnRef.current);

    console.log("[BUTTON] sound toggled", {
      soundOn: soundOnRef.current,
    });

    applyMuteState();

    if (soundOnRef.current) {
      await unlockAudios();
      applyMuteState();
    }
  };

  return (
    <>
      <div className="hero__media" data-aos="fade-in" data-aos-delay="300">
        <div className="hero__lottie" aria-hidden>
          {View}
        </div>
      </div>

      <div className="hero-slider-logo" data-aos="fade-up" data-aos-delay="500">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={10}
          loop
          grabCursor
          watchOverflow={false}
          loopAdditionalSlides={3}
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 10 },
            1150: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {heroLogos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="hero-slider-logo__item">
                <img src={logo.src} alt={logo.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hero-sound" data-aos="fade-up" data-aos-delay="700">
        <audio
          ref={(node) => {
            audioRefs.current[0] = node;
          }}
          src={audioWelcome}
          preload="auto"
          playsInline
          muted
        />

        <audio
          ref={(node) => {
            audioRefs.current[1] = node;
          }}
          src={audioThankYou}
          preload="auto"
          playsInline
          muted
        />

        <audio
          ref={(node) => {
            audioRefs.current[2] = node;
          }}
          src={audioSuccess}
          preload="auto"
          playsInline
          muted
        />

        <button
          type="button"
          className="btn-all hero-sound__btn--pulse"
          onClick={handleToggle}
          aria-pressed={soundOn}
        >
          {soundOn ? "Mute Sound" : "Play Sound"}
        </button>
      </div>
    </>
  );
}
