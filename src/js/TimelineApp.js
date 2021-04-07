import Geo from './models/Geo';
import PostForm from './models/PostForm/PostForm';
import getPostElem from './utils/getPostElem';

export default class TimelineApp {
  constructor() {
    try {
      this.geo = new Geo(this);
    } catch (e) {
      this.showError(e);
    }
    [this.postList] = document.getElementsByClassName('post-list');
    this.postForm = new PostForm(this);
  }

  insertNewPost(postData) {
    const postHTML = getPostElem(postData);
    this.postList.insertAdjacentHTML('afterbegin', postHTML);
  }

  showError({ message }) {
    console.log(message);
  }
}
