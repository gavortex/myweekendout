import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
  } from "agora-rtc-react";
  import { useState } from "react";
  import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
  
  
  export const VideoCalling = () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    return(
          <AgoraRTCProvider client={client}>
            <Basics />
          </AgoraRTCProvider>
    );
  }
  
  const Basics = () => {
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected(); 
    const [appId, setAppId] = useState("");
    const [channel, setChannel] = useState("");
    const [token, setToken] = useState("");
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  
    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
    usePublish([localMicrophoneTrack, localCameraTrack]);
  
    const remoteUsers = useRemoteUsers();
  
    return (
      <>
        <div>
          {isConnected ? (
            <div>
              <div>
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  playAudio={false} 
                  videoTrack={localCameraTrack}
                  style={{width: '90%', height: 300 }}
                >
                  <samp>You</samp>
                </LocalUser>
              </div>
              {remoteUsers.map((user) => (
                <div key={user.uid}>
                  <RemoteUser user={user} style={{width: '90%', height: 300 }}>
                    <samp>{user.uid}</samp>
                  </RemoteUser>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <input
                onChange={e => setAppId(e.target.value)}
                placeholder="<Your app ID>"
                value={appId}
              />
              <input
                onChange={e => setChannel(e.target.value)}
                placeholder="<Your channel Name>"
                value={channel}
              />
              <input
                onChange={e => setToken(e.target.value)}
                placeholder="<Your token>"
                value={token}
              />
  
              <button
                disabled={!appId || !channel}
                onClick={() => setCalling(true)}
              >
                <span>Join Channel</span>
              </button>
            </div>
          )}
        </div>
        {isConnected && (
          <div style={{padding: "20px"}}>
            <div>
              <button onClick={() => setMic(a => !a)}>
                {micOn ? "Disable mic" : "Enable mic" }
              </button>
              <button onClick={() => setCamera(a => !a)}>
                {cameraOn ? "Disable camera " : "Enable camera" }
              </button>
              <button
                onClick={() => setCalling(a => !a)}
                >
                {calling ? "End calling" : "Start calling"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
    
  export default VideoCalling;
  