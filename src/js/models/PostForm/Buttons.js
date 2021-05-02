export default class Buttons {
  constructor(postForm) {
    this.postForm = postForm;
    this.timeline = postForm.timeline;
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

  async onClick(btn) {
    const { type } = btn.dataset;
    // довольно вложенно, да
    try {
      if (btn.classList.contains('recording')) {
        this.recorder.stopRecording(type);
        btn.classList.remove('recording');
        this.enableButtons();
      } else {
        if (!this.recorder.isAccessGranted()) return;
        await this.recorder.startRecording(type);
        btn.classList.add('recording');
        this.disableButtons(btn);
      }
    } catch (err) {
      this.timeline.showError(err);
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
