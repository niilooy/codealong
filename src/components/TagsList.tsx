"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

const TagsList = ({ tags }: { tags: string[] }) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge
          onClick={() => router.push(`/?search=${tag}`)}
          key={tag}
          className="w-fit cursor-pointer"
          role="button"
          variant="default"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagsList;
