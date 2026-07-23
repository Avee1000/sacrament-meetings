'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { success, z } from "zod";
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
        .min(1, "Date is required.")
        .refine((val) => {
            const d = new Date(val + "T00:00:00");
            return d.getDay() === 0;
        }, { message: "Meetings can only be scheduled on Sundays." }),
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
    stakeBusiness: z.boolean().optional().default(false),
    sacramentHymn: HymnSchema,
    specialMusicalNumber: z.string().trim().optional(),
    speakers: z
        .array(SpeakerItemSchema)
        .optional(),
    closingHymn: HymnSchema,
    closingPrayer: z
        .string()
        .trim()
        .min(1, "Closing prayer person is required.")
        .max(100),
})
.superRefine((data, ctx) => {
    // 2. If it's NOT a testimony meeting, require at least one speaker
    if (data.meetingType !== "testimony") {
        if (!data.speakers || data.speakers.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide at least one speaker.",
                path: ["speakers"],
            });
        }
    }
    // 3. If it's a testimony meeting, speakers must not exist
    if (data.meetingType === "testimony") {
        if (data.speakers && data.speakers.length > 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Testimony meetings should not have speakers.",
                path: ["speakers"],
            });
        }
    }
});

export type State = {
    errors?: {
        date?: string[];
        meetingType?: string[];
        presiding?: string[];
        conducting?: string[];
        // organist?: string[];
        // chorister?: string[];
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
 * Safely parses JSON payloads coming from the new dynamic UI fields.
 */
function safeJSONParse(value: FormDataEntryValue | null, fallback: any) {
    if (!value || typeof value !== "string") return fallback;
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

/**
 * Extracts and maps FormData fields from your newly styled UI state.
 */
function getMeetingData(formData: FormData) {
    return {
        date: String(formData.get("date") ?? ""),
        meetingType: String(formData.get("meetingType") ?? "regular"),
        presiding: String(formData.get("presiding") ?? ""),
        conducting: String(formData.get("conducting") ?? ""),
        // organist: String(formData.get("organist") ?? ""),
        // chorister: String(formData.get("chorister") ?? ""),
        announcements: safeJSONParse(formData.get("announcements"), []),
        openingHymn: safeJSONParse(formData.get("openingHymn"), { number: 0, title: "" }),
        openingPrayer: String(formData.get("openingPrayer") ?? ""),
        wardBusiness: safeJSONParse(formData.get("wardBusiness"), []),
        stakeBusiness: formData.get("stakeBusiness") === "on",
        sacramentHymn: safeJSONParse(formData.get("sacramentHymn"), { number: 0, title: "" }),
        specialMusicalNumber: String(formData.get("specialMusicalNumber") ?? ""),
        speakers: safeJSONParse(formData.get("speakers"), []),
        closingHymn: safeJSONParse(formData.get("closingHymn"), { number: 0, title: "" }),
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
            INSERT INTO meetings (
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
    return {
        success: true,
        message: "Sacrament meeting created successfully!",
    }
}

export async function deleteMeeting(id: number) {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
    revalidatePath('/meetings');
}

export async function updateSacramentMeeting(id: string | number, prevState: State, formData: FormData): Promise<State> {
    const parsed = MeetingFormSchema.safeParse(getMeetingData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update sacrament meeting.',
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
            UPDATE meetings 
            SET 
                date = ${date},
                "meetingType" = ${meetingType},
                presiding = ${presiding},
                conducting = ${conducting},
                announcements = ${(announcements || []) as any}::text[],
                "openingHymn" = ${JSON.stringify(openingHymn)}::jsonb,
                "openingPrayer" = ${openingPrayer},
                "wardBusiness" = ${JSON.stringify(wardBusiness || [])}::jsonb,
                "stakeBusiness" = ${stakeBusiness ?? false},
                "sacramentHymn" = ${JSON.stringify(sacramentHymn)}::jsonb,
                speakers = ${JSON.stringify(speakers)}::jsonb,
                "closingHymn" = ${JSON.stringify(closingHymn)}::jsonb,
                "closingPrayer" = ${closingPrayer}
            WHERE id = ${id}
        `;
    } catch (error) {
        // console.error("Database Error:", error);
        return {
            message: 'Database Error: Failed to update sacrament meeting.',
        };
    }

    revalidatePath('/meetings');
    return {
        success: true,
        message: "Sacrament meeting Updated successfully!",
        errors: {}
    }
}

function superRefine(arg0: (data: any, ctx: any) => void) {
    throw new Error("Function not implemented.");
}
