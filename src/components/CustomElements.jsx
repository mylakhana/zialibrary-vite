export const fixUrl = (path) => {
  if (!path) return "/placeholder/artist.jpg";

  //if path is a url, return it
  if (path.includes("http")) {
    return path;
  }

  const s3BucketUrl = import.meta.env.VITE_S3_BUCKET_URL;
  return `${s3BucketUrl}${path}`;
};

export const PageHeader = ({
  prefix,
  title,
  description,
  endContent,
  startContent,
}) => {
  return (
    <>
      <div className="flex flex-row">
        <div
          className={`mx-6 flex ${
            startContent ? "w-[3.5rem] ml-8 mr-4 rtl:mr-8 rtl:ml-4" : "w-0"
          } justify-center items-center`}
        >
          {startContent}
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex flex-col mt-8 font-[500]">
              <p className="text-[#17C964] text-[7px] lg:text-[14px]">
                {prefix}
              </p>
              <p className="lg:text-[32px] text-[16px] font-medium sm:text-[24px] md:text-[28px]">
                {title}
              </p>
            </div>

            {/* Description Section */}
            <div className="flex flex-col mt-4">
              {description && (
                <p className="text-[14px] sm:text-[12px] md:text-[13px] lg:max-w-[600px] text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-10 flex items-center justify-center">
          {endContent}
        </div>
      </div>

      {/* Divider */}
      <div className="px-8">
        <div className="h-[1px] w-full bg-black/15 dark:bg-white/15 mt-6"></div>
      </div>
    </>
  );
};

export const formatZodErrors = (errors, t) => {
  let formattedErrors = {};
  errors.forEach((err) => {
    const path = err.path.join(".");

    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }

    formattedErrors[path] = t(err.message);
  });
  return formattedErrors;
};

export const KeyValueWidget = ({ title, value, valueWidget, className }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-gray-500 dark:text-gray-400 text-xl">{title}</p>
      {valueWidget ? (
        valueWidget
      ) : (
        <p className={`text-xl font-light ${className}`}>{value}</p>
      )}
    </div>
  );
};

export const NoResultsFound = ({ message = "No results found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <svg
        className="w-16 h-16 text-on-surface-variant mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-on-surface mb-2">{message}</h3>
      <p className="text-on-surface-variant">
        Try adjusting your search or filter to find what you're looking for
      </p>
    </div>
  );
};
