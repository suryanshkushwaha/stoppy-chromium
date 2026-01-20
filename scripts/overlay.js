const StoppyOverlay = {
  create: (seconds) => {
    const div = document.createElement('div');
    div.id = 'stoppy-overlay';
    div.style = `
             position: fixed; top: 10%; right: 20px; z-index: 9999;
             background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
             border-left: 4px solid #e50914; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
             border-radius: 4px; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
         `;
    div.innerText = `stoppy: Redirecting in ${seconds}s...`;
    document.body.appendChild(div);
    return div;
  },

  update: (element, seconds) => {
    if (element) {
      element.innerText = `stoppy: Redirecting in ${seconds}s...`;
    }
  },

  remove: (element) => {
    if (element) element.remove();
  },
};
