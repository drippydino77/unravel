import Card from "@/components/ui/Card";
import Image from "next/image";
import { useState, useRef } from "react";

type Template = {
  id: string;
  title: string;
  thumbnail: string; // static first frame
  previewAnimation: string; // mp4 / webm
};

type TemplateCardProps = {
  template: Template;
  onClick?: (templateId: string) => void;
  selected: boolean;
};

export default function TemplateCard({
  template,
  onClick,
  selected,
}: TemplateCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // restart video
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Card
      onClick={(e) => {
        onClick?.(template.id);
        e.stopPropagation();
      }}
      className="
        group relative overflow-hidden cursor-pointer
        transition-shadow duration-300 hover:shadow-xl aspect-square
      "
      selected={selected}
    >
      {/* Image / Video Layer */}
      <div
        className="absolute inset-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail */}
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className={`
            object-cover transition-all duration-300
            ${hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"}
          `}
        />

        {/* Video */}
        <video
          ref={videoRef}
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-all duration-300
            ${hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"}
          `}
          muted
          loop
          playsInline
        >
          <source src={template.previewAnimation} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Title Pill */}
      <div
        className="
          pointer-events-none
          absolute bottom-3 right-3
          bg-white/90 backdrop-blur
          px-3 py-1.5 rounded-full
          text-sm font-medium text-gray-900
          transition-transform duration-300
          group-hover:scale-105
        "
      >
        {template.title}
      </div>
    </Card>
  );
}
