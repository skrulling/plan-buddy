import { useState, type FormEvent } from "react";
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
import { TableDisplay } from "./TableDisplay";

interface OpenAiResponse {
  finish_reason: string;
  index: number;
  message: { role: string; content: string };
}

export interface TrainingPlan {
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
    if (message.message) {
      const parsedPlan = JSON.parse(message.message.content);
      setTrainingPlan(parsedPlan.training_plan);
    }
    setIsLoading(false);
  }

  return (
    <>
      {!trainingPlan && (
        <Card className="sm:w-[450px] w-full">
          <CardHeader>
            <CardTitle>Create a new training plan</CardTitle>
            <CardDescription>
              Type in some information about your running event, and we will make a plan
              🚀
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-2">
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
              </div>
            </CardContent>
            <CardFooter>
              {isLoading ? (
                <WideButton disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating your training plan...
                </WideButton>
              ) : (
                <WideButton>
                  <Zap className="mr-2 h-5 w-5" />
                  Create your training plan
                </WideButton>
              )}
            </CardFooter>
          </form>
        </Card>
      )}
      {trainingPlan && <TableDisplay trainingPlan={trainingPlan} />}
    </>
  );
}
