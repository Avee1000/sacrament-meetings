'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

// Zod schemas mirroring your TypeScript interfaces and form requirements
const HymnSchema = z.object({
    number: z.coerce.number().int().min(1, "Hymn number is required."),
    title: z.string().trim().min(1, "Hymn title is required.").max(100, "Title is too long."),
});

const SpeakerItemSchema = z.object({
    name: z.string().trim().min(1, "Speaker name is required.").max(100, "Name is too long."),
    topic: z.string().trim().optional(),
    type: z.enum(["speaker", "musical-number"]).default("speaker"),
});

const WardBusinessItemSchema = z.object({
    description: z.string().trim().min(1, "Business description is required.").max(500, "Description is too long."),
});

const MeetingFormSchema = z.object({
    date: z
        .string()
        .trim()
        .min(1, "Date is required."),
    meetingType: z.enum(
        ["testimony", "regular", "stake", "general"],
        { message: "Please select a valid meeting type." }
    ).default("regular"),
    presiding: z
        .string()
        .trim()
        .min(1, "Presiding authority is required.")
        .max(100, "Presiding name must be less than 100 characters."),
    conducting: z
        .string()
        .trim()
        .min(1, "Conducting leader is required.")
        .max(100, "Conducting name must be less than 100 characters."),
    // organist: z.string().trim().min(1, "Organist is required.").max(100),
    // chorister: z.string().trim().min(1, "Chorister is required.").max(100),
    announcements: z.array(z.string().trim().max(300)).optional(),
    openingHymn: HymnSchema,
    openingPrayer: z
        .string()
        .trim()
        .min(1, "Opening prayer person is required.")
        .max(100),
    wardBusiness: z.array(WardBusinessItemSchema).optional(),
    stakeBusiness: z.boolean().optional(),
    sacramentHymn: HymnSchema,
    specialMusicalNumber: z.string().trim().optional(),
    speakers: z
        .array(SpeakerItemSchema)
        .min(1, "Please provide at least one speaker."),
    closingHymn: HymnSchema,
    closingPrayer: z
        .string()
        .trim()
        .min(1, "Closing prayer person is required.")
        .max(100),
});

export type State = {
    errors?: {
        date?: string[];
        meetingType?: string[];
        presiding?: string[];
        conducting?: string[];
        organist?: string[];
        chorister?: string[];
        announcements?: string[];
        openingHymn?: string[];
        openingPrayer?: string[];
        wardBusiness?: string[];
        stakeBusiness?: string[];
        sacramentHymn?: string[];
        specialMusicalNumber?: string[];
        speakers?: string[];
        closingHymn?: string[];
        closingPrayer?: string[];
    };
    message?: string | null;
    success?: boolean;
};

/**
 * Helper to safely parse hymn inputs which might come in as 
 * "193 - I Stand All Amazed" or as a structured object.
 */
function parseHymnInput(rawInput: string | null) {
    if (!rawInput) return { number: 0, title: "" };
    const trimmed = rawInput.trim();
    const match = trimmed.match(/^(\d+)(?:\s*[-–:]\s*(.*))?$/);
    if (match) {
        return {
            number: parseInt(match[1], 10),
            title: match[2] ? match[2].trim() : "Hymn",
        };
    }
    return { number: 0, title: trimmed };
}

/**
 * Extracts and maps FormData fields to match your Zod schema and UI state.
 */
function getMeetingData(formData: FormData) {
    // Speakers are passed from the client tag-input as a comma-separated string
    const rawSpeakers = formData.get("speakers");
    let speakersList: any[] = [];

    if (typeof rawSpeakers === "string" && rawSpeakers.trim() !== "") {
        speakersList = rawSpeakers
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((name) => ({
                name,
                topic: "TBD", // Default or adjust if your form handles topics separately
                type: "speaker",
            }));
    }

    return {
        date: String(formData.get("date") ?? ""),
        meetingType: String(formData.get("meetingType") ?? "regular"),
        presiding: String(formData.get("presiding") ?? ""),
        conducting: String(formData.get("conducting") ?? ""),
        organist: String(formData.get("organist") ?? ""),
        chorister: String(formData.get("chorister") ?? ""),
        announcements: [],
        openingHymn: parseHymnInput(String(formData.get("openingHymn") ?? "")),
        openingPrayer: String(formData.get("openingPrayer") ?? ""),
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: parseHymnInput(String(formData.get("sacramentHymn") ?? "")),
        specialMusicalNumber: String(formData.get("specialMusicalNumber") ?? ""),
        speakers: speakersList,
        closingHymn: parseHymnInput(String(formData.get("closingHymn") ?? "")),
        closingPrayer: String(formData.get("closingPrayer") ?? ""),
    };
}

export async function createSacramentMeeting(prevState: State, formData: FormData): Promise<State> {
    const parsed = MeetingFormSchema.safeParse(getMeetingData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create sacrament meeting.',
        };
    }

    const {
        date,
        meetingType,
        presiding,
        conducting,
        announcements,
        openingHymn,
        openingPrayer,
        wardBusiness,
        stakeBusiness,
        sacramentHymn,
        speakers,
        closingHymn,
        closingPrayer,
    } = parsed.data;

    try {
        await sql`
            INSERT INTO sacrament_meetings (
                date, "meetingType", presiding, conducting, 
                announcements, "openingHymn", "openingPrayer", 
                "wardBusiness", "stakeBusiness", "sacramentHymn", 
                speakers, "closingHymn", "closingPrayer"
            ) VALUES (
                ${date}, ${meetingType}, ${presiding}, ${conducting},
                ${(announcements || []) as any}::text[], ${JSON.stringify(openingHymn)}::jsonb, ${openingPrayer},
                ${JSON.stringify(wardBusiness || [])}::jsonb, ${stakeBusiness ?? false}, ${JSON.stringify(sacramentHymn)}::jsonb,
                ${JSON.stringify(speakers)}::jsonb, ${JSON.stringify(closingHymn)}::jsonb, ${closingPrayer}
            )
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: 'Database Error: Failed to create sacrament meeting.',
        };
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    await sql`DELETE FROM sacrament_meetings WHERE id = ${id}`;
    revalidatePath('/meetings');
}