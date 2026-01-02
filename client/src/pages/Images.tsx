import Button from "../components/Button";
import { useGetImages } from "../hooks/api";

const Images = () => {
  const { data: images, isLoading } = useGetImages();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm font-medium animate-pulse uppercase tracking-widest">Loading Library...</p>
      </div>
    );
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen border-2 border-dashed border-black/10 m-8 rounded-xl">
        <p className="text-sm text-gray-500 italic">No assets found in your gallery.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="mb-12 border-b border-black pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tighter uppercase">Gallery</h1>
          <p className="text-xs mt-2 text-gray-400">Manage your uploaded assets and metadata</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{images.length}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Items</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {images.map((img) => (
          <div key={img.id} className="group flex flex-col space-y-4">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden ">

               <img src={img.url} alt="User upload" className="w-full h-auto" />
              {/* <img
                src={img.url}
                alt={img.name || "Upload"}
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
              /> */}
              <div className="absolute top-3 right-3">
                <span className="bg-black text-white text-[9px] px-2 py-1 uppercase tracking-tighter font-bold">
                  {img.cached ? "Cached" : "S3 Live"}
                </span>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold truncate max-w-[200px] uppercase tracking-tight">
                  {img.name || "unnamed_file"}
                </h3>
                {/* <p className="text-[10px] font-mono border border-black px-1">
                  {img.mimeType.split('/')[1].toUpperCase()}
                </p> */}
              </div>

              <div className="grid grid-cols-2 gap-y-2 border-t border-black/10 pt-3">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Size</p>
                  <p className="text-xs font-medium">
                    {img.size ? (img.size / 1024).toFixed(2) : "0"} KB
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Created</p>
                  <p className="text-xs font-medium">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] text-gray-400 uppercase">S3 Key</p>
                  <p className="text-[10px] font-mono text-gray-600 truncate">
                    {img.s3Key}
                  </p>
                </div>
              </div>

              <Button className="w-full border border-black py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors duration-300">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;