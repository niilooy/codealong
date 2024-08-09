import React from "react";
import { Badge } from "./ui/badge";

export function splitTags(tags : string) {
   return tags.split(",").map((tag) => tag.trim());
}

const TagsList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge key={tag} className="w-fit" variant="default">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagsList;
