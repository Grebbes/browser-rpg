import PixelImage from "@/components/pixel/PixelImage";
export default function StartScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [container-type:size]"
    >
      <div className="absolute bottom-0 left-0 aspect-[16/10] w-[max(100cqw,160cqh)]">
        <PixelImage
          src="/ui/start-scene.png"
          className="absolute inset-0 h-full w-full"
        />

        <div className="absolute top-[77.25%] left-[13.75%] h-[16%] w-[10%] bg-[url(/ui/hero-idle.png)] [background-size:200%_100%] pixelated animate-hero-idle motion-reduce:animate-none" />

        <div className="absolute top-[79.25%] left-[24.375%] h-[16%] w-[10%] bg-[url(/ui/campfire.png)] [background-size:400%_100%] pixelated animate-campfire motion-reduce:animate-none" />
      </div>
    </div>
  );
}
