import { Stack } from "@mui/material";
import React from "react";
import CustomChip from "./CustomChip";

const TagsWrapper = ({ tags, selectedSkillId, setSelectedSkillId }) => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {tags.map((tag, index) => (
        <CustomChip
          onClick={() => setSelectedSkillId(tag.id)}
          key={index}
          id={tag.id}
          label={tag.title}
          selectedSkillId={selectedSkillId}
        />
      ))}
    </Stack>
  );
};

export default TagsWrapper;
