import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';
import { spreads } from '$lib/data/spreads';

export const load: PageLoad = async () => {
	return {
		allCards: cardsData as Card[],
		spreads
	};
};
