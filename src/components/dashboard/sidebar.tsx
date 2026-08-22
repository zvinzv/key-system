import SignOutButton from "@/features/auth/components/sign-out-button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RelativeTime } from "@/util/relative-time";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Cable,
  Ellipsis,
  Grid2x2,
  Grid2x2Plus,
  Home,
  LayoutPanelTop,
  Link2,
  LogOut,
  LucideIcon,
  Rss,
  Settings,
  SquareArrowOutUpRight,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Session } from "better-auth";
import { DottedGlowBackground } from "../ui/dotted-glow-background";

type LinksType = {
  lable: string;
  Icon: LucideIcon;
  href: string;
  description?: string;
};
type LinksTypeGroup = {
  group: string;
  links: LinksType[];
};
export const Links: LinksTypeGroup[] = [
  {
    group: "الصفحات الرئيسية",
    links: [
      {
        Icon: Home,
        href: "/",
        lable: "نظرة عامة",
        description: "ألق نظرة سريعة",
      },
      {
        Icon: User,
        href: "/accounts",
        lable: "الحسابات",
        description: "تصفح الحسابات المضافة حديثا",
      },

      {
        Icon: Grid2x2,
        href: "/templates",
        lable: "القوالب",
        description: "انشئ وعدل القوالب بما يناسبك",
      },
      {
        Icon: Rss,
        href: "/services",
        lable: "الخدمات",
        description: "تصفح الخدمات المضافة حديثا",
      },
    ],
  },
  {
    group: "الاعداد والتخصيص",
    links: [
      {
        Icon: Settings,
        href: "/settings",
        lable: "الاعدادات",
        description: "عام, تخصيص, نسخ احتياطي...",
      },
      {
        Icon: Link2,
        href: "/connections",
        lable: "الارتباطات",
        description: "اربط وسائل ارسال الرسائل هنا",
      },
    ],
  },
];
const Sidebar = async ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const { image, username, name, displayUsername } = session.user;
  return (
    <div className=" fixed h-dvh  bg-background overflow-hidden z-10 flex flex-col max-w-sm w-full border-l-2 p-8">
      <div className="bg-primary size-52 top-0 right-0 blur-3xl absolute scale-[6] -z-10 opacity-20" />
      <div className="absolute pointer-events-none -z-10 opacity-30 max-w-xl w-full right-0 top-0  h-dvh">
        <DottedGlowBackground
          className="pointer-events-none mask-linear-180 mask-linear-from-10%  "
          opacity={1}
          gap={10}
          radius={1.6}
          colorLightVar="--primary"
          glowColorLightVar="--primary"
          colorDarkVar="--primary"
          glowColorDarkVar="--primary"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />
      </div>
      <Card className={"bg-card/25 backdrop-blur-md"}>
        <CardHeader className="flex items-center  flex-row gap-2">
          <div>
            <Avatar className="size-10">
              <AvatarImage
                width={1000}
                height={1000}
                src={image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="uppercase">
                {session.user.username?.slice(0, 2)}
              </AvatarFallback>
              <AvatarBadge className="size-2 bg-green-500 dark:bg-green-400" />
            </Avatar>
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-8">
              {displayUsername}
            </h1>
            <h2 className="text-xs text-muted-foreground">
              الجلسة نشطة{" "}
              <span>
                <RelativeTime date={session.session.updatedAt} />
              </span>
            </h2>
          </div>
          <div className="mr-auto">
            <SignOutButton />
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-6 mt-16">
        {Links.map((e) => (
          <div key={e.group}>
            <h1 className="text-foreground/40 mb-2">{e.group}</h1>
            {e.links.map((e) => (
              <Link
                key={e.lable}
                href={e.href}
                className="cursor-pointer flex items-center gap-3 rounded-md px-3 py-2.5 text-xl transition-colors hover:bg-foreground/5"
              >
                <e.Icon className="size-6" />
                {e.lable}
              </Link>
            ))}
          </div>
        ))}
        {/* <h1 className="text-muted-foreground mt-4">الصفحات الرئيسية</h1>
        {[1, 2, 3].map((e) => (
          <Link key={e} href={"/"} className="cursor-pointer">
            <Button
              variant={"ghost"}
              className="w-full justify-start text-xl py-6"
            >
              <Home className="size-6" />
              الصفحة الرئيسية
            </Button>
          </Link>
        ))}
        <h1 className="text-muted-foreground mt-4">الاعداد والتخصيص</h1>
        {[1, 2, 3].map((e) => (
          <Link key={e} href={"/"} className="cursor-pointer">
            <Button
              variant={"ghost"}
              className="w-full justify-start text-xl py-6"
            >
              <Settings className="size-6" />
              الصفحة الرئيسية
            </Button>
          </Link>
        ))} */}
      </div>
      <div className="mt-auto">
        <h1 className="text-center text-muted-foreground">
          جميع الحقوق محفوظة
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
