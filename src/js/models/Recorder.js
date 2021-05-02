export default class Recorder {
  constructor(postForm) {
    if (!navigator.mediaDevices) {
      throw new Error('В этом браузере не работает медиа(');
    }
    this.postForm = postForm;
    this.timeline = postForm.timeline;
  }

  isAccessGranted() {
    return navigator.mediaDevices;
  }

  async startRecording(type) {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: type === 'video',
    });

    this.recorder = new MediaRecorder(this.stream);
    const chunks = [];

    this.recorder.addEventListener('dataavailable', (evt) => {
      chunks.push(evt.data);
    });
    this.recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks);
      const src = URL.createObjectURL(blob);

      this.postForm.saveRecording(src, type);
    });
    this.recorder.start();
  }

  async startAudio() {
    this.recorder = await this.startRecording('audio');
  }

  async startVideo() {
    this.recorder = await this.startRecording('video');
  }

  stopRecording() {
    this.recorder?.stop();
    this.stream?.getTracks().forEach((track) => track.stop());
  }
}
