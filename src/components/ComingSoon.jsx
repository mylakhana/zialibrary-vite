import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ComingSoon() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-primary">
          {t("comingSoon.comingSoon") || "Coming Soon"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t("comingSoon.message") ||
            "We're working on something exciting! This feature will be available soon."}
        </p>
        <Button
          color="primary"
          variant="flat"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onPress={() => navigate(-1)}
        >
          {t("comingSoon.goBack") || "Go Back"}
        </Button>
      </div>
    </div>
  );
}

export default ComingSoon;
