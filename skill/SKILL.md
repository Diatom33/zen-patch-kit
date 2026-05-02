---
name: zen-patch
description: Patch Zen Browser's omni.ja after an update. Extracts the archive, applies all custom mods (BSP tiling, OPENPAGE fix, WebRTC guard, bookmark panel, pop-out button, split-view fixes), and rebuilds. Use when the user says Zen updated, or asks to patch/rebuild Zen.
invocation: user
---

# Zen Browser Patcher

Patch Zen Browser's `browser/omni.ja` after an update. Assumes `zen-patch` and
`zen-rebuild` are on `$PATH` — see the kit's README for install instructions.

## Patch after update

```bash
zen-rebuild patch
```

That's the one-shot form: extract → apply patches → repack. Or run the steps
explicitly:

```bash
zen-rebuild extract   # unpack omni.ja to /tmp/zen_browser_omni
zen-patch             # apply all 9 patches (idempotent)
zen-rebuild rebuild   # repack and install, dated backup retained
```

Launch with cache purged the first time after a rebuild:

```bash
"$ZEN_DIR/zen-bin" --purgecaches    # ZEN_DIR defaults to ~/Downloads/zen.linux-x86_64/zen
```

## What gets patched

9 idempotent patches in `bin/zen-patch`:

1. **UrlbarInput.mjs** — `%` shows open tabs inline instead of search-mode chip
2. **WebRTCParent.sys.mjs** — reorder `updateMediaSharing` after `updateBrowserSharing`, wrap in try-catch (fixes Google Meet screen-share crash)
3. **ZenMediaController.mjs** — null guard + drop premature unmute messages
4. **browser-places.js** — show keyword/location fields in bookmark edit panel
5. **zen-sets.js** — bind `cmd_zenPopTabFromSplit`
6. **zen-split-view.css** — pop-out button icon style
7. **ZenViewSplitter.mjs** — BSP tiling, `MAX_TABS=16`, pop-out button, SessionStore persistence, add-to-existing-split
8. **ZenViewSplitter.mjs** — pre-seed `% ` so subsequent Alt+N splits show the open-tabs filter
9. **ZenViewSplitter.mjs** — close-tab fix in split view

## When patches fail

Upstream changed a search pattern. The script fails loudly and points at the
file. Read the new upstream source in `/tmp/zen_browser_omni/`, find the new
pattern, update `bin/zen-patch`, and re-run (already-applied patches are
skipped).

## Other commands

- `zen-rebuild restore` — revert `omni.ja` to the most recent dated backup
- `zen-rebuild list-backups` — show retained backups (last 10)

## Profile path & key prefs

The Zen profile lives at `~/.config/zen/*.Default (release)/` (UUID prefix
varies per install — resolve with the glob).

Key `user.js` prefs (already set in this kit's `user.js`):

- `media.peerconnection.ice.default_address_only = false` — Google Meet WebRTC
- `toolkit.legacyUserProfileCustomizations.stylesheets = true` — required for `userChrome.css`
- `extensions.unifiedExtensions.button.always_visible = true` + `zen.theme.hide-unified-extensions-button = false` — show extensions button

## Environment overrides

| Var | Default | Meaning |
|-----|---------|---------|
| `ZEN_DIR` | `$HOME/Downloads/zen.linux-x86_64/zen` | Zen install dir (containing `browser/omni.ja`) |
| `OMNI_SRC` | `/tmp/zen_browser_omni` | Where `omni.ja` is extracted |
