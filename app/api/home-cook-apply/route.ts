import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Demo admin database — stored as JSON file in /data/submissions.json
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readSubmissions() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

// POST /api/home-cook-apply — save a new application
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const required = ["name", "phone", "locality", "availability", "cuisines"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const submissions = readSubmissions();
    const entry = {
      id: `KQ-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "pending",
      ...body,
    };
    submissions.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err) {
    console.error("[home-cook-apply] POST error:", err);
    return NextResponse.json(
      { success: false, error: "Server error — please try again." },
      { status: 500 }
    );
  }
}

// GET /api/home-cook-apply — return all submissions (admin use)
export async function GET() {
  try {
    const submissions = readSubmissions();
    return NextResponse.json({ success: true, count: submissions.length, submissions });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Could not read submissions." }, { status: 500 });
  }
}

// PATCH /api/home-cook-apply — update submission status
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "id and status required" }, { status: 400 });
    }
    const submissions = readSubmissions();
    const idx = submissions.findIndex((s: { id: string }) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
    }
    submissions[idx].status = status;
    submissions[idx].updatedAt = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    return NextResponse.json({ success: true, submission: submissions[idx] });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Could not update submission." }, { status: 500 });
  }
}

