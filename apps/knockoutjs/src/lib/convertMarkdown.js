import marked from 'marked';

export default function init(stopWatchDOM) {
  function covertMarkdown() {
    const markdowns = document.querySelectorAll('[data-format="markdown"]');
    // console.log(`covertMarkdown, markdowns length ${markdowns.length}`);
    markdowns.forEach((elm) => {
      elm.innerHTML = marked(elm.innerText);
      elm.setAttribute('data-format', 'html');
    });
  }

  if (!stopWatchDOM) {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(covertMarkdown);
    // Start observing the target node for configured mutations
    observer.observe(document.querySelector('body'), config);
  }

  covertMarkdown();
}
