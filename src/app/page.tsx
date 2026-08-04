import Snippet from "@/components/Snippet";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-start justify-center p-10 bg-white">
      <Snippet
        handle="penguinkids_mx"
        timestamp="Jul 29, 2026 16:25"
        body={`is text that reads "Conoce la extraordinaria historia de Don Florencio de Polvorín y su prodigiosa profesión, de Gabriela Riveros." The bottom of the graphic includes the Penguin Random House logo and the Alfaguara logo, set against a sandy, desert-like background.`}
        metrics={{ views: 10, likes: 10, comments: 0, reposts: -1, stars: 10 }}
        sentiment="negative"
        tag="Caption"
      />
    </main>
  );
}
