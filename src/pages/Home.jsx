import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/CustomElements";
import Loading from "../components/Loading";

function Home() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Zia Library - Home";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-full overflow-x-hidden flex flex-col h-full">
      <PageHeader
        prefix={t("common.welcome")}
        title={t("common.title")}
        description={t("common.description")}
      />

      {/* Content Window */}
      <div className="flex-1 p-8">
        <div className="flex h-full flex-col lg:flex-row">
          <h2>hello world</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
