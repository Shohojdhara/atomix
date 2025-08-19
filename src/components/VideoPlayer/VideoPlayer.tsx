import {
  ArrowsIn,
  ArrowsOut,
  Download,
  Gear,
  Pause,
  Play,
  Share,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  SpeakerX,
} from '@phosphor-icons/react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useAmbientMode } from '../../lib/composables/useAmbientMode';
import { useVideoPlayer } from '../../lib/composables/useVideoPlayer';
import { VIDEO_PLAYER } from '../../lib/constants/components';
import { VideoPlayerProps } from '../../lib/types/components';
import { extractYouTubeId, isYouTubeUrl } from '../../lib/utils';

/**
 * Advanced Video Player Component
 */
export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      src,
      type = 'video',
      youtubeId,
      poster,
      autoplay = false,
      loop = false,
      muted = false,
      controls = true,
      preload = 'metadata',
      width,
      height,
      aspectRatio = '16:9',
      className = '',
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onVolumeChange,
      onFullscreenChange,
      onError,
      showDownload = false,
      showShare = false,
      showSettings = true,
      playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
      subtitles,
      quality,
      ambientMode = false,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Determine video source and type
    const isYouTube = type === 'youtube' || youtubeId || (src && isYouTubeUrl(src));
    const videoId = youtubeId || (isYouTube && src ? extractYouTubeId(src) : null);

    const {
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      isFullscreen,
      isLoading,
      playbackRate,
      currentQuality,
      showControls,
      play,
      pause,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      toggleFullscreen,
      togglePictureInPicture,
      setPlaybackRate,
      setQuality,
      formatTime,
      getProgressPercentage,
      getBufferedPercentage,
    } = useVideoPlayer({
      videoRef: videoRef,
      containerRef: containerRef,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onVolumeChange,
      onFullscreenChange,
      onError,
      playbackRates,
      quality,
    });

    useAmbientMode({
      videoRef: videoRef,
      canvasRef: canvasRef,
      enabled: ambientMode,
    });

    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [activeSettingsTab, setActiveSettingsTab] = useState<'quality' | 'speed' | 'subtitles'>(
      'quality'
    );
    const [activeSubtitle, setActiveSubtitle] = useState<string | null>(
      subtitles?.find(sub => sub.default)?.srcLang || null
    );

    const handleProgressClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seek(percent * duration);
      },
      [duration, seek]
    );

    const handleVolumeClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setVolume(percent);
      },
      [setVolume]
    );

    const handleDownload = useCallback(() => {
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        a.download = 'video';
        a.click();
      }
    }, [src]);

    const handleShare = useCallback(async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Video',
            url: window.location.href,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      }
    }, []);

    const setSubtitle = useCallback(
      (subtitleLang: string | null) => {
        const video = videoRef.current;
        if (video) {
          const tracks = video.textTracks;
          console.log('Setting subtitle:', subtitleLang, 'Available tracks:', tracks.length);

          // Hide all tracks first
          for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = 'hidden';
            console.log(`Track ${i}:`, tracks[i].language, tracks[i].label);
          }

          // Show selected track
          if (subtitleLang) {
            for (let i = 0; i < tracks.length; i++) {
              if (tracks[i].language === subtitleLang) {
                tracks[i].mode = 'showing';
                console.log('Showing track:', tracks[i].language, tracks[i].label);
                break;
              }
            }
          }

          setActiveSubtitle(subtitleLang);
        }
      },
      [videoRef]
    );

    // Initialize subtitle tracks when video loads
    useEffect(() => {
      const video = videoRef.current;
      if (video && subtitles) {
        const handleLoadedData = () => {
          // Wait for tracks to be loaded
          setTimeout(() => {
            const defaultSubtitle = subtitles.find(sub => sub.default);
            if (defaultSubtitle) {
              setSubtitle(defaultSubtitle.srcLang);
            }
          }, 100);
        };

        const handleCanPlay = () => {
          // Ensure tracks are ready
          if (video.textTracks.length > 0) {
            const defaultSubtitle = subtitles.find(sub => sub.default);
            if (defaultSubtitle) {
              setSubtitle(defaultSubtitle.srcLang);
            }
          }
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('canplay', handleCanPlay);
        };
      }
    }, [subtitles, setSubtitle, videoRef]);

    const handleContainerClick = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault();
            togglePlay();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            seek(currentTime - 10);
            break;
          case 'ArrowRight':
            e.preventDefault();
            seek(currentTime + 10);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setVolume(Math.min(1, volume + 0.1));
            break;
          case 'ArrowDown':
            e.preventDefault();
            setVolume(Math.max(0, volume - 0.1));
            break;
          case 'm':
            e.preventDefault();
            toggleMute();
            break;
          case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        }
      },
      [togglePlay, currentTime, seek, volume, setVolume, toggleMute, toggleFullscreen]
    );

    return (
      <div
        ref={containerRef}
        className={`${VIDEO_PLAYER.CLASSES.BASE} ${isYouTube ? VIDEO_PLAYER.CLASSES.YOUTUBE : ''} ${ambientMode ? VIDEO_PLAYER.CLASSES.AMBIENT : ''} ${className}`}
        style={{
          width,
          height,
          aspectRatio: aspectRatio ? aspectRatio.replace(':', '/') : undefined,
        }}
        tabIndex={0}
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        role="application"
        aria-label="Video player"
        {...props}
      >
        {ambientMode && (
          <canvas
            ref={canvasRef}
            className={VIDEO_PLAYER.CLASSES.AMBIENT_CANVAS}
            aria-hidden="true"
          />
        )}

        {isYouTube && videoId ? (
          <iframe
            ref={iframeRef}
            className={VIDEO_PLAYER.CLASSES.VIDEO}
            src={`https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
              autoplay: autoplay ? '1' : '0',
              loop: loop ? '1' : '0',
              mute: muted ? '1' : '0',
              controls: controls ? '1' : '0',
              modestbranding: '1',
              rel: '0',
              ...(loop && { playlist: videoId }),
            }).toString()}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            ref={(element) => {
              videoRef.current = element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref) {
                ref.current = element;
              }
            }}
            className={VIDEO_PLAYER.CLASSES.VIDEO}
            src={src}
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            preload={preload}
            controls={false}
            crossOrigin="anonymous"
          >
            {subtitles &&
              subtitles.map(subtitle => (
                <track
                  key={subtitle.srcLang}
                  kind="subtitles"
                  src={subtitle.src}
                  srcLang={subtitle.srcLang}
                  label={subtitle.label}
                  default={subtitle.default}
                />
              ))}
          </video>
        )}

        {isLoading && (
          <div className={VIDEO_PLAYER.CLASSES.LOADING}>
            <div className={VIDEO_PLAYER.CLASSES.SPINNER} />
          </div>
        )}

        {controls && !isYouTube && (
          <div
            className={`${VIDEO_PLAYER.CLASSES.CONTROLS} ${showControls ? VIDEO_PLAYER.CLASSES.CONTROLS_VISIBLE : ''}`}
          >
            <div className={VIDEO_PLAYER.CLASSES.PROGRESS_CONTAINER}>
              <div className={VIDEO_PLAYER.CLASSES.PROGRESS_BAR} onClick={handleProgressClick}>
                <div
                  className={VIDEO_PLAYER.CLASSES.PROGRESS_BUFFERED}
                  style={{ width: `${getBufferedPercentage()}%` }}
                />
                <div
                  className={VIDEO_PLAYER.CLASSES.PROGRESS_PLAYED}
                  style={{ width: `${getProgressPercentage()}%` }}
                />
                <div
                  className={VIDEO_PLAYER.CLASSES.PROGRESS_THUMB}
                  style={{ left: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            <div className={VIDEO_PLAYER.CLASSES.CONTROLS_ROW}>
              <div className={VIDEO_PLAYER.CLASSES.CONTROLS_LEFT}>
                <button
                  className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                  onClick={() => seek(currentTime - 10)}
                  aria-label="Skip back 10 seconds"
                >
                  <SkipBack size={20} />
                </button>

                <button
                  className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                  onClick={() => seek(currentTime + 10)}
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward size={20} />
                </button>

                <div className={VIDEO_PLAYER.CLASSES.VOLUME_CONTAINER}>
                  <button
                    className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? <SpeakerX size={20} /> : <SpeakerHigh size={20} />}
                  </button>
                  <div className={VIDEO_PLAYER.CLASSES.VOLUME_SLIDER}>
                    <div className={VIDEO_PLAYER.CLASSES.VOLUME_BAR} onClick={handleVolumeClick}>
                      <div
                        className={VIDEO_PLAYER.CLASSES.VOLUME_FILL}
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className={VIDEO_PLAYER.CLASSES.TIME_DISPLAY}>
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className={VIDEO_PLAYER.CLASSES.CONTROLS_RIGHT}>
                {showSettings && (
                  <div className={VIDEO_PLAYER.CLASSES.SETTINGS_CONTAINER}>
                    <button
                      className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                      onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                      aria-label="Settings"
                    >
                      <Gear size={20} />
                    </button>

                    {showSettingsMenu && (
                      <div className={VIDEO_PLAYER.CLASSES.SETTINGS_MENU}>
                        <div className={VIDEO_PLAYER.CLASSES.SETTINGS_TABS}>
                          {quality && quality.length > 1 && (
                            <button
                              className={`${VIDEO_PLAYER.CLASSES.SETTINGS_TAB} ${activeSettingsTab === 'quality' ? VIDEO_PLAYER.CLASSES.SETTINGS_TAB_ACTIVE : ''}`}
                              onClick={() => setActiveSettingsTab('quality')}
                            >
                              Quality
                            </button>
                          )}
                          <button
                            className={`${VIDEO_PLAYER.CLASSES.SETTINGS_TAB} ${activeSettingsTab === 'speed' ? VIDEO_PLAYER.CLASSES.SETTINGS_TAB_ACTIVE : ''}`}
                            onClick={() => setActiveSettingsTab('speed')}
                          >
                            Speed
                          </button>
                          <button
                            className={`${VIDEO_PLAYER.CLASSES.SETTINGS_TAB} ${activeSettingsTab === 'subtitles' ? VIDEO_PLAYER.CLASSES.SETTINGS_TAB_ACTIVE : ''}`}
                            onClick={() => setActiveSettingsTab('subtitles')}
                          >
                            Subtitles
                          </button>
                        </div>

                        <div className={VIDEO_PLAYER.CLASSES.SETTINGS_CONTENT}>
                          {activeSettingsTab === 'quality' && quality && (
                            <div className={VIDEO_PLAYER.CLASSES.SETTINGS_OPTIONS}>
                              {quality.map(q => (
                                <button
                                  key={q.label}
                                  className={`${VIDEO_PLAYER.CLASSES.SETTINGS_OPTION} ${currentQuality?.label === q.label ? VIDEO_PLAYER.CLASSES.SETTINGS_OPTION_ACTIVE : ''}`}
                                  onClick={() => setQuality(q)}
                                >
                                  {q.label}
                                </button>
                              ))}
                            </div>
                          )}

                          {activeSettingsTab === 'speed' && (
                            <div className={VIDEO_PLAYER.CLASSES.SETTINGS_OPTIONS}>
                              {playbackRates.map(rate => (
                                <button
                                  key={rate}
                                  className={`${VIDEO_PLAYER.CLASSES.SETTINGS_OPTION} ${playbackRate === rate ? VIDEO_PLAYER.CLASSES.SETTINGS_OPTION_ACTIVE : ''}`}
                                  onClick={() => setPlaybackRate(rate)}
                                >
                                  {rate}x
                                </button>
                              ))}
                            </div>
                          )}

                          {activeSettingsTab === 'subtitles' && (
                            <div className={VIDEO_PLAYER.CLASSES.SETTINGS_OPTIONS}>
                              {subtitles && subtitles.length > 0 ? (
                                <>
                                  <button
                                    className={`${VIDEO_PLAYER.CLASSES.SETTINGS_OPTION} ${activeSubtitle === null ? VIDEO_PLAYER.CLASSES.SETTINGS_OPTION_ACTIVE : ''}`}
                                    onClick={() => setSubtitle(null)}
                                  >
                                    Off
                                  </button>
                                  {subtitles.map(subtitle => (
                                    <button
                                      key={subtitle.srcLang}
                                      className={`${VIDEO_PLAYER.CLASSES.SETTINGS_OPTION} ${activeSubtitle === subtitle.srcLang ? VIDEO_PLAYER.CLASSES.SETTINGS_OPTION_ACTIVE : ''}`}
                                      onClick={() => setSubtitle(subtitle.srcLang)}
                                    >
                                      {subtitle.label}
                                    </button>
                                  ))}
                                </>
                              ) : (
                                <div
                                  className={VIDEO_PLAYER.CLASSES.SETTINGS_OPTION}
                                  style={{ opacity: 0.6, cursor: 'default' }}
                                >
                                  No subtitles available
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {showDownload && (
                  <button
                    className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                    onClick={handleDownload}
                    aria-label="Download video"
                  >
                    <Download size={20} />
                  </button>
                )}

                {showShare && (
                  <button
                    className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                    onClick={handleShare}
                    aria-label="Share video"
                  >
                    <Share size={20} />
                  </button>
                )}

                <button
                  className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                  onClick={togglePictureInPicture}
                  aria-label="Picture in Picture"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
                  </svg>
                </button>

                <button
                  className={VIDEO_PLAYER.CLASSES.CONTROL_BUTTON}
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <ArrowsIn size={20} /> : <ArrowsOut size={20} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
