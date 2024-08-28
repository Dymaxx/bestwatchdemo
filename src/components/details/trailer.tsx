export function Trailer({ trailer }: { trailer: string }) {
  return (
    <div className="aspect-[16/9] w-full  ">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailer}?si=8-gBlOh9ypKg2YmZ`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
