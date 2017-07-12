var block_jump_frames = [
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 1
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 1
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 1
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 1
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	},
	{
		width: 4,
		height: 9,
		duration: 100,
		distance: 0
	}
];

var manWalkSprites = {
	width: 9,
	height: 32,	
	frames: [
	{
		type: "I",
		duration: 100,
		distance: 0,
		sID: 0
	},
	// RSS
	{
		type: "C",
		duration: 100,
		distance: 0,
		// continue frame id
		cFrameID: 4,
		sID: 1
		// , fFrameID: 2
	},
	{
		type: "F",
		duration: 100,
		distance: 0,
		sID: 2
	},
	{
		type: "D",
		duration: 100,
		// distance to move AT TIME of change
		distance: 2,
		sID: 0
	}, 
	// RLS
	{
		type: "M",
		duration: 100,
		distance: 0,
		sID: 3
	},
	{
		type: "M",
		duration: 100,
		distance: 0,
		sID: 4
	},
	{
		type: "C",
		duration: 100,
		distance: 4,
		// continue frame id
		cFrameID: 8,
		sID: 5
		// , fFrameID: 2
	},
	{
		type: "D",
		duration: 100,
		distance: 2,
		sID: 0
	},
	// LSS
	{
		type: "C",
		duration: 100,
		distance: 2,
		cFrameID: 11,
		sID: 6
	},
	{
		type: "F",
		duration: 100,
		distance: 0,
		sID: 7
	},
	{
		type: "D",
		duration: 100,
		distance: 2,
		sID: 0
	},
	// LLS
	{
		type: "M",
		duration: 100,
		distance: 0,
		sID: 8
	},
	{
		type: "M",
		duration: 100,
		distance: 0,
		sID: 9
	},
	{
		type: "T",
		duration: 100,
		distance: 4,
		tDistance: 2,
		// continue frame id
		cFrameID: 1,
		sID: 10
		// , fFrameID: 2
	},
	{
		type: "D",
		duration: 100,
		distance: 2,
		sID: 0
	}
	],
}
