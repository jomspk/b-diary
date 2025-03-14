"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Terms() {
  const locale = useLocale();
  const [markdown, setMarkdown] = useState("");

  const components = {
    h1: ({ ...props }) => <h1 className="my-4 text-bold">{props.children}</h1>,
    h2: ({ ...props }) => (
      <h2 className="mt-4 mb-2 text-bold">{props.children}</h2>
    ),
    p: ({ ...props }) => <p className="text-sm mt-2 mb-2">{props.children}</p>,
    hr: () => <hr className="my-4" />,
    ol: ({ ...props }) => (
      <ol className="list-decimal list-outside ml-4">{props.children}</ol>
    ),
  };

  useEffect(() => {
    fetch(`/terms/terms_${locale}.md`)
      .then((m) => {
        return m.text();
      })
      .then((md) => {
        setMarkdown(md);
      });
  }, []);

  return (
    <ScrollArea className="h-[200px] scroll-smooth mt-4 border-2 rounded-sm">
      <article className="prose flex-1">
        <ReactMarkdown className="py-[16px] px-[24px]" components={components}>
          {markdown}
        </ReactMarkdown>
      </article>
    </ScrollArea>
  );
}
