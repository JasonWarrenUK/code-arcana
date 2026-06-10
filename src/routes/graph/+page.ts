import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';
import { buildGraphLayout } from '$lib/graph';

export const load: PageLoad = async () => {
	const cards = cardsData as Card[];
	const layout = buildGraphLayout(cards);
	return { layout };
};
