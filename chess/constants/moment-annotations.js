export const momentAnnotations = {
  moves: [
    { suffix: '!', label: 'Good move' },
    { suffix: '?', label: 'Mistake' },
    { suffix: '!!', label: 'Brilliant move' },
    { suffix: '??', label: 'Blunder' },
    { suffix: '!?', label: 'Interesting move' },
    { suffix: '?!', label: 'Dubious move' },
    { suffix: '□', label: 'Only move' },
    { suffix: '⟳', label: 'Zugzwang' },
  ],

  evaluation: [
    { suffix: '=', label: 'Equal position' },
    { suffix: '∞', label: 'Unclear position' },
    { suffix: '⩲', label: 'White is slightly better' },
    { suffix: '⩱', label: 'Black is slightly better' },
    { suffix: '±', label: 'White is better' },
    { suffix: '∓', label: 'Black is better' },
    { suffix: '+−', label: 'White is winning' },
    { suffix: '−+', label: 'Black is winning' },
  ],

  symbols: [
    { suffix: 'N', label: 'Novelty' },
    { suffix: '↑↑', label: 'Development' },
    { suffix: '↑', label: 'Initiative' },
    { suffix: '→', label: 'Attack' },
    { suffix: '⇄', label: 'Counterplay' },
    { suffix: '⊕', label: 'Time trouble' },
    { suffix: '=∞', label: 'With compensation' },
    { suffix: '∆', label: 'With the idea' },
  ],
};
