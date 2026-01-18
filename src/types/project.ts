import { ColorTheme } from "@/types/color";
import { FontStyle } from "@/types/fontStyle";

// Type for a single card's data
export type CardData = {
  name: string;
  message: string;
  fontStyle: FontStyle;
  colorTheme: ColorTheme;
  templateId: string;     // selected by client
};

// Type for the project object
export type Project = {
  projectId: string;      // public
  projectKey: string;    // private
  data: CardData;         // defaultCardData structure
  createdAt: Date;
  updatedAt: Date;
};
