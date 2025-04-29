const { Plugin, Notice, MarkdownView } = require('obsidian');
module.exports = class LoveButtonPlugin extends Plugin {
  count = 0; // counts how many times he clicked

  onload() {
    this.addRibbonIcon('heart', 'Click for Love', async () => {
      const messages = [
        "message 1",
        "message 2",
        "message 3",
        "message 4",
        "message 5"
      ];

      // Pick random love message
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      // Insert message into the active note
      const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (activeLeaf) {
        const editor = activeLeaf.editor;
        editor.replaceSelection(randomMessage + "\n");
      }

      // Show popup with the message too
      new Notice(randomMessage);

      // Increase click count
      this.count++;

      // Show count
      new Notice(`You've found ${this.count} love notes today!`);

      // Secret special surprise after 10 clicks
      if (this.count % 10 === 0) {
        new Notice("A suprise message popup");
        const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeLeaf) {
          const editor = activeLeaf.editor;
          editor.replaceSelection("\nA suprise message\n");
        }
      }
    });

    console.log('LoveButtonPlugin loaded');
  }

  onunload() {
    console.log('LoveButtonPlugin unloaded');
  }
};
