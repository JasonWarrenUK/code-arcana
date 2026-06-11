import type { Spread } from '$lib/types/card';

export const spreads: Spread[] = [
	{
		id: 'the-stuck',
		name: 'The Stuck',
		description: 'For when you know something is wrong but not what.',
		positions: [
			{
				index: 0,
				name: 'What you are avoiding',
				interpretation:
					'The thing you keep deferring. Not because it is hard, but because looking at it directly requires admitting something.'
			},
			{
				index: 1,
				name: 'What is actually the problem',
				interpretation:
					'Not the symptom you have been debugging. The actual root. It is probably structural.'
			},
			{
				index: 2,
				name: 'The boring fix',
				interpretation:
					'The solution that has been obvious for a while. The one that requires no cleverness, just time and the willingness to do unglamorous work.'
			}
		]
	},
	{
		id: 'the-decision',
		name: 'The Decision',
		description: 'For the choice you have been thinking about too long.',
		positions: [
			{
				index: 0,
				name: 'The thing you want to do',
				interpretation:
					'What your instinct says. Not the answer you have rehearsed for the standup, but the one you have been sitting with at 11pm.'
			},
			{
				index: 1,
				name: 'The thing you should do',
				interpretation:
					'What the constraints, the team, the codebase, or basic professionalism require. The version of you that has to live with the consequences.'
			},
			{
				index: 2,
				name: 'What you will actually do at 4pm on Friday',
				interpretation:
					'Neither of the above, shaped by deadline pressure and diminishing capacity. Worth knowing in advance.'
			}
		]
	},
	{
		id: 'the-codebase',
		name: 'The Codebase',
		description: 'A diagnostic for inherited or stagnant systems.',
		positions: [
			{
				index: 0,
				name: 'What it pretends to be',
				interpretation:
					'The README version. The architecture diagram drawn before the first line of code. The story the original authors told themselves.'
			},
			{
				index: 1,
				name: 'What it is',
				interpretation:
					'The lived reality. The workarounds, the modules that only one person understands, the tests that are disabled because they are too slow.'
			},
			{
				index: 2,
				name: 'What it is becoming',
				interpretation:
					'Not what you plan to do to it—what it is already moving toward, given the changes being made now. Direction matters more than destination.'
			}
		]
	}
];
