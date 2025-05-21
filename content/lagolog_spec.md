+++
date = '2025-05-21T04:33:39-05:00'
draft = false
title = 'Lagolog_spec'
+++

from: [[Visual Novel Engine]]

Unofficial name: "Lagolog" (.ll)

# Dialogue
## Speech:
```
SPEAKER_A: "MESSAGE";
SPEAKER_B: "ANOTHER MESSAGE";
```

## Sounds
Note: Command that begin with "WITH" will be interpreted in parallel with the next dialogue message.

```
WITH SOUND: "SOUND_ID";
```

## Custom Callbacks
Note: Command that begin with "WITH" will be interpreted in parallel with the next dialogue message.
```
WITH CALLBACK: "CALLBACK_ID";
```

# Visuals
## Sprite Management

### Set Character Emotion
```
WITH CHAR "CHAR_ID" "EMOTE_ID";
```
### Show CG
```
WITH CG: "CG_ID";
```

* Note: Only one (1) CG can be shown at once
### Hide CG
```
WITH EXIT CG;
```

# Misc.

## Comments
```
// This is a comment //
```

## Auto
Automatically skips to the next dialogue message after a certain amount of time as defined in the configuration.
```
WITH INTERRUPT;
```