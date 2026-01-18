type SaveStatusProps = {
    status: "saving" | "saved" | "error";
  };
  
  export default function SaveStatus({ status }: SaveStatusProps) {
  
    const textMap = {
      saving: "Saving…",
      saved: "Saved ✓",
      error: "Save failed",
    };
  
    const colorMap = {
      saving: "text-gray-500",
      saved: "text-green-600",
      error: "text-red-600",
    };
  
    return (
      <div className={`text-sm font-medium ${colorMap[status]}`}>
        {textMap[status]}
      </div>
    );
  }
  