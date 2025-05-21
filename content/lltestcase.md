+++
date = '2025-05-21T15:05:37-05:00'
draft = false
title = 'Lagolog; Test case'
+++

# Test dialogue
The script seen below is a test case for the [Lagolog]("https://bunniico.github.io/lagolog_spec/") specification.

```
// This is a test dialogue
// Here we go:

SPEAKER_A: "Hello, world!";
SPEAKER_B: "Hello, SPEAKER_A!";

SPEAKER_A: "Do you hear that?";

WITH SOUND: "CRASH";
WITH CHAR "SPEAKER_B" "CURIOUS";
SPEAKER_B: "Hear w-";

WITH CHAR "SPEAKER_B" "SHOCKED";
WITH CALLBACK: "BIG_SCREENSHAKE";
WITH INTERRUPT;
SPEAKER_B: "Whoa!!";
SPEAKER_B: "...";
SPEAKER_B: "W-what is that?!";

WITH CG: "FULLY_RENDERED_12FT_PAINTING_OF_BILLIE_EILISH"
WITH CHAR "SPEAKER_B" "CONFUSED";
SPEAKER_B: "Billie Eilish?";

WITH EXIT CG;
SPEAKER_B: "...";

SPEAKER_A: "...";

FULLY_RENDERED_12FT_PAINTING_OF_BILLIE_EILISH: "...";
```