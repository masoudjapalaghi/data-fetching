import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";

const BoxTranslate = ({ children, sourceLanguage, targetLanguage }: { children: string; sourceLanguage?: string; targetLanguage?: string }) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const originalText = useRef(children);
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/translation/automatic_translation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI0YTc0ODktMGY0Yi00NzgwLWFmY2UtMzFmZjc5OTIxYThlIiwidHlwZSI6ImFwaV90b2tlbiJ9.obLQQVwkH7HyS1agvdVCqIUaX2RMVn87fCj1o4Rg9JM",
      },
      data: {
        providers: "amazon,google,ibm,microsoft",
        text: children,
        source_language: sourceLanguage ?? "en",
        target_language: targetLanguage ?? "fa",
        fallback_providers: "",
      },
    };
    try {
      const response = await axios.request(options);
      setTranslatedText(response.data?.google?.text);
      setIsSuccess(response.data?.google?.status === "success");
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (isTranslated) {
      setIsSuccess(false);
      if (translatedText) {
        setIsSuccess(true);
      } else {
        translateText();
      }
    }
  }, [isTranslated, translatedText]);

  return (
    <div className={`box ${isTranslated && isSuccess ? "box_rtl" : ""}`}>
      <p>{isTranslated ? (isSuccess ? translatedText : originalText.current) : originalText.current}</p>
      <div className="translate_btn" onClick={() => setIsTranslated((prev) => !prev)}>
        {isTranslated ? (
          !isSuccess ? (
            <Spinner />
          ) : (
            <div>Back to Original</div>
          )
        ) : (
          <img src="https://icons.iconarchive.com/icons/marcus-roberto/google-play/128/Google-Translate-icon.png" width="32" height="32" />
        )}
      </div>
    </div>
  );
};

export default BoxTranslate;
