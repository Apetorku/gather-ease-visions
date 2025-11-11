import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  GripVertical,
  Star,
  Eye,
  Send,
  BarChart3,
  Users,
  Clock,
  Download,
  Copy,
  Settings,
} from "lucide-react";

interface Question {
  id: number;
  type: "text" | "rating" | "multiple-choice" | "yes-no";
  question: string;
  options?: string[];
  required: boolean;
}

export const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState("Post-Event Survey");
  const [surveyDescription, setSurveyDescription] = useState(
    "Help us improve future events with your feedback"
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [autoSend, setAutoSend] = useState(true);
  const [sendDelay, setSendDelay] = useState("24"); // hours after event
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "rating",
      question: "How would you rate the overall event?",
      required: true,
    },
    {
      id: 2,
      type: "text",
      question: "What did you enjoy most about the event?",
      required: false,
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "How did you hear about this event?",
      options: ["Social Media", "Email", "Word of Mouth", "Website", "Other"],
      required: false,
    },
  ]);

  // Mock analytics data
  const [surveyAnalytics] = useState({
    totalResponses: 247,
    responseRate: 65,
    avgRating: 4.6,
    completionRate: 89,
    responses: [
      { date: "Nov 1", count: 45 },
      { date: "Nov 2", count: 78 },
      { date: "Nov 3", count: 124 },
    ],
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      type: "text",
      question: "",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [...(question.options || []), ""];
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const deleteOption = (questionId: number, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const duplicateQuestion = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const newQuestion = {
        ...question,
        id: Date.now(),
        question: question.question + " (Copy)",
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "rating":
        return (
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 text-yellow-500 cursor-pointer hover:fill-yellow-500"
              />
            ))}
          </div>
        );
      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="w-4 h-4"
                />
                <span className="text-sm">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
          </div>
        );
      case "yes-no":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                className="w-4 h-4"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        );
      case "text":
      default:
        return (
          <Textarea
            placeholder="Respondent's answer will appear here..."
            className="glass-card border-white/20 resize-none"
            rows={3}
            disabled
          />
        );
    }
  };

  const exportAnalytics = () => {
    const csvContent = [
      ["Question", "Response Rate", "Average Rating"],
      ...questions.map((q) => [
        q.question,
        "85%",
        q.type === "rating" ? "4.2" : "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey-analytics.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Survey Builder Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Survey Builder</h2>
          <p className="text-muted-foreground">
            Create and manage post-event surveys
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Survey Preview</DialogTitle>
                <DialogDescription>
                  This is how your survey will appear to attendees
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-6 p-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {surveyTitle}
                    </h3>
                    <p className="text-muted-foreground">{surveyDescription}</p>
                  </div>
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <p className="font-medium">
                        {index + 1}.{" "}
                        {question.question || "Your question will appear here"}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </p>
                      {renderQuestionPreview(question)}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="gradient">
            <Send className="w-4 h-4 mr-2" />
            Activate Survey
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Survey Builder</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6 mt-6">
          {/* Survey Header */}
          <GlassCard className="p-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="survey-title"
                  className="text-base font-semibold"
                >
                  Survey Title
                </Label>
                <Input
                  id="survey-title"
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="glass-card border-white/20 mt-2"
                  placeholder="Enter survey title"
                />
              </div>
              <div>
                <Label
                  htmlFor="survey-description"
                  className="text-base font-semibold"
                >
                  Description
                </Label>
                <Textarea
                  id="survey-description"
                  value={surveyDescription}
                  onChange={(e) => setSurveyDescription(e.target.value)}
                  className="glass-card border-white/20 mt-2"
                  placeholder="Provide context and instructions for your survey"
                  rows={3}
                />
              </div>
            </div>
          </GlassCard>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline">Question {index + 1}</Badge>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateQuestion(question.id)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label>Question</Label>
                          <Textarea
                            value={question.question}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                question: e.target.value,
                              })
                            }
                            placeholder="Enter your question"
                            className="glass-card border-white/20 mt-2 resize-none"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Question Type</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value: Question["type"]) =>
                              updateQuestion(question.id, {
                                type: value,
                                options:
                                  value === "multiple-choice"
                                    ? ["Option 1", "Option 2"]
                                    : undefined,
                              })
                            }
                          >
                            <SelectTrigger className="glass-card border-white/20 mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">
                                Text Response
                              </SelectItem>
                              <SelectItem value="rating">
                                Star Rating
                              </SelectItem>
                              <SelectItem value="multiple-choice">
                                Multiple Choice
                              </SelectItem>
                              <SelectItem value="yes-no">Yes/No</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center space-x-2 mt-3">
                            <Checkbox
                              id={`required-${question.id}`}
                              checked={question.required}
                              onCheckedChange={(checked) =>
                                updateQuestion(question.id, {
                                  required: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor={`required-${question.id}`}
                              className="text-sm"
                            >
                              Required
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Multiple Choice Options */}
                      {question.type === "multiple-choice" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Answer Options</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addOption(question.id)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Option
                            </Button>
                          </div>
                          {question.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateOption(
                                    question.id,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                className="glass-card border-white/20"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  deleteOption(question.id, optionIndex)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Preview */}
                      <div className="p-4 rounded-xl bg-white/5">
                        <p className="text-sm text-muted-foreground mb-3">
                          Preview:
                        </p>
                        <div className="mb-3">
                          <p className="font-medium mb-2">
                            {question.question ||
                              "Your question will appear here"}
                            {question.required && (
                              <span className="text-destructive ml-1">*</span>
                            )}
                          </p>
                        </div>
                        {renderQuestionPreview(question)}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Add Question Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={addQuestion}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Question
          </Button>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Survey Distribution Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Distribution</p>
                  <p className="text-sm text-muted-foreground">
                    Send survey automatically after the event ends
                  </p>
                </div>
                <Switch checked={autoSend} onCheckedChange={setAutoSend} />
              </div>

              {autoSend && (
                <div>
                  <Label htmlFor="send-delay">
                    Send Delay (hours after event)
                  </Label>
                  <Select value={sendDelay} onValueChange={setSendDelay}>
                    <SelectTrigger className="w-48 mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediately</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                      <SelectItem value="72">72 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="border-t border-white/10 pt-6">
                <h4 className="font-medium mb-4">Survey Link</h4>
                <div className="flex gap-2">
                  <Input
                    value="https://gathereace.app/survey/tech-summit-2025"
                    readOnly
                    className="glass-card border-white/20"
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Share this link directly with attendees or embed it in your
                  communications
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Response Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Anonymous Responses</p>
                  <p className="text-sm text-muted-foreground">
                    Don't collect respondent names or email addresses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Multiple Submissions</p>
                  <p className="text-sm text-muted-foreground">
                    Let attendees submit the survey more than once
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Send Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Remind attendees who haven't responded after 3 days
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {surveyAnalytics.totalResponses}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Responses
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary/50" />
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-500">
                    {surveyAnalytics.responseRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500/50" />
              </div>
              <Progress
                value={surveyAnalytics.responseRate}
                className="mt-2 h-2"
              />
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-500">
                    {surveyAnalytics.avgRating}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500/50" />
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-500">
                    {surveyAnalytics.completionRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Completion Rate
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-500/50" />
              </div>
            </GlassCard>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Response Timeline
              </h4>
              <div className="space-y-4">
                {surveyAnalytics.responses.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{day.date}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(day.count / 150) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">
                        {day.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                Question Performance
              </h4>
              <div className="space-y-4">
                {questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="truncate flex-1 mr-2">
                        Q{index + 1}: {question.question || "Untitled Question"}
                      </span>
                      <span className="text-muted-foreground">
                        95% answered
                      </span>
                    </div>
                    <Progress value={95 - index * 5} className="h-2" />
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={exportAnalytics}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Detailed Report
              </Button>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <h4 className="text-lg font-semibold mb-4">
              Recent Feedback Highlights
            </h4>
            <div className="space-y-4">
              {[
                "Great speakers and well-organized event. Would definitely attend again!",
                "Loved the networking opportunities. Could use better catering options.",
                "Excellent venue and content. The workshops were particularly valuable.",
              ].map((feedback, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border-l-4 border-primary"
                >
                  <p className="text-sm italic">"{feedback}"</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      Anonymous Attendee
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
