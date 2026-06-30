const PageHeader = ({
  title,
  buttonText,
  onButtonClick,
  children,
}:any) => {
  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {children}

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg font-medium transition-all duration-300"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;