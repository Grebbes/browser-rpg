import PixelImage from "@/components/pixel/PixelImage";
export default function StartScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [container-type:size]"
    >
      <div className="absolute bottom-0 left-0 aspect-[16/10] w-[max(100cqw,160cqh)] portrait:aspect-[9/16] portrait:w-[max(100cqw,56.25cqh)]">
        <picture>
          <source
            media="(orientation: portrait)"
            srcSet="/ui/start-scene-portrait.png"
          />
          <PixelImage
            src="/ui/start-scene.png"
            className="absolute inset-0 h-full w-full"
          />
        </picture>
        <div className="absolute top-[70.25%] left-[13.75%] h-[23%] w-[10%] bg-[url(/ui/hero-idle.png)] [background-size:400%_100%] pixelated animate-hero-idle motion-reduce:animate-none portrait:top-[81.41%] portrait:left-[24.44%] portrait:h-[14.38%] portrait:w-[17.78%]" />

        <div className="absolute top-[79.25%] left-[24.375%] h-[16%] w-[10%] bg-[url(/ui/campfire.png)] [background-size:400%_100%] pixelated animate-campfire motion-reduce:animate-none portrait:top-[87.03%] portrait:left-[43.33%] portrait:h-[10%] portrait:w-[17.78%]" />
      </div>
    </div>
  );
}
