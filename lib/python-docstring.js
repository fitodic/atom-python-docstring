'use babel';

import PythonDocstringView from './python-docstring-view';
import { CompositeDisposable } from 'atom';

export default {

  pythonDocstringView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pythonDocstringView = new PythonDocstringView(state.pythonDocstringViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pythonDocstringView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-docstring:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pythonDocstringView.destroy();
  },

  serialize() {
    return {
      pythonDocstringViewState: this.pythonDocstringView.serialize()
    };
  },

  toggle() {
    console.log('PythonDocstring was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
