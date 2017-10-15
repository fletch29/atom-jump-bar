'use babel';

import AtomJumpBarView from './atom-jump-bar-view';
import { CompositeDisposable } from 'atom';

export default {

  atomJumpBarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomJumpBarView = new AtomJumpBarView(state.atomJumpBarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomJumpBarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-jump-bar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomJumpBarView.destroy();
  },

  serialize() {
    return {
      atomJumpBarViewState: this.atomJumpBarView.serialize()
    };
  },

  toggle() {
    console.log('AtomJumpBar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
