import { Button, HStack } from "@chakra-ui/react";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
