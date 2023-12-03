import { Button, HStack } from "@chakra-ui/react";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
}

// This is a custom component that uses the HTML5 audio element to play the audio of the word.
export default function AudioPlayer({ src }: AudioPlayerProps) {
  // Using the useState hook to keep track of whether the audio is playing or not.
  const [isPlaying, setIsPlaying] = useState(false);
  // Using the useRef hook to access the audio element.
  const audioRef = useRef<HTMLAudioElement>(null);
  // This function toggles between playing and pausing the audio.
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  // This function is called when the audio ends. It sets the isPlaying state to false.
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <HStack>
      <audio ref={audioRef} src={src} onEnded={handleAudioEnd} />
      <Button
        variant="ghost"
        h={30}
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <FontAwesomeIcon icon={faVolumeUp} />
      </Button>
    </HStack>
  );
}
