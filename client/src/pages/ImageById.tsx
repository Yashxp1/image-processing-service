import { useGetImageById } from "../hooks/api";
import { useParams } from "react-router-dom";

const ImageById = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetImageById(id as string);

  const handleDownload = async () => {
    try {
      const imageUrl = data?.data.url;
      if (!imageUrl) return;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = data?.data.name || "download.jpg";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1F1F1F] text-zinc-500 font-light tracking-[0.3em] uppercase text-[10px]">
        Loading Asset
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1F1F1F] text-zinc-200 text-sm font-medium border border-zinc-700 p-8">
        Error loading image asset.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white font-sans selection:bg-zinc-800 selection:text-zinc-200">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-light tracking-tighter leading-none">
              {data?.data?.name}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-medium">
              Recorded:{" "}
              {new Date(data?.data.createdAt || "").toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full uppercase">
              {data?.data.mimeType.split("/")[1]}
            </span>
          </div>
        </header>

        <div className="relative group mb-20">
          <div className="absolute -inset-1 bg-gradient-to-b from-zinc-700 to-transparent opacity-20 blur-xl"></div>
          <div className="relative bg-zinc-800/50 border border-zinc-700/50 overflow-hidden flex items-center justify-center p-4 md:p-12">
            <img
              src={data?.data.url}
              alt={data?.data.name || ""}
              className="max-h-[75vh] w-auto object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-700 pt-12">
          <div className="md:col-span-4 space-y-8">
            <section>
              <h3 className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] mb-6">
                File Specifications
              </h3>
              <div className="space-y-4 text-sm font-light">
                <div className="flex justify-between border-b border-zinc-700 pb-2">
                  <span className="text-zinc-500">Weight</span>
                  <span className="text-zinc-300">
                    {((data?.data?.size || 0) / 1024).toFixed(2)} KB
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-700 pb-2">
                  <span className="text-zinc-500">State</span>
                  <span className="text-zinc-300">
                    {data?.data?.isEdited
                      ? "Post-Processed"
                      : "Source Material"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] mb-6">
              Storage Path
            </h3>
            <div className="bg-zinc-800/30 p-4 border border-zinc-700 rounded-sm">
              <p className="font-mono text-[11px] text-zinc-400 break-all leading-relaxed">
                {data?.data.s3Key}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col justify-end">
            <button
              onClick={handleDownload}
              className="group relative bg-white text-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all duration-300 w-full"
            >
              Download Asset
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageById;
