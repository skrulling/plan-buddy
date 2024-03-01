import type { TrainingPlan } from "./PlanForm";
import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { downloadPdf } from "@/utils/pdf";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface TableDisplayProps {
  trainingPlan: TrainingPlan;
}

export function TableDisplay({ trainingPlan }: TableDisplayProps): JSX.Element {
  const tableRef = useRef(null);

  return (
    <>
      <Button onClick={() => downloadPdf(trainingPlan)} className="mt-3">
        <Download className="mr-2 h-5 w-5" />
        Download as PDF
      </Button>
      <div ref={tableRef} className="rounded-md border mt-5 bg-gradient-to-r from-orange-600 from-10% to-red-600 text-white font-semibold">
        <div className="overflow-x-auto mx-2 sm:mx-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white font-bold">Week</TableHead>
                <TableHead className="text-white font-bold">Day</TableHead>
                <TableHead className="text-white font-bold">Activity</TableHead>
                <TableHead className="text-white font-bold">Distance</TableHead>
                <TableHead className="text-white font-bold">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPlan.weeks.map((week) =>
                week.days.map((day, dayIndex) => (
                  <TableRow key={`week-${week.week}-day-${dayIndex}`}>
                    {dayIndex === 0 && (
                      <TableCell rowSpan={week.days.length}>
                        {week.week}
                      </TableCell>
                    )}
                    <TableCell>{day.day}</TableCell>
                    <TableCell>{day.activity}</TableCell>
                    <TableCell>{day.distance || "N/A"}</TableCell>
                    <TableCell>{day.notes || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </>
  );
}
