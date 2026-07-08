# New release checklist

Send this info in a new (or existing) chat with Claude Code and it'll add the release, update all deep links, and push it live.

## Required
- **Title**
- **Type**: single / EP / album (used for the discography filter buttons)
- **Release date**
- **Cover art** (image file — square works best)
- **Spotify link**
- **Apple Music link**

## Optional
- SoundCloud, YouTube Music, Amazon Music, or other streaming links
- Short synopsis / description (a couple sentences — Claude can also draft one from the title/lyrics if you don't have one)
- Any music video / lyric video / clip to add under "Extras"

## What happens after you send it
1. Cover art gets added to `assets/covers/`
2. A new `.disco-card` entry gets added to the discography section with `data-type` set to `single`, `ep`, or `album`
3. Streaming links get wired into the card
4. The filter button counts (e.g. "Singles (22)") get updated
5. Changes are committed and pushed to GitHub — live on mattfortemusic.com within a minute or two of the push
