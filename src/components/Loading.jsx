import { Spinner } from "@heroui/react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export default Loading;
