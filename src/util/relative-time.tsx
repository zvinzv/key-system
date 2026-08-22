"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { ar } from "date-fns/locale";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getInterval(date: Date) {
  const diff = Date.now() - date.getTime();

  if (diff < MINUTE) return SECOND;
  if (diff < HOUR) return MINUTE;
  if (diff < DAY) return HOUR;

  return DAY;
}

export function RelativeTime({ date }: { date: Date }) {
  // const [now, setNow] = useState(Date.now());

  // useEffect(() => {
  //   const interval = getInterval(date);

  //   const timer = setInterval(() => {
  //     setNow(Date.now());
  //   }, interval);

  //   return () => clearInterval(timer);
  // }, [date, now]);

  return (
    <time dateTime={date.toISOString()}>
      {formatDistanceToNow(date, {
        addSuffix: true,
        locale: ar,
      })}
    </time>
  );
}
