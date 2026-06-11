export type Suit = 'cups' | 'wands' | 'swords' | 'pentacles';
export type Arcana = 'major' | 'minor';
export type CourtRank = 'page' | 'knight' | 'queen' | 'king';

export interface Card {
	id: string;
	name: string;
	suit?: Suit;
	arcana: Arcana;
	number?: number;
	courtRank?: CourtRank;
	keywords: string[];
	codingInsight: string;
	essay?: string;
	connections?: string[]; // Card IDs for graph relationships
}

export interface CardConnection {
	fromId: string;
	toId: string;
	type: ConnectionType;
	description?: string;
}

export type ConnectionType =
	| 'complements'
	| 'contrasts'
	| 'builds-upon'
	| 'prerequisites'
	| 'related-practice';

export interface Spread {
	id: string;
	name: string;
	positions: SpreadPosition[];
	description: string;
}

export interface SpreadPosition {
	index: number;
	name: string;
	interpretation: string;
}

export interface GraphNode {
	id: string;
	type: 'card';
	properties: Record<string, unknown>;
}
