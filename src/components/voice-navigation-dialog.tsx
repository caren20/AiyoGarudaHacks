"use client";

import { useState, useEffect } from "react";
import { Mic, Volume2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Type definitions for Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceNavigationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceNavigationDialog({
  open,
  onOpenChange,
}: VoiceNavigationDialogProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    setIsSupported(
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window
    );
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = true; // Changed to true for continuous listening
    newRecognition.interimResults = true;
    newRecognition.lang = "en-US";

    newRecognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    newRecognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Show both final and interim results
      const fullTranscript = (finalTranscript + interimTranscript).trim();
      if (fullTranscript) {
        setTranscript(fullTranscript + (interimTranscript ? "..." : ""));
      }
    };

    newRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      setTranscript(`Error: ${event.error}. Please try again.`);
    };

    newRecognition.onend = () => {
      // Only set listening to false if we're not manually stopping
      if (isListening) {
        setIsListening(false);
      }
    };

    newRecognition.start();
    setRecognition(newRecognition);
  };

  const cancelListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setIsListening(false);
    setTranscript("");
  };

  const finishListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setIsListening(false);

    // Process the final transcript
    if (transcript) {
      handleVoiceCommand(transcript.toLowerCase());
    }
  };

  const handleVoiceCommand = (command: string) => {
    // Simple voice navigation logic
    if (command.includes("home")) {
      setTranscript("Navigating to Home...");
      setTimeout(() => onOpenChange(false), 1500);
    } else if (command.includes("course") || command.includes("courses")) {
      setTranscript("Navigating to Courses...");
      setTimeout(() => onOpenChange(false), 1500);
    } else if (command.includes("news")) {
      setTranscript("Navigating to News...");
      setTimeout(() => onOpenChange(false), 1500);
    } else if (command.includes("profile")) {
      setTranscript("Navigating to Profile...");
      setTimeout(() => onOpenChange(false), 1500);
    } else if (command.includes("settings")) {
      setTranscript("Navigating to Settings...");
      setTimeout(() => onOpenChange(false), 1500);
    } else {
      setTranscript(
        `Command "${command}" not recognized. Try saying: Home, Courses, News, Profile, or Settings.`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-600" />
            Voice Navigation
          </DialogTitle>
          <DialogDescription>
            Say a command to navigate to any page. Try saying &quot;Home&quot;,
            &quot;Courses&quot;, &quot;News&quot;, &quot;Profile&quot;, or
            &quot;Settings&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full transition-all duration-200 ${
                isListening
                  ? "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
                  : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/50"
              }`}
              onClick={isListening ? undefined : startListening}
              disabled={!isSupported || isListening}
            >
              <Mic className="w-8 h-8 text-white" />
            </Button>
            {isListening && (
              <>
                <div className="absolute -inset-2 rounded-full border-2 border-blue-500 animate-ping"></div>
                <div className="absolute -inset-4 rounded-full border border-blue-300 animate-pulse"></div>
              </>
            )}
          </div>

          {/* Show Cancel and Finish buttons when listening */}
          {isListening && (
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
                onClick={cancelListening}
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                size="lg"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                onClick={finishListening}
              >
                <Check className="w-4 h-4" />
                Finish
              </Button>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isListening
                ? "Listening... Use buttons below to cancel or finish"
                : "Click to start listening"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isListening
                ? "Speak your command, then click Finish when done"
                : "Say: Home, Courses, News, Profile, or Settings"}
            </p>
            {!isSupported && (
              <p className="text-xs text-red-500 mt-1">
                Voice recognition not supported in this browser
              </p>
            )}
          </div>

          {transcript && (
            <div className="w-full p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-700">
                <strong>You said:</strong> {transcript}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
