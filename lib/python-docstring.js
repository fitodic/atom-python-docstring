'use babel';

import { CompositeDisposable } from 'atom';

export default {
  // see: https://stackoverflow.com/questions/3898572/what-is-the-standard-python-docstring-format
  config: {
    docstringFormat: {
      title: 'Docstring format',
      description: 'Choose among different common docstring formats.',
      type: 'string',
      default: 'Google docstring format',
      enum: [
        'Google docstring format',
        'Numpydoc docstring format',
        'reST (Sphinx) docstring format',
        'Epytext/Edpydoc docstring format',
      ],
    },
  },

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

      // see: https://stackoverflow.com/questions/3898572/what-is-the-standard-python-docstring-format
      var docstringStyle = atom.config.get('python-docstring.docstringFormat');
      switch(docstringStyle) {
        case 'Epytext/Edpydoc docstring format':
          var docstring =
            '"""\n' +
            ' '.repeat(column) + 'A short description.\n' +
            '\n' +
            ' '.repeat(column) + 'A bit longer description.\n' +
            '\n' +
            ' '.repeat(column) + '@param variable (type): description\n' +
            ' '.repeat(column) + '@return (type): description\n' +
            ' '.repeat(column) + '@raise Exception1: description\n' +
            '\n' +
            ' '.repeat(column) + '"""\n' +
            ' '.repeat(column);
          break;
        case 'reST (Sphinx) docstring format':
          var docstring =
            '"""\n' +
            ' '.repeat(column) + 'A short description.\n' +
            '\n' +
            ' '.repeat(column) + 'A bit longer description.\n' +
            '\n' +
            ' '.repeat(column) + ':param variable (type): description\n' +
            ' '.repeat(column) + ':returns (type): description\n' +
            ' '.repeat(column) + ':raises Exception1: description\n' +
            '\n' +
            ' '.repeat(column) + '"""\n' +
            ' '.repeat(column);
          break;
        case 'Numpydoc docstring format':
          var docstring =
            '"""\n' +
            ' '.repeat(column) + 'A short description.\n' +
            '\n' +
            ' '.repeat(column) + 'A bit longer description.\n' +
            '\n' +
            ' '.repeat(column) + 'Parameters\n' +
            ' '.repeat(column) + '----------\n' +
            ' '.repeat(column) + 'variable : type\n' +
            ' '.repeat(column) + '    description\n' +
            '\n' +
            ' '.repeat(column) + 'Returns\n' +
            ' '.repeat(column) + '-------\n' +
            ' '.repeat(column) + 'type\n' +
            ' '.repeat(column) + '    description\n' +
            '\n' +
            ' '.repeat(column) + 'Raises\n' +
            ' '.repeat(column) + '------\n' +
            ' '.repeat(column) + 'Exception\n' +
            ' '.repeat(column) + '    description\n' +
            '\n' +
            ' '.repeat(column) + '"""\n' +
            ' '.repeat(column);
          break;
        default: // 'Google docstring format'
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
            ' '.repeat(column) + '"""\n' +
            ' '.repeat(column);
      }

      editor.insertText(docstring);
    }
  }

};
