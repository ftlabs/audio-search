# Audio Search Service
Search for audio version of articles on FT.com - Mostly by time, but sometimes by keywords.

## Build Steps

1. Clone this repo
2. `cd` into the cloned project directory
3. Run `npm install`

## Running

1. Follow the build steps
2. `npm run start`

## Endpoints

### [ GET ] /today
Return a list of audio files that are from articles published in the last day.

```JSON
// Response
[
	{
		"haveFile": true,
		"url": "https://example.com/9a23b092-34a5-11e7-bce4-9023f8c0fd2e.mp3",
		"size": 1726189,
		"provider": "ftlabs-tts",
		"provider_name": "FT Labs Text-to-Speech",
		"ishuman": false,
		"duration": {
			"milliseconds": 287660.408,
			"seconds": 287.660408,
			"humantime": "04:47"
		},
		"title": "Pyongyang detente advocate wins South Korean presidency"
	},
	{
		"haveFile": true,
		"url": "https://s3-us-west-2.amazonaws.com/ftlabs-audio-rss-bucket.prod/0fcd9924-33e4-11e7-99bd-13beb0903fa3.mp3",
		"size": 2626003,
		"provider": "ftlabs-tts",
		"provider_name": "FT Labs Text-to-Speech",
		"ishuman": false,
		"duration": {
			"milliseconds": 437629.388,
			"seconds": 437.629388,
			"humantime": "07:17"
		},
		"title": "Emmanuel Macron weighs up France’s biggest challenges"
	}
]
```

### [ GET ] /headline/:containing
Return a list of audio files that are from articles whose headlines contain the word passed to containing

```JSON
/headline/Pynongyang

[
	{
		"haveFile": true,
		"url": "https://example.com/9a23b092-34a5-11e7-bce4-9023f8c0fd2e.mp3",
		"size": 1726189,
		"provider": "ftlabs-tts",
		"provider_name": "FT Labs Text-to-Speech",
		"ishuman": false,
		"duration": {
			"milliseconds": 287660.408,
			"seconds": 287.660408,
			"humantime": "04:47"
		},
		"title": "Pyongyang detente advocate wins South Korean presidency"
	}
]

```

