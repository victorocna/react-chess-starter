export const momentAnnotations = {
  moves: [
    { suffix: '!', label: 'Good move' },
    { suffix: '?', label: 'Mistake' },
    { suffix: '!!', label: 'Brilliant move' },
    { suffix: '??', label: 'Blunder' },
    { suffix: '!?', label: 'Interesting move' },
    { suffix: '?!', label: 'Dubious move' },
    { symbol: '□', nag: '$7', label: 'Only move' },
    { symbol: '⨀', nag: '$22', label: 'Zugzwang' },
  ],

  evaluation: [
    { symbol: '=', nag: '$10', label: 'Equal position' },
    { symbol: '∞', nag: '$13', label: 'Unclear position' },
    { symbol: '⩲', nag: '$14', label: 'White is slightly better' },
    { symbol: '⩱', nag: '$15', label: 'Black is slightly better' },
    { symbol: '±', nag: '$16', label: 'White is better' },
    { symbol: '∓', nag: '$17', label: 'Black is better' },
    { symbol: '+−', nag: '$18', label: 'White is winning' },
    { symbol: '-+', nag: '$19', label: 'Black is winning' },
  ],

  symbols: [
    { symbol: 'N', nag: '$146', label: 'Novelty' },
    { symbol: '↑↑', nag: '$32', label: 'Development' },
    { symbol: '↑', nag: '$40', label: 'Initiative' },
    { symbol: '→', nag: '$36', label: 'Attack' },
    { symbol: '⇆', nag: '$132', label: 'Counterplay' },
    { symbol: '⊕', nag: '$138', label: 'Time trouble' },
    { symbol: '=∞', nag: '$44', label: 'With compensation' },
    { symbol: '∆', nag: '$140', label: 'With the idea' },
  ],
};
