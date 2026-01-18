"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import CardCustomizationSidebar from "@/components/feature/create/CardCustomizationsSidebar";
import AnimationPreview from "@/components/feature/create/AnimationPreview";
import { LuMenu, LuX } from "react-icons/lu";
import { ColorTheme } from "@/types/color";
import debounce from "lodash.debounce";; // npm i lodash.debounce

type FontStyle = "playful" | "elegant" | "modern";

export default function Page() {
  const params = useParams();
  console.log(params)
  const projectId = Array.isArray(params?.projectId)
    ? params?.projectId[0]
    : params?.projectId;

  const router = useRouter();

  // Sidebar state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [fontStyle, setFontStyle] = useState<FontStyle>("playful");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("black");
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saved");


  // Mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  
        // Optional: revert back to idle after 2s
      } catch (err) {
        console.error("Auto-save error:", err);
        setSaveStatus("error");
      }
    }, 1000)
  ).current;
  
  

  // Trigger auto-save whenever any of these change
  useEffect(() => {
    autoSave({ name, message, fontStyle, colorTheme });
    // Cancel debounce on unmount
    return () => {
      autoSave.cancel();
    };
  }, [name, message, fontStyle, colorTheme, autoSave]);

  if (!projectId) return <p>Project ID missing</p>;


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
      />

      {/* Main Content */}
      <AnimationPreview
        templateId={projectId} // or pass actual templateId if stored in data
        fontStyle={fontStyle}
        colorTheme={colorTheme}
      />
      
    </div>
  );
}
