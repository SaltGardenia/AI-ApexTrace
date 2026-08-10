import type { Metadata } from "next";
import { CalendarView } from "@/components/calendar/calendar-view";

export const metadata: Metadata = {
  title: "会议日历",
  description: "全年顶会截稿与召开时间线，支持按 CCF 等级筛选。",
};

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">会议日历</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          全年 12 个月的截稿与召开节点，快速规划投稿与参会节奏。
        </p>
      </div>
      <CalendarView />
    </div>
  );
}
