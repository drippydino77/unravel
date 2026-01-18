export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { nanoid } from "nanoid";
import { Project, CardData } from "@/types/project";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { templateId } = (await req.json()) as { templateId: string };

    if (!templateId) {
      return NextResponse.json(
        { error: "templateId is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Generate IDs
    const projectId = nanoid(8);    // public
    const projectKey = nanoid(16);  // private

    // Default card object including templateId
    const defaultCardData: CardData = {
      templateId: templateId,        // <-- moved inside data
      name: "",
      message: "",
      fontStyle: "playful",
      colorTheme: "black",
    };

    // Project object typed
    const project: Project = {
      projectId,
      projectKey,
      data: defaultCardData, // templateId is now inside data
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("projects").insertOne(project);

    // Return public info only
    return NextResponse.json({ projectId, projectKey, data: defaultCardData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
