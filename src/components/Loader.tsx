"use client";
function Loader() {
  return (
    <div className="bg-black fixed inset-0 bg-opacity-80 flex items-center justify-center z-[9999]">
      <div className="h-14 w-14 border-[7px] border-white border-t-black border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;