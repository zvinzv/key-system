import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-12 w-full bg-foreground/[0.03] flex gap-8 items-center p-2 ">
      <div className="flex flex-row gap-2 items-center">
        <div className="flex gap-1 items-center">
          <Button
            size={"icon-sm"}
            className="text-muted-foreground pointer-events-none"
            variant={"outline"}
          >
            <ArrowUp />
          </Button>
          <Button
            size={"icon-sm"}
            className="text-muted-foreground pointer-events-none"
            variant={"outline"}
          >
            <ArrowDown />
          </Button>
        </div>
        <h1 className="text-base text-muted-foreground font-medium">التنقل</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex gap-1 items-center">
          <Button
            size={"icon-sm"}
            className="text-muted-foreground pointer-events-none"
            variant={"outline"}
          >
            <CornerDownLeft />
          </Button>
        </div>
        <h1 className="text-base text-muted-foreground font-medium">فتح</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex gap-1 items-center">
          <Button
            size={"icon-sm"}
            className="text-muted-foreground pointer-events-none text-xs"
            variant={"outline"}
          >
            ESC
          </Button>
        </div>
        <h1 className="text-base text-muted-foreground font-medium">الخروج</h1>
      </div>
    </div>
  );
};
export default Footer;
