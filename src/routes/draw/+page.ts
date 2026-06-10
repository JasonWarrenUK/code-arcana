import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';

export const load: PageLoad = async () => {
	const cards = cardsData as Card[];

	return {
		allCards: cards
	};
};
