"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import CardCustomizationSidebar from "@/components/feature/create/CardCustomizationsSidebar";
import AnimationPreview from "@/components/feature/create/AnimationPreview";
import { LuMenu, LuX } from "react-icons/lu";
import { ColorTheme } from "@/types/color";
import debounce from "lodash.debounce";
import { useProject } from "@/hooks/useProject";

type FontStyle = "playful" | "elegant" | "modern";

export default function Page() {
  const params = useParams();
  const projectId = Array.isArray(params?.projectId)
    ? params?.projectId[0]
    : params?.projectId;
  const router = useRouter();

  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saved");

  // Mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    name, 
    message, 
    fontStyle, 
    colorTheme, 
    templateId,
    setName, 
    setMessage, 
    setFontStyle, 
    setColorTheme,
    setTemplateId,
    isLoading, 
    error 
  } = useProject(projectId);
  

  /** -------------------
   * Auto-save logic
   * ------------------- */
  const autoSave = useRef(
    debounce(async (data) => {
      try {
        setSaveStatus("saving");

        const projectKey = localStorage.getItem(`project-auth:${projectId}`);
        if (!projectKey) return;

        const res = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectKey, newData: data }),
        });

        if (!res.ok) throw new Error("Failed to auto-save");

        setSaveStatus("saved");
      } catch (err) {
        console.error("Auto-save error:", err);
        setSaveStatus("error");
      }
    }, 1000)
  ).current;

  // Trigger auto-save whenever any of these change (but skip initial load)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    autoSave({ name, message, fontStyle, colorTheme });
    
    return () => {
      autoSave.cancel();
    };
  }, [name, message, fontStyle, colorTheme, autoSave]);

  /** -------------------
   * Handlers
   * ------------------- */
  const handlePreviewShare = () => {
    console.log("Preview & Share clicked", {
      name,
      message,
      fontStyle,
      colorTheme,
    });
  };

  const handleBack = () => {
    router.push(`/templates?projectId=${projectId}`);
  };

  if (!projectId) return <p>Project ID missing</p>;
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg p-2 shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <CardCustomizationSidebar
        name={name}
        message={message}
        fontStyle={fontStyle}
        colorTheme={colorTheme}
        onNameChange={setName}
        onMessageChange={setMessage}
        onFontStyleChange={setFontStyle}
        onColorChange={setColorTheme}
        onPreviewShare={handlePreviewShare}
        onBack={handleBack}
        status={saveStatus}
        projectId={projectId}
      />

      {/* Main Content */}
      <AnimationPreview
  templateId={templateId}
  fontStyle={fontStyle}
  colorTheme={colorTheme}
  name={name}
  message={message}
/>
    </div>
  );
}