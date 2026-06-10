import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';

export const load: PageLoad = async () => {
	const cards = cardsData as Card[];

	// Group cards by arcana for display
	const majorArcana = cards.filter((c) => c.arcana === 'major');
	const minorArcana = cards.filter((c) => c.arcana === 'minor');

	// Group minor arcana by suit
	const suits = {
		cups: minorArcana.filter((c) => c.suit === 'cups'),
		wands: minorArcana.filter((c) => c.suit === 'wands'),
		swords: minorArcana.filter((c) => c.suit === 'swords'),
		pentacles: minorArcana.filter((c) => c.suit === 'pentacles')
	};

	return {
		cards,
		majorArcana,
		suits
	};
};
