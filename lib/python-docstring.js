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

      var docstring =
        '"""\n' +
        ' '.repeat(column) + 'A short description.\n' +
        '\n' +
        ' '.repeat(column) + 'A bit longer description.\n' +
        '\n' +
        ' '.repeat(column) + 'Args:\n' +
        ' '.repeat(column) + '    variable (type): description\n' +
        '\n' +
        ' '.repeat(column) + 'Returns:\n' +
        ' '.repeat(column) + '    type: description\n' +
        '\n' +
        ' '.repeat(column) + 'Raises:\n' +
        ' '.repeat(column) + '    Exception: description\n' +
        '\n' +
        ' '.repeat(column) + '"""\n';
      editor.insertText(docstring);
    }
  }

};
