export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Project, CardData } from "@/types/project";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const {projectId} = await params

    // Use Project type for MongoDB result
    const project = (await db.collection<Project>("projects").findOne({
      projectId: projectId,
    })) as Project | null;

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Only return the data (never expose templateKey)
    return NextResponse.json({ data: project.data, templateId: project.data.templateId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
    req: Request,
    { params }: { params: { projectId: string } }
  ) {
    try {
      const { projectKey, newData } = (await req.json()) as {
        projectKey: string;
        newData: Partial<CardData>; // partial because we might not overwrite all fields
      };
      const { projectId } = await params;
  
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const project = await db.collection<Project>("projects").findOne({ projectId });
      if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
      if (project.projectKey !== projectKey) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  
      // Merge newData into existing project.data
      const updatedData = { ...project.data, ...newData };
  
      await db.collection<Project>("projects").updateOne(
        { projectId },
        { $set: { data: updatedData, updatedAt: new Date() } }
      );
  
      return NextResponse.json({ success: true, data: { projectId } });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
  }
  