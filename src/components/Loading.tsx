function Loading() {
  return (
    <div className="absolute w-screen h-screen flex flex-col gap-2 justify-center items-center inset-0 bg-white bg-opacity-50 z-10">
      <div className="absolute flex flex-row gap-2 justify-center bg-white bg-opacity-80 p-8 rounded-full shadow-2xl blur shadow-indigo-200">
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 w-3 h-3"></div>
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 delay-100 w-3 h-3"></div>
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 delay-200 w-3 h-3"></div>
      </div>
      <div className="absolute flex flex-row gap-2 justify-center p-8 rounded-full">
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 w-3 h-3"></div>
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 delay-100 w-3 h-3"></div>
        <div className="bg-indigo-600 rounded-full animate-bounce duration-500 delay-200 w-3 h-3"></div>
      </div>
    </div>
  );
}

export default Loading;
