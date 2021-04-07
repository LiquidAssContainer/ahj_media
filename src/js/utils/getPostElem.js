import getFormattedDate from './getFormattedDate';

export default function getPostElem({ text, coords, audio, video }) {
  const date = getFormattedDate(new Date());
  const textElem = text ? `<div class="post-item_text">${text}</div>` : '';
  const audioElem = audio
    ? `<audio class="post-item_audio" src=${audio} controls></audio>`
    : '';
  const videoElem = video
    ? `<video class="post-item_video" src=${video} controls></video>`
    : '';
  const coordsText = `[${coords.latitude}, ${coords.longitude}]`;

  return `
  <li class="post-item_wrapper">
    <div class="post-item">
    <div class="post-item_date">${date}</div>
      <div class="post-item_content">
        ${textElem}
        ${audioElem}
        ${videoElem}
      </div>
      <div class="post-item_coords">${coordsText}</div>
    </div>
  </li>`;
}
