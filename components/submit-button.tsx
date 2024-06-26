"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <>
      {pending ? (
        <Button variant="infoGrab" size="sm" disabled={true}>
          <Loader className=" animate-spin" />
        </Button>
      ) : (
        <Button variant="infoGrab" size="sm">
          완료
        </Button>
      )}
    </>
  );
}
