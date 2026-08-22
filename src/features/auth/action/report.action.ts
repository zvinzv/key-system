"use server";

import { sleep } from "@/util/sleep";
import { report } from "../services/report.services";
import { ReportType } from "../types/report.type";

export const sendReport = async (data: ReportType) => {
  // await sleep(2000);
  await report(data);
};
