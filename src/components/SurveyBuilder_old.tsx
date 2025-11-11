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
import { Plus, Trash2, GripVertical, Star, Eye, Send, BarChart3, Users, Clock, Download, Copy, Settings } from "lucide-react";

interface Question {
  id: number;
  type: "text" | "rating" | "multiple-choice" | "yes-no";
  question: string;
  options?: string[];
  required: boolean;
}

export const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState("Post-Event Survey");
  const [surveyDescription, setSurveyDescription] = useState("Help us improve future events with your feedback");
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
    }
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
    ]
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

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
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

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "rating":
        return (
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-500" />
            ))}
          </div>
        );
      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white/40"></div>
                <span className="text-sm">{option || "Option " + (index + 1)}</span>
              </div>
            ))}
          </div>
        );
      case "yes-no":
        return (
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Yes
            </Button>
            <Button variant="outline" size="sm">
              No
            </Button>
          </div>
        );
      case "text":
        return (
          <Textarea
            placeholder="Type your answer..."
            className="glass-card border-white/20"
            disabled
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Survey Header */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="surveyTitle">Survey Title</Label>
            <Input
              id="surveyTitle"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              className="mt-2 glass-card border-white/20 text-xl font-bold"
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
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-2 cursor-move">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Label>Question {index + 1}</Label>
                      <Input
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(question.id, { question: e.target.value })
                        }
                        placeholder="Enter your question..."
                        className="mt-2 glass-card border-white/20"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteQuestion(question.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value: Question["type"]) =>
                          updateQuestion(question.id, { type: value })
                        }
                      >
                        <SelectTrigger className="mt-2 glass-card border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Response</SelectItem>
                          <SelectItem value="rating">Rating (1-5 Stars)</SelectItem>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="yes-no">Yes/No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={question.required}
                          onChange={(e) =>
                            updateQuestion(question.id, { required: e.target.checked })
                          }
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">Required</span>
                      </label>
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  {question.type === "multiple-choice" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Options</Label>
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
                              updateOption(question.id, optionIndex, e.target.value)
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                            className="glass-card border-white/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteOption(question.id, optionIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Preview */}
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-sm text-muted-foreground mb-3">Preview:</p>
                    <div className="mb-3">
                      <p className="font-medium mb-2">
                        {question.question || "Your question will appear here"}
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

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" size="lg">
          Preview Survey
        </Button>
        <Button variant="gradient" size="lg">
          Save & Activate
        </Button>
      </div>
    </div>
  );
};
