import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import React, { ReactNode, useEffect, useState } from "react";

export const ServicesDeleteAlert = ({
  children,
  action,
}: {
  children: ReactNode;
  action: () => void;
}) => {
  const duration = 5000;

  const [time, setTime] = useState(duration);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const remaining = Math.max(0, duration - (Date.now() - start));

      setTime(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const disabled = time > 0;
  const rotation = ((duration - time) / duration) * 360;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-background/50 backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle dir="rtl">هل انت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription dir="rtl" className="text-right">
            عند الحذف لا يمكنك التراجع عنه. سيتم حذف الخدمة بشكل كامل من قاعدة
            البيانات.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>تراجع</AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={() => action()}>
            {time > 0 && (
              <span className=" relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock12-icon lucide-clock-12"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: "center",
                  }}
                  className="absolute top-0 left-0  lucide lucide-clock12-icon lucide-clock-12"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6" />
                </svg>
              </span>
            )}
            الاستمرار
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
