"use client";

import TitleText from "@/components/ui/TitleText";
import SubtitleText from "@/components/ui/SubtitleText";
import TemplateGrid from "@/components/feature/templates/TemplateGrid";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { LuArrowRight } from "react-icons/lu";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ScrollArea from "@/components/ui/ScrollArea";

export default function TemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Optional projectId for PATCHing
  const projectId = searchParams.get("projectId");
  const projectKey = projectId
    ? localStorage.getItem(`project-auth:${projectId}`)
    : undefined;

  const templates = [
    {
      id: "1",
      title: "Fortune cookie 1",
      thumbnail: "https://i.imgur.com/EvJNDuV.png",
      previewAnimation: "https://i.imgur.com/a9kToEL.mp4",
    },
    {
      id: "2",
      title: "Fortune cookie 2",
      thumbnail: "https://i.imgur.com/EvJNDuV.png",
      previewAnimation: "https://i.imgur.com/a9kToEL.mp4",
    },
    {
      id: "3",
      title: "Fortune cookie 3",
      thumbnail: "https://i.imgur.com/EvJNDuV.png",
      previewAnimation: "https://i.imgur.com/a9kToEL.mp4",
    },
  ];

  const [templateSelectedId, setTemplateSelectedId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleSelectCard = (templateId: string) => {
    setTemplateSelectedId(templateId);
  };

  const handleContinue = async () => {
    if (!templateSelectedId) return;

    setLoading(true);

    try {
      let res: Response;

      if (projectId && projectKey) {
        // PATCH existing project
        res = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectKey,
            newData: { templateId: templateSelectedId },
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update project");

        // Navigate back to the same create page after update
        router.push(`/create/${projectId}`);
      } else {
        // POST to create new project
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId: templateSelectedId }),
        });

        const data = await res.json();
        if (!res.ok || !data.projectId || !data.projectKey)
          throw new Error(data.error || "Failed to create project");

        // Save projectKey for later PATCH
        localStorage.setItem(`project-auth:${data.projectId}`, data.projectKey);

        router.push(`/create/${data.projectId}`);
      }
    } catch (err) {
      console.error("Error continuing:", err);
      alert("Failed to continue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea
      className="flex h-full flex-col items-center bg-background"
      onClick={() => setTemplateSelectedId(null)} // optional: clicking outside clears selection
    >
      {/* Title */}
      <TitleText variant="title" className="text-center mb-2">
        Choose Your Template
      </TitleText>

      {/* Subtitle */}
      <SubtitleText variant="medium" className="text-center mb-8">
        Pick a starting style — you can customize everything later
      </SubtitleText>

      {/* Template Cards Grid */}
      <TemplateGrid
        templates={templates}
        templateSelectedId={templateSelectedId}
        handleSelectCard={handleSelectCard}
      />

      {/* Continue Button */}
      {templateSelectedId && (
        <ButtonWithIcon
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleContinue}
        >
          <span>{loading ? "Saving..." : "Continue"}</span>
          <LuArrowRight size={20} />
        </ButtonWithIcon>
      )}
    </ScrollArea>
  );
}
