export default class Buttons {
  constructor(postForm) {
    this.postForm = postForm;
    this.recorder = postForm.recorder;

    [this.audioBtn] = document.getElementsByClassName('audio-btn');
    [this.videoBtn] = document.getElementsByClassName('video-btn');
    this.btns = document.getElementsByClassName('create-post_button');

    this.registerEvents();
  }

  disableButtons(pressedBtn) {
    for (const btn of this.btns) {
      if (btn === pressedBtn) continue;
      btn.disabled = true;
    }
  }

  enableButtons() {
    for (const btn of this.btns) {
      btn.disabled = false;
    }
  }

  onClick(btn) {
    const { type } = btn.dataset;
    if (btn.classList.contains('recording')) {
      btn.classList.remove('recording');
      this.enableButtons();
      this.recorder.stopRecording(type);
    } else {
      if (!this.recorder.isAccessGranted()) return;
      btn.classList.add('recording');
      this.disableButtons(btn);
      this.recorder.startRecording(type);
    }
  }

  registerEvents() {
    this.audioBtn.addEventListener('click', (e) => {
      this.onClick(e.target);
    });

    this.videoBtn.addEventListener('click', (e) => {
      this.onClick(e.target);
    });
  }
}
