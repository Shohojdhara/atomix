import{j as M}from"./jsx-runtime-BjG_zV1W.js";import{f as e}from"./index-BxLnRenJ.js";import{V as be}from"./VideoPlayer-HfnzGmEG.js";import"./SpeakerX.es-Cg-mjUf1.js";import"./index-BVDOR7y2.js";import"./components-BrxBU25R.js";import"./index-kdCLY6-3.js";const Ee={title:"Components/VideoPlayer",component:be,parameters:{layout:"centered",backgrounds:{default:"dark"},docs:{description:{component:`
# VideoPlayer Component

An advanced, modern video player with custom controls, keyboard shortcuts, picture-in-picture support, fullscreen capabilities, and comprehensive accessibility features. Now supports both regular video files and YouTube embeds.

## Features

- **Dual Video Support**: Regular video files and YouTube embeds
- **Custom Controls**: Play/pause, seek, volume, fullscreen, picture-in-picture (for regular videos)
- **YouTube Integration**: Seamless YouTube video embedding with native controls
- **Keyboard Shortcuts**: Space (play/pause), arrows (seek/volume), M (mute), F (fullscreen)
- **Quality Selection**: Multiple video quality options
- **Playback Speed**: Adjustable playback rates
- **Subtitles Support**: Multiple subtitle tracks
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Full ARIA support and keyboard navigation
- **Modern UI**: Sleek, customizable interface

## YouTube Support

- **Multiple Input Methods**: Use \`youtubeId\` prop, \`type="youtube"\`, or YouTube URLs in \`src\`
- **Auto-Detection**: Automatically detects YouTube URLs and switches to embed mode
- **Native Controls**: Uses YouTube's native player controls for optimal experience
- **All YouTube Features**: Supports autoplay, muting, looping, and fullscreen

## Keyboard Shortcuts (Regular Videos)

- **Space**: Play/Pause
- **Left/Right Arrow**: Seek backward/forward 10 seconds
- **Up/Down Arrow**: Volume up/down
- **M**: Toggle mute
- **F**: Toggle fullscreen
        `}}},argTypes:{src:{control:"text",description:"Video source URL or YouTube URL"},type:{control:"select",options:["video","youtube"],description:"Video player type"},youtubeId:{control:"text",description:"YouTube video ID (alternative to src for YouTube videos)"},poster:{control:"text",description:"Poster image URL"},autoplay:{control:"boolean",description:"Whether video should autoplay"},loop:{control:"boolean",description:"Whether video should loop"},muted:{control:"boolean",description:"Whether video should be muted"},controls:{control:"boolean",description:"Whether to show custom controls"},aspectRatio:{control:"select",options:["16:9","4:3","21:9","1:1"],description:"Video aspect ratio"},showDownload:{control:"boolean",description:"Whether to show download button"},showShare:{control:"boolean",description:"Whether to show share button"},showSettings:{control:"boolean",description:"Whether to show settings menu"},ambientMode:{control:"boolean",description:"Enable ambient mode (YouTube-like background glow)"}}},n="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",o="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",Ae=[{label:"1080p",src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",resolution:"1920x1080"},{label:"720p",src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",resolution:"1280x720"},{label:"480p",src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",resolution:"854x480"}],Me=[{label:"English",src:"data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApTaW50ZWwgLSBBbiBvcGVuIHNvdXJjZSBhbmltYXRlZCBzaG9ydCBmaWxtCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApCeSB0aGUgQmxlbmRlciBGb3VuZGF0aW9uCgowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApUaGlzIGlzIGEgZGVtb25zdHJhdGlvbiBvZiBzdWJ0aXRsZXMKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCllvdSBjYW4gc3dpdGNoIGJldHdlZW4gbGFuZ3VhZ2VzCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApVc2luZyB0aGUgc2V0dGluZ3MgbWVudQ==",srcLang:"en",default:!0},{label:"Spanish",src:"data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApTaW50ZWwgLSBVbiBjb3J0b21ldHJhamUgYW5pbWFkbyBkZSBjw7NkaWdvIGFiaWVydG8KCjAwOjAwOjA1LjAwMCAtLT4gMDA6MDA6MTAuMDAwClBvciBsYSBGdW5kYWNpw7NuIEJsZW5kZXIKCjAwOjAwOjEwLjAwMCAtLT4gMDA6MDA6MTUuMDAwCkVzdGEgZXMgdW5hIGRlbW9zdHJhY2nDs24gZGUgc3VidMOtdHVsb3MKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwClB1ZWRlcyBjYW1iaWFyIGVudHJlIGlkaW9tYXMKCjAwOjAwOjIwLjAwMCAtLT4gMDA6MDA6MjUuMDAwClVzYW5kbyBlbCBtZW7DuiBkZSBjb25maWd1cmFjacOzbg==",srcLang:"es"},{label:"বাংলা",src:"data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=",srcLang:"bn"}],a={args:{src:n,poster:o,width:"800px",height:"450px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},r={args:{src:n,poster:o,width:"800px",height:"450px",showDownload:!0,showShare:!0,showSettings:!0,quality:Ae,subtitles:Me,playbackRates:[.25,.5,.75,1,1.25,1.5,2],onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},s={args:{src:n,poster:o,autoplay:!0,muted:!0,width:"600px",height:"338px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},t={args:{src:n,poster:o,controls:!1,width:"600px",height:"338px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},p={args:{src:n,poster:o,aspectRatio:"1:1",width:"400px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},u={args:{src:n,poster:o,aspectRatio:"21:9",width:"800px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},g={args:{src:n,poster:o,width:"100%",aspectRatio:"16:9",showDownload:!0,showShare:!0,quality:Ae,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()},decorators:[b=>M.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto"},children:M.jsx(b,{})})]},l={args:{src:n,poster:o,width:"700px",height:"394px",playbackRates:[.1,.25,.5,.75,1,1.25,1.5,1.75,2,3,4],showSettings:!0,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},d={args:{src:n,poster:o,width:"400px",height:"225px",showDownload:!1,showShare:!1,showSettings:!1,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},i={args:{src:n,poster:o,loop:!0,autoplay:!0,muted:!0,width:"500px",height:"281px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},m={args:{src:n,poster:o,width:"700px",height:"394px",onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},c={args:{src:n,poster:o,width:"800px",height:"450px",ambientMode:!0,autoplay:!0,muted:!0,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()},parameters:{backgrounds:{default:"dark"}},decorators:[b=>M.jsx("div",{style:{padding:"2rem"},children:M.jsx(b,{})})]},w={args:{type:"youtube",youtubeId:"dQw4w9WgXcQ",width:"800px",height:"450px",autoplay:!1,muted:!1,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},h={args:{src:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",width:"800px",height:"450px",autoplay:!1,muted:!1,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},C={args:{type:"youtube",youtubeId:"dQw4w9WgXcQ",width:"800px",height:"450px",autoplay:!0,muted:!0,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},f={args:{src:n,poster:o,width:"800px",height:"450px",subtitles:Me,showSettings:!0,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}},A={args:{src:n,poster:o,width:"800px",height:"450px",subtitles:[{label:"বাংলা",src:"data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=",srcLang:"bn",default:!0}],showSettings:!0,onPlay:e(),onPause:e(),onEnded:e(),onTimeUpdate:e(),onVolumeChange:e(),onFullscreenChange:e(),onError:e()}};var D,y,j;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(j=(y=a.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var K,O,S;r.parameters={...r.parameters,docs:{...(K=r.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    showDownload: true,
    showShare: true,
    showSettings: true,
    quality: sampleQualities,
    subtitles: sampleSubtitles,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(S=(O=r.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};var P,E,V;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    autoplay: true,
    muted: true,
    width: '600px',
    height: '338px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(V=(E=s.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var x,v,T;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    controls: false,
    width: '600px',
    height: '338px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(T=(v=t.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var q,L,W;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '1:1',
    width: '400px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(W=(L=p.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var I,U,F;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    aspectRatio: '21:9',
    width: '800px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(F=(U=u.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var R,X,k;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '100%',
    aspectRatio: '16:9',
    showDownload: true,
    showShare: true,
    quality: sampleQualities,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  },
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
        <Story />
      </div>]
}`,...(k=(X=g.parameters)==null?void 0:X.docs)==null?void 0:k.source}}};var B,Y,H;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '700px',
    height: '394px',
    playbackRates: [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4],
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(H=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:H.source}}};var Z,G,z;d.parameters={...d.parameters,docs:{...(Z=d.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '400px',
    height: '225px',
    showDownload: false,
    showShare: false,
    showSettings: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(z=(G=d.parameters)==null?void 0:G.docs)==null?void 0:z.source}}};var Q,N,J;i.parameters={...i.parameters,docs:{...(Q=i.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    loop: true,
    autoplay: true,
    muted: true,
    width: '500px',
    height: '281px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(J=(N=i.parameters)==null?void 0:N.docs)==null?void 0:J.source}}};var _,$,ee;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '700px',
    height: '394px',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(ee=($=m.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ne,oe,ae;c.parameters={...c.parameters,docs:{...(ne=c.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    ambientMode: true,
    autoplay: true,
    muted: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [Story => <div style={{
    padding: '2rem'
  }}>
        <Story />
      </div>]
}`,...(ae=(oe=c.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var re,se,te;w.parameters={...w.parameters,docs:{...(re=w.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    type: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(te=(se=w.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var pe,ue,ge;h.parameters={...h.parameters,docs:{...(pe=h.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: false,
    muted: false,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(ge=(ue=h.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var le,de,ie;C.parameters={...C.parameters,docs:{...(le=C.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    type: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    width: '800px',
    height: '450px',
    autoplay: true,
    muted: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(ie=(de=C.parameters)==null?void 0:de.docs)==null?void 0:ie.source}}};var me,ce,we;f.parameters={...f.parameters,docs:{...(me=f.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    subtitles: sampleSubtitles,
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(we=(ce=f.parameters)==null?void 0:ce.docs)==null?void 0:we.source}}};var he,Ce,fe;A.parameters={...A.parameters,docs:{...(he=A.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    src: sampleVideo,
    poster: samplePoster,
    width: '800px',
    height: '450px',
    subtitles: [{
      label: 'বাংলা',
      src: 'data:text/vtt;charset=utf-8;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA1LjAwMApzaW50ZWwgLSDgpI/gppXgpp/gpr8g4KST4KSq4KWH4KSoIOCmuOCni+CmsOCnjeCmuCDgpI/gp43gpq/gpr/gpq7gp4fgpp/gp4fgpqEg4KaV4KaX4Ka/4KaoCgowMDowMDowNS4wMDAgLS0+IDAwOjAwOjEwLjAwMApgpqzgp43gpqzgp4fgpqjgp43gpqHgpr7gprAg4Kar4Ka+4KaJ4KaP4KaH4Ka24KaoIOCmr+CmvuCmsOCmvwowMDowMDoxMC4wMDAgLS0+IDAwOjAwOjE1LjAwMApgpqHgpr/gpp/gpr8g4Ka44Ka+4KaW4KaX4Ka/4KaX4KaC4KaXIOCmj+CmsOCmvuCmqOCmvuCmrOCmvuCmsCDgpqjgpr/gpqbgprDgp43gprbgpqgKCjAwOjAwOjE1LjAwMCAtLT4gMDA6MDA6MjAuMDAwCuCmhuCmquCmqOCmvuCmsOCmviDgpq3gpr7gprfgpr7gprAg4Kau4Kav4KaX4KWHIOCmquCmsOCmv+CmrOCmsOCnjeCmpOCmqCDgppXgprDgpqTgp4cg4Kaq4Ka+4Kaw4KasCgowMDowMDoyMC4wMDAgLS0+IDAwOjAwOjI1LjAwMApgprjgp4fgpp/gpr/gppngprgg4Kau4KeH4Kao4KeB4KaXIOCmrOCnjeCmr+CmreCmvuCmsOCmviDgppXgprDgp4fgpqQ=',
      srcLang: 'bn',
      default: true
    }],
    showSettings: true,
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onTimeUpdate: fn(),
    onVolumeChange: fn(),
    onFullscreenChange: fn(),
    onError: fn()
  }
}`,...(fe=(Ce=A.parameters)==null?void 0:Ce.docs)==null?void 0:fe.source}}};const Ve=["Default","WithAllFeatures","AutoplayMuted","NoControls","SquareAspectRatio","UltraWideAspectRatio","ResponsivePlayer","WithCustomPlaybackRates","MinimalPlayer","LoopingVideo","WithEventHandlers","AmbientMode","YouTubeEmbed","YouTubeURL","YouTubeAutoplay","WithSubtitles","WithBengaliSubtitles"];export{c as AmbientMode,s as AutoplayMuted,a as Default,i as LoopingVideo,d as MinimalPlayer,t as NoControls,g as ResponsivePlayer,p as SquareAspectRatio,u as UltraWideAspectRatio,r as WithAllFeatures,A as WithBengaliSubtitles,l as WithCustomPlaybackRates,m as WithEventHandlers,f as WithSubtitles,C as YouTubeAutoplay,w as YouTubeEmbed,h as YouTubeURL,Ve as __namedExportsOrder,Ee as default};
