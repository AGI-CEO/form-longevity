"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";
import ResponseComponent from "@/components/response-component";

export function Form() {
  const totalQuestions = 24; // total number of questions in the form
  const [progress, setProgress] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [formData, setFormData] = useState({}); // new state variable for form data
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (e) => {
    setAnsweredQuestions((prevQuestions) => {
      const newQuestions = new Set(prevQuestions);
      if (e.target.value.trim()) {
        newQuestions.add(e.target.id);
      } else {
        newQuestions.delete(e.target.id);
      }
      return newQuestions;
    });

    setFormData((prevData) => {
      // update form data
      return { ...prevData, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    const reqPrompt = `Based on this intake form: ${JSON.stringify(
      formData
    )}, provide a recommendation for the optimal longevity protocol to follow for the user. Format in markdown.`;
    const data = {
      question: reqPrompt,
    };
    //console.log(data);
    try {
      const response = await fetch(
        "https://flowise.seelanglabs.com/api/v1/prediction/baddc5c7-9bdf-4cde-8ccd-6fb4e3022163",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const responseData = await response.json();
      setResponseData(responseData);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    const newProgress = Math.round(
      (answeredQuestions.size / totalQuestions) * 100
    );
    setProgress(newProgress);
  }, [answeredQuestions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="relative bg-gray-200 h-2 rounded-full mb-4">
          <div
            className="absolute bg-green-500 h-full rounded-full"
            style={{ width: `${Math.min(progress, 105)}%` }}
          />
          <div className="absolute top-0 left-0 flex justify-between w-full px-2 text-xs">
            <div
              className={progress >= 25 ? "text-green-500" : "text-gray-500"}
            >
              0%
            </div>
            <div
              className={progress >= 50 ? "text-green-500" : "text-gray-500"}
            >
              33%
            </div>
            <div
              className={progress >= 75 ? "text-green-500" : "text-gray-500"}
            >
              66%
            </div>
            <div
              className={progress >= 95 ? "text-green-500" : "text-gray-500"}
            >
              100%
            </div>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Habits</CardTitle>
                  <CardDescription>
                    Please provide information about your daily eating habits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onChange={handleInputChange}>
                    <div className="space-y-2">
                      <Label htmlFor="sugar-consumption">
                        How many grams of sugar do you consume on an average
                        day?
                      </Label>
                      <Input
                        id="sugar-consumption"
                        placeholder="Enter grams of sugar"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sugar-detox">
                        Do you currently participate in any form of sugar detox
                        or challenge? If yes, please describe.
                      </Label>
                      <Input
                        id="sugar-detox"
                        placeholder="Enter your sugar detox or challenge"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein-sources">
                        What types of protein sources are included in your diet?
                        (e.g., fish, eggs, chicken, nuts, beans, legumes)
                      </Label>
                      <Input
                        id="protein-sources"
                        placeholder="Enter your protein sources"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietary-restrictions">
                        Do you have any dietary restrictions or allergies we
                        should be aware of, such as dairy or red meat?
                      </Label>
                      <Input
                        id="dietary-restrictions"
                        placeholder="Enter your dietary restrictions or allergies"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein-consumption">
                        How many grams of protein do you aim to consume daily?
                      </Label>
                      <Input
                        id="protein-consumption"
                        placeholder="Enter grams of protein"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein-supplements">
                        Do you use any protein supplements or shakes? If so,
                        which ones?
                      </Label>
                      <Input
                        id="protein-supplements"
                        placeholder="Enter your protein supplements or shakes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fasting-diets">
                        Have you tried any fasting or fasting-mimicking diets?
                        Please provide details.
                      </Label>
                      <Input
                        id="fasting-diets"
                        placeholder="Enter your fasting or fasting-mimicking diets"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blood-glucose">
                        Are you currently monitoring your blood glucose levels?
                        If yes, which device or method are you using?
                      </Label>
                      <Input
                        id="blood-glucose"
                        placeholder="Enter your blood glucose monitoring device or method"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardHeader>
                  <CardTitle>Exercise Routine</CardTitle>
                  <CardDescription>
                    Please provide information about your weekly exercise
                    routine.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onChange={handleInputChange}>
                    <div className="space-y-2">
                      <Label htmlFor="exercise-minutes">
                        How many minutes per week do you engage in
                        moderate-intensity exercise?
                      </Label>
                      <Input
                        id="exercise-minutes"
                        placeholder="Enter minutes of exercise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workout-routine">
                        Do you have a structured workout routine that includes
                        muscle-building exercises? If so, could you describe it?
                      </Label>
                      <Input
                        id="workout-routine"
                        placeholder="Enter your workout routine"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smart-technology">
                        Have you ever used any smart technology or equipment for
                        strength training, such as Tonal or EMS suits?
                      </Label>
                      <Input
                        id="smart-technology"
                        placeholder="Enter your smart technology or equipment for strength training"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fitness-tracking">
                        What methods do you use to track your fitness progress
                        and set goals?
                      </Label>
                      <Input
                        id="fitness-tracking"
                        placeholder="Enter your fitness tracking methods"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Patterns</CardTitle>
                  <CardDescription>
                    Please provide information about your sleep patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onChange={handleInputChange}>
                    <div className="space-y-2">
                      <Label htmlFor="sleep-hours">
                        On average, how many hours of sleep do you get per
                        night?
                      </Label>
                      <Input
                        id="sleep-hours"
                        placeholder="Enter hours of sleep"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedtime-routine">
                        Do you have a regular bedtime routine? If yes, please
                        describe what it entails.
                      </Label>
                      <Input
                        id="bedtime-routine"
                        placeholder="Enter your bedtime routine"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="light-noise-blocking">
                        What methods do you use to block out light and noise
                        during sleep?
                      </Label>
                      <Input
                        id="light-noise-blocking"
                        placeholder="Enter your light and noise blocking methods"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cooling-methods">
                        Do you utilize any specific devices or techniques to
                        keep cool while sleeping?
                      </Label>
                      <Input
                        id="cooling-methods"
                        placeholder="Enter your cooling methods"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleep-apnea">
                        Have you ever been diagnosed with or suspect you have
                        sleep apnea?
                      </Label>
                      <Input
                        id="sleep-apnea"
                        placeholder="Enter your sleep apnea status"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleep-supplements">
                        Do you use any sleep supplements or aids to improve
                        sleep quality?
                      </Label>
                      <Input
                        id="sleep-supplements"
                        placeholder="Enter your sleep supplements or aids"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleep-quality-measurement">
                        How do you measure the quality of your sleep (e.g.,
                        using wearables like the Oura Ring)?
                      </Label>
                      <Input
                        id="sleep-quality-measurement"
                        placeholder="Enter your sleep quality measurement methods"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="late-night-eating">
                        What is your approach to late-night eating and caffeine
                        consumption?
                      </Label>
                      <Input
                        id="late-night-eating"
                        placeholder="Enter your approach to late-night eating and caffeine consumption"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardHeader>
                  <CardTitle>General Health and Lifestyle</CardTitle>
                  <CardDescription>
                    Please provide general information about your health and
                    lifestyle.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onChange={handleInputChange}>
                    <div className="space-y-2">
                      <Label htmlFor="health-motivation">
                        What is your primary motivation for improving your
                        health and longevity?
                      </Label>
                      <Input
                        id="health-motivation"
                        placeholder="Enter your health motivation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="health-goals">
                        Are there any specific health or wellness goals you are
                        working towards?
                      </Label>
                      <Input
                        id="health-goals"
                        placeholder="Enter your health goals"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genetic-analysis">
                        Have you undergone any genetic analysis or health
                        screenings that inform your lifestyle choices?
                      </Label>
                      <Input
                        id="genetic-analysis"
                        placeholder="Enter your genetic analysis or health screenings"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
              <SubmitButton progress={progress} onClick={handleSubmit} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />

          <CarouselNext />
        </Carousel>
      </div>
      {responseData && <ResponseComponent data={responseData} />}
    </div>
  );
}
