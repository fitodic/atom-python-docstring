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
      var pos = editor.getCursorBufferPosition();
      var column = pos.column;

      editor.insertText('"""\n');
      editor.insertText(' '.repeat(column) + 'A short description.\n');
      editor.insertText('\n');
      editor.insertText(' '.repeat(column) + 'A bit longer description.\n');
      editor.insertText('\n');
      editor.insertText(' '.repeat(column) + 'Args:\n');
      editor.insertText(' '.repeat(column * 2) + 'variable (type): description\n');
      editor.insertText('\n');
      editor.insertText(' '.repeat(column) + 'Returns:\n');
      editor.insertText(' '.repeat(column * 2) + 'type: description\n');
      editor.insertText('\n');
      editor.insertText(' '.repeat(column) + 'Raises:\n');
      editor.insertText(' '.repeat(column * 2) + 'Exception: description\n');
      editor.insertText('\n');
      editor.insertText(' '.repeat(column) + '"""\n');
    }
  }

};
