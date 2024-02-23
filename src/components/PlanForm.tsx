import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2, Zap } from "lucide-react";
import { InputText } from "./InputText";
import { WideButton } from "./WideButton";

interface OpenAiResponse {
  finish_reason: string;
  index: number;
  message: { role: string; content: string };
}

interface TrainingPlan {
  goal: string;
  fitness_level: string;
  training_days_per_week: number;
  start_date: string;
  end_date: string;
  weeks: Week[];
}

interface Week {
  week: number;
  days: Day[];
}

interface Day {
  day: string;
  activity: string;
  distance?: string; // Marked as optional since not all activities will include a distance
  notes?: string; // Optional for additional information
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/openapi", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    const message: OpenAiResponse = data.message;
    console.log(message.message);
    if (message.message) {
      const parsedPlan = JSON.parse(message.message.content);
      console.log(parsedPlan);
      setTrainingPlan(parsedPlan.training_plan);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Card className="sm:w-[450px] w-full">
        <CardHeader>
          <CardTitle>Create a new training plan</CardTitle>
          <CardDescription>
            Type in some information about your event, and we will make a plan
            💎
          </CardDescription>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent>
            <InputText
              label="Target distance"
              name="distance"
              placeholder="5km, marathon etc."
            />
            <InputText
              label="Running level"
              name="level"
              placeholder="Beginner, intermediate etc."
            />
            <InputText
              label="Training plan duration"
              name="duration"
              placeholder="12 weeks, 6 months etc."
            />
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating a training plan
              </Button>
            ) : (
              <WideButton>
                <Zap className="mr-2 h-4 w-4" />
                Make training plan
              </WideButton>
            )}
          </CardFooter>
        </form>
      </Card>
      {trainingPlan && (
        <div className="rounded-md border mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Week</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Notes</TableHead>
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
      )}
    </>
  );
}
