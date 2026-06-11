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

	// Get connected cards if they exist
	const connectedCards = card.connections
		? cards.filter((c) => card.connections?.includes(c.id))
		: [];

	return {
		card,
		connectedCards
	};
};
