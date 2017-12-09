'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-docstring:add': () => this.add()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  add() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.insertText('Hello, World!')
    }
  }

};
