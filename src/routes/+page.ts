import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';

export const load: PageLoad = async () => {
	return { cards: cardsData as Card[] };
};
