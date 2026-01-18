"use client";

import React from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import Card from "@/components/ui/Card";
import TitleText from "@/components/ui/TitleText";
import SubtitleText from "@/components/ui/SubtitleText";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import ColorSelector from "@/components/ui/ColorSelector";
import cn from "@/lib/helpers/cn";
import BackButton from "@/components/ui/BackButton";
import ScrollArea from "@/components/ui/ScrollArea";
import { ColorTheme } from "@/types/color";
import Link from "next/link";
import SaveStatus from "@/components/ui/SaveStatus";

type FontStyle = "playful" | "elegant" | "modern";

type CardCustomizationSidebarProps = {
  name?: string;
  status: "saving" | "saved" | "error";
  message?: string;
  fontStyle?: FontStyle;
  colorTheme?: ColorTheme;
  projectId: string
  onNameChange?: (name: string) => void;
  onMessageChange?: (message: string) => void;
  onFontStyleChange?: (style: FontStyle) => void;
  onColorChange?: (color: ColorTheme) => void;
  onPreviewShare?: () => void;
  onBack?: () => void;
  className?: string;
};

const fontStyles: { id: FontStyle; label: string }[] = [
  { id: "playful", label: "Playful" },
  { id: "elegant", label: "Elegant" },
  { id: "modern", label: "Modern" },
];

export default function CardCustomizationSidebar({
  name = "",
  message = "",
  fontStyle = "playful",
  colorTheme = "black",
  onNameChange,
  onMessageChange,
  onFontStyleChange,
  onColorChange,
  onPreviewShare,
  onBack,
  status,
  className,
  projectId
}: CardCustomizationSidebarProps) {
  return (
    <ScrollArea
      className={cn(
        "w-full max-w-md bg-white px-6 flex flex-col gap-6",
        className
      )}
    >
      {/* Back button */}
      <div className="flex justify-between">
        <BackButton label="Templates" onClick={onBack} />
        <SaveStatus status={status} />
      </div>

      {/* Header */}
      <div>
        <TitleText variant="card">Customize your card</TitleText>
        <SubtitleText variant="medium" className="text-gray-600 mt-1">
          Make it personal and unique
        </SubtitleText>
      </div>

      {/* Your Name Input */}
      <div>
        <TextInput
          label="Your Name"
          value={name}
          onChange={(e) => onNameChange?.(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* Your Message */}
      <div>
        <TextArea
          label="Your Message"
          value={message}
          onChange={(value) => onMessageChange?.(value)}
          placeholder="Enter your message..."
          maxLength={500}
          minHeight={120}
        />
      </div>

      {/* Font Style */}
      <div>
        <SubtitleText variant="medium" className="font-medium mb-3">
          Font Style
        </SubtitleText>
        <div className="grid grid-cols-3 gap-3">
          {fontStyles.map((style) => (
            <Card
              key={style.id}
              selected={fontStyle === style.id}
              onClick={() => onFontStyleChange?.(style.id)}
              className="cursor-pointer p-4 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <SubtitleText variant="medium" className="text-center">
                {style.label}
              </SubtitleText>
            </Card>
          ))}
        </div>
      </div>

      {/* Color Theme */}
      <div>
        <SubtitleText variant="medium" className="font-medium mb-3">
          Color Theme
        </SubtitleText>
        <ColorSelector
          selectedColor={colorTheme}
          onColorChange={onColorChange}
        />
      </div>

      {/* Preview & Share Button */}
      <Link href={`/share/${projectId}`}>
        <ButtonWithIcon
          onClick={onPreviewShare}
          className="mt-7 flex items-center justify-center"
        >
          <span>Preview & Share</span>
          <LuArrowRight size={20} />
        </ButtonWithIcon>
      </Link>
    </ScrollArea>
  );
}
