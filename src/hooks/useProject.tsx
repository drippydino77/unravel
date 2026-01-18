// hooks/useProject.ts
import { useState, useEffect } from "react";

export type ProjectData = {
    name: string;
    message: string;
    fontStyle: string;
    colorTheme: string;
  };
  
  export type FetchProjectResult = {
    data: ProjectData;
    templateId: string;
  };
  
  export type UseProjectReturn = {
    projectData: ProjectData | null;
    templateId: string;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    // Individual state values
    name: string;
    message: string;
    fontStyle: string;
    colorTheme: string;
    // Individual setters
    setName: (value: string) => void;
    setMessage: (value: string) => void;
    setFontStyle: (value: string) => void;
    setColorTheme: (value: string) => void;
    setTemplateId: (value: string) => void;
  };

/**
 * Hook to fetch and manage project data
 * @param projectId - The ID of the project to fetch
 * @returns Project data, loading state, error, and refetch function
 */
export function useProject(projectId: string | null | undefined): UseProjectReturn {
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [templateId, setTemplateId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    // Individual state for each field
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [fontStyle, setFontStyle] = useState("playful");
    const [colorTheme, setColorTheme] = useState("black");
  
    const fetchProject = async () => {
      if (!projectId) {
        setProjectData(null);
        setTemplateId("");
        return;
      }
  
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`/api/projects/${projectId}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch project");
        }
        
        const { data, templateId: fetchedTemplateId }: FetchProjectResult = await res.json();
        console.log(data);
        
        setProjectData(data);
        setTemplateId(fetchedTemplateId || "");
        
        // Update individual state values
        setName(data.name || "");
        setMessage(data.message || "");
        setFontStyle(data.fontStyle || "playful");
        setColorTheme(data.colorTheme || "black");
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProject();
    }, [projectId]);
  
    return {
      projectData,
      templateId,
      isLoading,
      error,
      refetch: fetchProject,
      // Individual values
      name,
      message,
      fontStyle,
      colorTheme,
      // Individual setters
      setName,
      setMessage,
      setFontStyle,
      setColorTheme,
      setTemplateId,
    };
  }
  