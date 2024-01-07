"use client"
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import Link from "next/link";
import { MouseEvent } from "react";
type Props = { href?: string; title?: string; children: string; sourceLanguage?: string; targetLanguage?: string };

const BoxTranslate = ({ children, sourceLanguage, targetLanguage, href, title }: Props) => {
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
  const handleTranslate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsTranslated((prev) => !prev);
    return false;
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
  const Component = href ? Link : "div";
  return (
    <Component href={href ?? ""} className={`box ${href ? "box_link" : ""} ${isTranslated && isSuccess ? "box_rtl" : ""}`}>
      <div>
        <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
        <p>{isTranslated ? (isSuccess ? translatedText : originalText.current) : originalText.current}</p>
      </div>
      <div className="translate_btn" onClick={handleTranslate}>
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
    </Component>
  );
};

export default BoxTranslate;
