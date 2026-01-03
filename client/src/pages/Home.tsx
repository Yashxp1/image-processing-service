import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const techStack = [
    { name: "Sharp", desc: "Image Transformation" },
    { name: "AWS S3", desc: "Object Storage" },
    { name: "CloudFront", desc: "CDN Distribution" },
    { name: "Redis", desc: "Rate Limiting & Cache" },
    { name: "Express + TS", desc: "API Server" },
    { name: "JWT", desc: "Authentication" },
    { name: "Docker", desc: "Containerization" },
  ];

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white font-sans flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto px-8 py-20">
        <header className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-4">
            Backend Project
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
            Image Processing
            <br />
            <span className="text-zinc-400">Service</span>
          </h1>
          <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
            A backend-focused service for image transformation, storage, and
            delivery. Built to demonstrate server-side architecture and cloud
            integration.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-zinc-700 pb-2">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="border border-zinc-700 p-4 hover:bg-black/30 hover:border-zinc-500 transition-colors"
              >
                <p className="text-sm font-medium text-zinc-100">{tech.name}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4 border-b border-zinc-700 pb-2">
            Frontend
          </h2>
          <p className="text-zinc-300 text-sm">
            React + TypeScript with TanStack Query — kept minimal to emphasize
            backend architecture.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
          <a
            href="https://github.com/Yashxp1/image-processing-service"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-zinc-600 text-zinc-300 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-medium hover:border-zinc-400 hover:text-zinc-100 transition-colors text-center"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <footer className="border-t border-zinc-700 py-6 px-8">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-widest">
          <a
            href="https://github.com/Yashxp1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Yashxp1</span>
          </a>
          <span>2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
