"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Terms() {
  const [markdown, setMarkdown] = useState("");

  const components = {
    h1: ({ ...props }) => <h1 className="my-4 text-bold">{props.children}</h1>,
    h2: ({ ...props }) => (
      <h2 className="mt-4 mb-2 text-bold">{props.children}</h2>
    ),
    hr: () => <hr className="my-4" />,
  };

  useEffect(() => {
    fetch(`/terms.md`)
      .then((m) => {
        return m.text();
      })
      .then((md) => {
        setMarkdown(md);
      });
  }, []);

  return (
    <ScrollArea className="h-[300px] scroll-smooth mt-4 border-2 rounded-sm">
      <article className="prose flex-1">
        <ReactMarkdown className="py-6 px-4" components={components}>
          {markdown}
        </ReactMarkdown>
      </article>
    </ScrollArea>
  );
}
