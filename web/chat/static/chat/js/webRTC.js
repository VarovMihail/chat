const constraints = {
    video: true,
    audio: false
};

let localStream = new MediaStream()

const config = {
  iceServers: [
    {
      "urls": "stun:stun.l.google.com:19302",
    },
  ]
};

function videoCall() {
 console.log('video Call', navigator)
 $('#videoModal').modal('show');
 let chat_id = $(this).parent().parent().parent().attr('id')
 console.log(chat_id)
 let messageData = {
    'command': 'call',
    'chat_id': chat_id,
 }
 chatSocket.send(JSON.stringify(messageData));

//  navigator.mediaDevices.getUserMedia(constraints)
//        .then(stream => {
//            localStream = stream
//            camera.srcObject = localStream
//            camera.muted = true
//
//            let audioTrack = stream.getAudioTracks()
//            let videoTrack = stream.getVideoTracks()
//            audioTrack[0].enabled = true
//            videoTrack[0].enabled = true
//
//            console.log('stream', stream)
//        }).catch(error => {
//        console.log('Error media', error)
//    })
}
