'use client'

import { useState } from "react";
import CreateMeetingForm from "./CreateMeetingsForm";
import { Button } from "@/components/ui/button";
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
import CreateMeetingButton from "./CreateMeetingButton";
import useMediaQuery from "@/components/useMediaQuery";

export default function CreateMeetingBar({ pageNumber }: { pageNumber: number }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");


  return (
    <div className="mx-auto max-w-5xl px-6 -mt-10">
      {/* Action / Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:w-[80%] sm:justify-self-center lg:w-full">
        <p className="text-slate-600 font-medium text-sm">
          Displaying all upcoming meetings
        </p>
        <div>
          {isDesktop ? (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} swipeDirection="left">
              <CreateMeetingButton onClick={() => setIsDrawerOpen(true)} />
              <DrawerContent className="w-[95%] md:w-[95%] lg:w-[70%] h-auto">
                <div className="p-4 overflow-y-auto">
                  <CreateMeetingForm onSuccess={() => setIsDrawerOpen(false)} pageNumber={pageNumber}/>
                </div>
                <DrawerFooter className="p-4 border-t border-gray-200 bg-white ">

                  <Button className="w-[10%] my-0 mx-auto cursor-pointer" tabIndex={0} data-slot="drawer-close" onClick={() => setIsDrawerOpen(false)} variant="outline">{isDesktop ? 'Close' : 'Cancel'}</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} swipeDirection="down" showSwipeHandle>
              <CreateMeetingButton onClick={() => setIsDrawerOpen(true)} />
              <DrawerContent className="w-full flex flex-col">
                <div className="p-4 overflow-y-auto grow">
                  <CreateMeetingForm onSuccess={() => setIsDrawerOpen(false)} pageNumber={pageNumber}/>
                </div>
                <DrawerFooter className="p-4 border-t border-gray-200 bg-white">
                  <Button onClick={() => setIsDrawerOpen(false)} variant="outline">{isDesktop ? 'Close' : 'Cancel'}</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>)}

        </div>
      </div>
    </div>
  )
}