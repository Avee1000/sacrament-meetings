import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ReactElement, useState } from "react";
import useMediaQuery from "../useMediaQuery";
import EditMeetingForm from "./EditMeetingForm";
import { SacramentMeeting } from "@/lib/types";

interface EditProps {
    isOpen: boolean;
    onClose: () => void;

    sacrament: SacramentMeeting
}

export default function EditMeetingDrawer({ isOpen, onClose, sacrament }: EditProps) {
    const isDesktop = useMediaQuery("(min-width: 640px)");

    return (
        <div>
            {isDesktop ? (
                <Drawer open={isOpen} onOpenChange={onClose} swipeDirection="left" >
                    <DrawerContent className="w-[95%] md:w-[95%] lg:w-[70%] h-auto">
                        <div className="p-4 overflow-y-auto">
                            <EditMeetingForm onSuccess={onClose} sacrament={sacrament} />

                        </div>
                        <DrawerFooter className="p-4 border-t border-gray-200 bg-white ">
                            <DrawerClose render={<Button variant="outline" className="w-[15%] my-0 mx-auto cursor-pointer" tabIndex={0}>Close</Button>} />
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Drawer open={isOpen} onOpenChange={onClose} swipeDirection="down" showSwipeHandle>
                    <DrawerContent className="w-full md:w-[95%] lg:w-[70%] h-auto">
                        <div className="p-4 overflow-y-auto">
                            <EditMeetingForm onSuccess={onClose} sacrament={sacrament} />

                        </div>
                        <DrawerFooter className="p-4 border-t border-gray-200 bg-white">
                            <DrawerClose render={<Button variant="outline" className="w-[20%] my-0 mx-auto cursor-pointer">Close</Button>} />
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>)}
        </div>
    )
}
