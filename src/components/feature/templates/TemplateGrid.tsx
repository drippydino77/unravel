import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard"; // adjust path if needed

type Template = {
  id: string;
  title: string;
  thumbnail: string;
  previewAnimation: string;
};

type TemplateGridProps = {
  templates: Template[];
  onCardClick?: (template: Template) => void;
  templateSelectedId: string | null;
  handleSelectCard: (templateId: string) => void;
};

export default function TemplateGrid({
  templates,
  templateSelectedId,
  handleSelectCard,
}: TemplateGridProps) {
  useEffect(() => {
    console.log(templateSelectedId);
  }, [templateSelectedId]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onClick={handleSelectCard}
          selected={templateSelectedId === template.id}
        />
      ))}
    </div>
  );
}
