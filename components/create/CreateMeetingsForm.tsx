'use client'

import { type State } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { useState, KeyboardEvent, useRef, useActionState, useEffect } from "react";
import { X, Calendar, UserCheck, Speaker, Music, Mic, BookOpen, Send, Sparkles, Plus, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { createSacramentMeeting } from "@/lib/action";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { redirect } from 'next/navigation';


const initialState: State = {
    message: null,
    errors: {},
    success: false
};

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            disabled={pending}
            className="w-full sm:w-auto px-8 py-3 text-sm font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 transform active:scale-95"
            style={{
                backgroundColor: 'var(--color-button-bg)',
                color: 'var(--color-button-text)'
            }}
        >
            {pending ? (
                <>
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    <span>Publishing Program...</span>
                </>
            ) : (
                <>
                    <Send className="w-4 h-4" />
                    <span>Create Sacrament Program</span>
                </>
            )}
        </Button>
    );
}

// Interface for advanced speakers state mapping
interface SpeakerInputRow {
    name: string;
    topic: string;
    type: 'speaker' | 'musical-number';
}

interface BusinessInputRow {
    description: string;
}

export default function CreateMeetingForm() {
    const [state, formAction] = useActionState(
        createSacramentMeeting,
        initialState
    );

    // Complex state handlers matching database structure
    const [speakers, setSpeakers] = useState<SpeakerInputRow[]>([
        { name: '', topic: '', type: 'speaker' }
    ]);
    const [wardBusiness, setWardBusiness] = useState<BusinessInputRow[]>([]);
    const [announcementsList, setAnnouncementsList] = useState<string[]>([]);
    const [announcementInput, setAnnouncementInput] = useState('');
    const annInputRef = useRef<HTMLInputElement>(null);

    // Hymn split state inputs to match HymnSchema ({ number, title })
    const [openingHymnNum, setOpeningHymnNum] = useState('');
    const [openingHymnTitle, setOpeningHymnTitle] = useState('');

    const [sacramentHymnNum, setSacramentHymnNum] = useState('');
    const [sacramentHymnTitle, setSacramentHymnTitle] = useState('');

    const [closingHymnNum, setClosingHymnNum] = useState('');
    const [closingHymnTitle, setClosingHymnTitle] = useState('');

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            redirect('/meetings');
        } else if (state.message) {
            toast.error(state.message, {
                description: (
                    <ul className="list-disc pl-5">
                        {state.errors && Object.entries(state.errors).map(([key, value]) => (
                            <li key={key} className="text-red-400">
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                ),
                cancel: { 
                    label: 'Cancel', 
                    onClick: () => {} 
                },
                icon: <AlertCircle className="size-5"/>
            });
        }
    }, [state]);

    // Speaker state managers
    const addSpeakerRow = () => {
        setSpeakers([...speakers, { name: '', topic: '', type: 'speaker' }]);
    };

    const removeSpeakerRow = (index: number) => {
        setSpeakers(speakers.filter((_, i) => i !== index));
    };

    const updateSpeaker = (index: number, field: keyof SpeakerInputRow, value: string) => {
        const updated = [...speakers];
        updated[index][field] = value as any;
        setSpeakers(updated);
    };

    // Ward Business managers
    const addBusinessRow = () => {
        setWardBusiness([...wardBusiness, { description: '' }]);
    };

    const removeBusinessRow = (index: number) => {
        setWardBusiness(wardBusiness.filter((_, i) => i !== index));
    };

    const updateBusiness = (index: number, value: string) => {
        const updated = [...wardBusiness];
        updated[index].description = value;
        setWardBusiness(updated);
    };

    // Announcements tag list manager
    const addAnnouncement = (value: string) => {
        const trimmed = value.trim();
        if (trimmed && !announcementsList.includes(trimmed)) {
            setAnnouncementsList([...announcementsList, trimmed]);
        }
        setAnnouncementInput('');
    };

    const handleAnnouncementKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addAnnouncement(announcementInput);
        } else if (e.key === 'Backspace' && !announcementInput && announcementsList.length > 0) {
            setAnnouncementsList(announcementsList.slice(0, -1));
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-background)' }}
        >
            <main className="max-w-4xl w-full mx-auto">
                {/* Card Container */}
                <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-300">

                    {/* Header Banner */}
                    <div
                        className="px-6 py-8 sm:px-10 text-white relative overflow-hidden"
                        style={{ backgroundColor: 'var(--color-header)' }}
                    >
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-10 bg-white pointer-events-none blur-2xl" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 mb-3 backdrop-blur-md">
                                    <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-callout)' }} />
                                    <span>Sacrament Planner Pro</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Meeting Program</h1>
                                <p className="text-sm opacity-80 mt-1">Configure complete leadership, structured hymns, business items, and detailed speakers.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Layout matching Database Schema */}
                    <form action={formAction} id="userForm" className="p-6 sm:p-10 space-y-8">

                        {/* Hidden Payload Injectors for complex parsed schema attributes */}
                        <input type="hidden" name="openingHymn" value={JSON.stringify({ number: Number(openingHymnNum) || 0, title: openingHymnTitle })} />
                        <input type="hidden" name="sacramentHymn" value={JSON.stringify({ number: Number(sacramentHymnNum) || 0, title: sacramentHymnTitle })} />
                        <input type="hidden" name="closingHymn" value={JSON.stringify({ number: Number(closingHymnNum) || 0, title: closingHymnTitle })} />
                        <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />
                        <input type="hidden" name="wardBusiness" value={JSON.stringify(wardBusiness)} />
                        <input type="hidden" name="announcements" value={JSON.stringify(announcementsList)} />

                        {/* Section 1: General Info */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Service Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                                        style={{ accentColor: 'var(--color-button-bg)' }}
                                        aria-describedby="date-error"
                                    />
                                    <div id="date-error" aria-live="polite">
                                        {state.errors?.date?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="meetingType" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Meeting Type
                                    </label>
                                    <select
                                        id="meetingType"
                                        name="meetingType"
                                        defaultValue="regular"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                                        aria-describedby="meetingType-error"
                                    >
                                        <option value="regular">Regular Sacrament</option>
                                        <option value="testimony">Testimony Meeting</option>
                                        <option value="stake">Stake Conference</option>
                                        <option value="general">General Conference</option>
                                    </select>
                                    <div id="meetingType-error" aria-live="polite">
                                        {state.errors?.meetingType?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Presiding & Conducting */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <UserCheck className="w-4 h-4" /> Leadership
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="presiding" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Presiding Authority
                                    </label>
                                    <input
                                        id="presiding"
                                        name="presiding"
                                        type="text"
                                        placeholder="e.g. Bishop Smith"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="presiding-error"
                                    />
                                    <div id="presiding-error" aria-live="polite">
                                        {state.errors?.presiding?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="conducting" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Conducting Leader
                                    </label>
                                    <input
                                        id="conducting"
                                        name="conducting"
                                        type="text"
                                        placeholder="e.g. Brother Johnson"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="conducting-error"
                                    />
                                    <div id="conducting-error" aria-live="polite">
                                        {state.errors?.conducting?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Music & Personnel (Structured Hymns) */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <Music className="w-4 h-4" /> Music & Personnel
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label htmlFor="organist" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Organist
                                    </label>
                                    <input
                                        id="organist"
                                        name="organist"
                                        type="text"
                                        placeholder="Name of organist"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="organist-error"
                                    />
                                    {/* <div id="organist-error" aria-live="polite">
                                        {state.errors?.organist?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div> */}
                                </div>

                                <div>
                                    <label htmlFor="chorister" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Chorister
                                    </label>
                                    <input
                                        id="chorister"
                                        name="chorister"
                                        type="text"
                                        placeholder="Name of chorister"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="chorister-error"
                                    />
                                    {/* <div id="chorister-error" aria-live="polite">
                                        {state.errors?.chorister?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div> */}
                                </div>
                            </div>

                            {/* Hymn Grouping Fields */}
                            {/* Hymn Grouping Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Opening Hymn Group */}
                                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Opening Hymn</h4>
                                    <div className="flex gap-2 min-w-0"> {/* Added min-w-0 here */}
                                        <input
                                            type="number"
                                            placeholder="No."
                                            value={openingHymnNum}
                                            onChange={(e) => setOpeningHymnNum(e.target.value)}
                                            required
                                            className="w-20 shrink-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Hymn Title"
                                            value={openingHymnTitle}
                                            onChange={(e) => setOpeningHymnTitle(e.target.value)}
                                            required
                                            className="w-full min-w-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                    </div>
                                    <div id="openingHymn-error" aria-live="polite">
                                        {state.errors?.openingHymn?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Sacrament Hymn Group */}
                                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Sacrament Hymn</h4>
                                    <div className="flex gap-2 min-w-0">
                                        <input
                                            type="number"
                                            placeholder="No."
                                            value={sacramentHymnNum}
                                            onChange={(e) => setSacramentHymnNum(e.target.value)}
                                            required
                                            className="w-20 shrink-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Hymn Title"
                                            value={sacramentHymnTitle}
                                            onChange={(e) => setSacramentHymnTitle(e.target.value)}
                                            required
                                            className="w-full min-w-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                    </div>
                                    <div id="sacramentHymn-error" aria-live="polite">
                                        {state.errors?.sacramentHymn?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Closing Hymn Group */}
                                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Closing Hymn</h4>
                                    <div className="flex gap-2 min-w-0">
                                        <input
                                            type="number"
                                            placeholder="No."
                                            value={closingHymnNum}
                                            onChange={(e) => setClosingHymnNum(e.target.value)}
                                            required
                                            className="w-20 shrink-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Hymn Title"
                                            value={closingHymnTitle}
                                            onChange={(e) => setClosingHymnTitle(e.target.value)}
                                            required
                                            className="w-full min-w-0 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
                                        />
                                    </div>
                                    <div id="closingHymn-error" aria-live="polite">
                                        {state.errors?.closingHymn?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Program Flow & Prayers */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Program Flow & Prayers
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="specialMusicalNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Special Musical Number <span className="text-gray-400 font-normal">(Opt.)</span>
                                    </label>
                                    <input
                                        id="specialMusicalNumber"
                                        name="specialMusicalNumber"
                                        type="text"
                                        placeholder="Optional performance details"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="specialMusicalNumber-error"
                                    />
                                    <div id="specialMusicalNumber-error" aria-live="polite">
                                        {state.errors?.specialMusicalNumber?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="openingPrayer" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Opening Prayer
                                    </label>
                                    <input
                                        id="openingPrayer"
                                        name="openingPrayer"
                                        type="text"
                                        placeholder="Name of individual"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="openingPrayer-error"
                                    />
                                    <div id="openingPrayer-error" aria-live="polite">
                                        {state.errors?.openingPrayer?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="closingPrayer" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Closing Prayer
                                    </label>
                                    <input
                                        id="closingPrayer"
                                        name="closingPrayer"
                                        type="text"
                                        placeholder="Name of individual"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                        aria-describedby="closingPrayer-error"
                                    />
                                    <div id="closingPrayer-error" aria-live="polite">
                                        {state.errors?.closingPrayer?.map((error) => (
                                            <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Ward Business Multi-item Manager */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> Ward Business Items <span className="text-gray-400 font-normal">(Optional)</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={addBusinessRow}
                                    className="inline-flex items-center gap-1 w-30 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                >
                                    <Plus size={14} /> Add Business
                                </button>
                            </div>
                            <div className="space-y-3">
                                {wardBusiness.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-2xl border border-gray-200">
                                        <input
                                            type="text"
                                            placeholder="e.g. Release of Gospel Doctrine teacher"
                                            value={item.description}
                                            onChange={(e) => updateBusiness(index, e.target.value)}
                                            className="flex-1 bg-white px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeBusinessRow(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                            aria-label="Remove business item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {wardBusiness.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">No ward business added yet. Click above to add items.</p>
                                )}
                            </div>
                        </div>

                        {/* Section 6: Speakers & Topics Management */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                    <Mic className="w-4 h-4" /> Speakers & Topics Configuration
                                </h3>
                                <button
                                    type="button"
                                    onClick={addSpeakerRow}
                                    className="inline-flex items-center gap-1 w-30 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                >
                                    <Plus size={14} /> Add Speaker
                                </button>
                            </div>

                            <div className="space-y-3">
                                {speakers.map((speaker, index) => (
                                    <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-200 items-center">
                                        <div className="sm:col-span-4">
                                            <input
                                                type="text"
                                                placeholder="Speaker Name"
                                                value={speaker.name}
                                                onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                                                required
                                                className="w-full bg-white px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <input
                                                type="text"
                                                placeholder="Assigned Topic"
                                                value={speaker.topic}
                                                onChange={(e) => updateSpeaker(index, 'topic', e.target.value)}
                                                className="w-full bg-white px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <select
                                                value={speaker.type}
                                                onChange={(e) => updateSpeaker(index, 'type', e.target.value as any)}
                                                className="w-full bg-white px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                                            >
                                                <option value="speaker">Speaker</option>
                                                <option value="musical-number">Musical Number</option>
                                            </select>
                                        </div>
                                        <div className="sm:col-span-1 flex justify-end">
                                            {speakers.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpeakerRow(index)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                                                    aria-label="Remove speaker"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id="speakers-error" aria-live="polite">
                                {state.errors?.speakers?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* Section 7: Announcements */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <Speaker className="w-4 h-4" /> Announcements <span className="text-gray-400 font-normal">(Optional)</span>
                            </h3>
                            <div className="flex flex-col">
                                <div
                                    className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border border-gray-200 bg-gray-50/50 min-h-13 cursor-text focus-within:bg-white focus-within:ring-2 transition-all"
                                    onClick={() => annInputRef.current?.focus()}
                                >
                                    {announcementsList.map((ann, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-900 text-white shadow-sm"
                                        >
                                            {ann}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAnnouncementsList(announcementsList.filter((_, i) => i !== idx));
                                                }}
                                                className="opacity-70 hover:opacity-100 focus:outline-none cursor-pointer"
                                                aria-label={`Remove announcement`}
                                            >
                                                <X size={13} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        ref={annInputRef}
                                        type="text"
                                        className="flex-1 outline-none min-w-45 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 py-1"
                                        placeholder={announcementsList.length === 0 ? "Type announcement & press Enter..." : "Add another..."}
                                        value={announcementInput}
                                        onChange={(e) => setAnnouncementInput(e.target.value)}
                                        onKeyDown={handleAnnouncementKeyDown}
                                        onBlur={() => addAnnouncement(announcementInput)}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Press <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded">Enter</kbd> or use a comma to separate program announcements.</p>
                            </div>
                            <div id="announcements-error" aria-live="polite">
                                {state.errors?.announcements?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* Footer Action Bar */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-400 text-center sm:text-left">
                                All program fields validate strictly with database schema upon submission.
                            </p>
                            <Submit />
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}
