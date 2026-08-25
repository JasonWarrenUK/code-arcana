import type { PageLoad } from './$types';
import type { Card } from '$lib/types/card';
import cardsData from '$lib/data/cards.json';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const cards = cardsData as Card[];
	const card = cards.find((c) => c.id === params.id);

	if (!card) {
		throw error(404, 'Card not found');
	}

	const byId = new Map(cards.map((c) => [c.id, c]));
	const related = (card.connections ?? [])
		.map((id) => byId.get(id))
		.filter((c): c is Card => Boolean(c));

	return { card, related };
};
