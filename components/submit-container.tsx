"use client";

import { addItem } from "@/actions/actions";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SubmitForm({ payload }: { payload: any }) {
  const [state, addItemAction] = useFormState(addItem, payload);
  const [isDrawer, setIsDrawer] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (state.status === 200) {
      setIsDrawer(true);
    } else {
      setIsDrawer(false);
    }
  }, [state]);
  console.log(state);
  return (
    <div>
      <form action={addItemAction}>
        <SubmitButton />
      </form>
      <Drawer open={isDrawer}>
        <DrawerContent className="flex justify-center items-center border-none glassMorphism m-0">
          <div className="flex flex-col gap-4 pb-4">
            <DrawerHeader className="flex justify-center items-center">
              <DrawerTitle>모든 설문 조사가 끝났습니다 🎉</DrawerTitle>
            </DrawerHeader>
            <div className="flex justify-center items-center">
              <Button
                variant="infoGrab"
                size="lg"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                결과 보러가기
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
