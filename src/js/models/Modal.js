import parseCoords from '../utils/parseCoords';

export default class Modal {
  constructor(postForm) {
    this.postForm = postForm;
    this.timeline = postForm.timeline;

    this.modal = document.getElementById('coords-modal');
    this.form = document.getElementById('coords-form');
    this.input = document.getElementById('coords-input');
    this.errorMessage = document.getElementById('coords-error');

    this.registerEvents();
  }

  open() {
    this.modal.classList.remove('hidden');
    this.input.focus();
  }

  close() {
    this.reset();
    this.modal.classList.add('hidden');
  }

  reset() {
    this.hideError();
    this.form.reset();
  }

  showError({ message }) {
    this.input.classList.add('invalid');
    this.errorMessage.classList.remove('hidden');
    this.errorMessage.textContent = message;
  }

  hideError() {
    this.input.classList.remove('invalid');
    this.errorMessage.classList.add('hidden');
  }

  onSubmit() {
    const { value } = this.input;
    try {
      const postData = this.postForm.getData();
      postData.coords = parseCoords(value);
      this.timeline.insertNewPost(postData);
      this.postForm.clearForm();
      this.close();
    } catch (err) {
      this.showError(err);
    }
  }

  registerEvents() {
    const [cancelBtn] = document.getElementsByClassName('cancel-btn');
    cancelBtn.addEventListener('click', () => this.close());

    document.addEventListener('mousedown', ({ target }) => {
      if (target.classList.contains('modal_wrapper')) {
        this.close();
      }
    });

    this.input.addEventListener('input', () => this.hideError());

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }
}
