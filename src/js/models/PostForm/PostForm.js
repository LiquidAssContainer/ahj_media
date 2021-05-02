import Modal from '../Modal';
import Recorder from '../Recorder';
import Buttons from './Buttons';

export default class PostForm {
  constructor(timeline) {
    this.timeline = timeline;
    this.geo = timeline.geo;
    this.recorder = new Recorder(this);
    this.modal = new Modal(this);
    this.btns = new Buttons(this);

    [this.form] = document.getElementsByClassName('create-post');
    this.textarea = document.getElementById('textarea');

    this.registerEvents();
  }

  validateForm() {
    const hasValidText = /\S/.test(this.textarea.value);
    return hasValidText || this.audio || this.video;
  }

  clearForm() {
    this.textarea.value = '';
    this.audio = null;
    this.video = null;
  }

  saveRecording(src, type) {
    this[type] = src;
  }

  getData() {
    const {
      audio,
      video,
      textarea: { value: text },
    } = this;
    return { audio, video, text };
  }

  async onSubmit() {
    const isValid = this.validateForm();
    if (!isValid) return;

    if (!this.geo) {
      this.modal.open();
      return;
    }

    try {
      const postData = this.getData();
      postData.coords = await this.geo.getPosition();
      this.timeline.insertNewPost(postData);
      this.clearForm();

      const { audioBtn, videoBtn } = this.btns;
      audioBtn.classList.remove('recorded');
      videoBtn.classList.remove('recorded');
    } catch {
      this.modal.open();
    }
  }

  registerEvents() {
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.onSubmit();
      }
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }
}
