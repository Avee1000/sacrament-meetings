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

import HoverOptions from '@/components/edit/HoverOptions'

export default function DrawerWithSides() {
  return (
    <div>
      <Drawer swipeDirection="left">
        <DrawerTrigger render={<Button variant="secondary">Open Left Drawer</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="size-full rounded-2xl bg-muted" />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div>
            <HoverOptions />
      </div>
    </div>


  )
}
