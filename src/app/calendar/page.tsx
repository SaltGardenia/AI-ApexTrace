import type { Metadata } from "next";
import { CalendarView } from "@/components/calendar/calendar-view";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "会议日历",
  description: "全年顶会截稿与召开时间线，支持按 CCF 等级筛选。",
};

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="page_calendar" descKey="page_calendar_desc" />
      <CalendarView />
    </div>
  );
}
