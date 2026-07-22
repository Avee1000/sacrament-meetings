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

export default function CreateMeetingBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");


  return (
    <div className="mx-auto max-w-6xl px-6 -mt-10">
      {/* Action / Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 font-medium text-sm">
          Displaying all upcoming meetings
        </p>
        <div >
          {isDesktop ? (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} swipeDirection="left">
              <DrawerTrigger >
                <CreateMeetingButton />
              </DrawerTrigger>
              <DrawerContent className="inset-0 w-[95%] flex flex-col [--drawer-inset:10px]">
                <div className="p-4 overflow-y-auto grow">
                  <CreateMeetingForm />
                </div>
                <DrawerFooter className="p-4 border-t border-gray-200 bg-white ">
                  <DrawerClose >
                    <Button variant="outline">{isDesktop ? 'Close' : 'Cancel'}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} swipeDirection="down" showSwipeHandle>
              <DrawerTrigger >
                <CreateMeetingButton />
              </DrawerTrigger>
              <DrawerContent className="w-full flex flex-col">
                <div className="p-4 overflow-y-auto grow">
                  <CreateMeetingForm />
                </div>
                <DrawerFooter className="p-4 border-t border-gray-200 bg-white">
                  <DrawerClose >
                    <Button variant="outline">{isDesktop ? 'Close' : 'Cancel'}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>)}

        </div>
      </div>
    </div>
  )
}