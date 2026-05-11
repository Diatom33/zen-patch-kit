# zen-patch-kit

A patcher for [Zen Browser](https://zen-browser.app/)'s `omni.ja`, plus the `user.js` and `userChrome.css` that pair with the patches, plus an optional Claude Code skill that drives the workflow. All of these patches make changes to the browser matching my personal taste.

Zen ships its frontend code inside `browser/omni.ja` (a zip archive). After every Zen update the archive is replaced, so any direct edits are lost. This kit applies a fixed set of patches to a freshly extracted `omni.ja` and repacks it — idempotently, so the same script works after every update until upstream changes a search pattern.

> **Status:** Linux-only. Paths default to a typical
> `~/Downloads/zen.linux-x86_64/` install but are overridable via env vars.
> Tested on Zen 1.19.x. Not affiliated with the Zen project.

## What gets patched

Nine patches in `bin/zen-patch` (Python). All are idempotent — re-running on an already-patched tree is a no-op.

| # | File | What it does |
|---|------|--------------|
| 1 | `UrlbarInput.mjs` | `%` shows open tabs inline instead of toggling search-mode chip |
| 2 | `WebRTCParent.sys.mjs` | Reorder `updateMediaSharing` after `updateBrowserSharing`, wrap in try-catch (fixes Google Meet screen-share crash) |
| 3 | `ZenMediaController.mjs` | Null guard + drop premature unmute messages |
| 4 | `browser-places.js` | Show keyword/location fields in the bookmark edit panel |
| 5 | `zen-sets.js` | Bind `cmd_zenPopTabFromSplit` |
| 6 | `zen-split-view.css` | Pop-out button icon style |
| 7 | `ZenViewSplitter.mjs` | BSP tiling, `MAX_TABS=16`, pop-out button, SessionStore persistence, add-to-existing-split |
| 8 | `ZenViewSplitter.mjs` | Pre-seed `% ` so subsequent Alt+N splits show the open-tabs filter |
| 9 | `ZenViewSplitter.mjs` | Close-tab fix in split view |

If a patch's search pattern stops matching after a Zen update, the script fails loudly and points at the file. Read the new upstream source in `/tmp/zen_browser_omni/`, update the pattern in `bin/zen-patch`, and re-run.

## Install

Requirements: `bash`, `python3`, `unzip`, `zip`. Optional: `wmctrl` (for
`zen-raise`).

Clone the kit anywhere, then put the two patcher commands on your `$PATH`. The example below uses `~/bin/`, but anywhere on `$PATH` works:

```bash
git clone <this-repo> ~/code/zen-patch-kit
mkdir -p ~/bin
ln -s ~/code/zen-patch-kit/bin/zen-patch   ~/bin/zen-patch
ln -s ~/code/zen-patch-kit/bin/zen-rebuild ~/bin/zen-rebuild
ln -s ~/code/zen-patch-kit/bin/zen-raise   ~/bin/zen-raise   # optional launcher
```

Symlink the prefs and chrome CSS into your Zen profile (find the directory under `~/.config/zen/*.Default*/`):

```bash
PROFILE=$(echo ~/.config/zen/*.Default\ \(release\))
ln -s ~/code/zen-patch-kit/user.js                "$PROFILE"/user.js
mkdir -p "$PROFILE"/chrome
ln -s ~/code/zen-patch-kit/chrome/userChrome.css  "$PROFILE"/chrome/userChrome.css
```

`userChrome.css` requires `toolkit.legacyUserProfileCustomizations.stylesheets = true`
— `user.js` already sets it.

### Optional: Claude Code skill

`skill/SKILL.md` is a Claude Code skill that drives the workflow conversationally ("Zen updated, can you patch it?"). Install it by symlinking the skill dir into your Claude skills folder:

```bash
ln -s ~/code/zen-patch-kit/skill ~/.claude/skills/zen-patch
```

The skill assumes `zen-patch` and `zen-rebuild` are on `$PATH` (per the install step above). Skip this section if you don't use Claude Code, Codex, or a similar coding agent.

## Usage

After each Zen update:

```bash
zen-rebuild extract   # unpack omni.ja to /tmp/zen_browser_omni
zen-patch             # apply all 9 patches
zen-rebuild rebuild   # repack and install, keeping a dated backup
```

Or in one shot: `zen-rebuild patch`.

Launch with cache purged the first time after a rebuild:

```bash
~/Downloads/zen.linux-x86_64/zen/zen-bin --purgecaches
```

### Other commands

- `zen-rebuild restore` — revert `omni.ja` to the most recent dated backup
- `zen-rebuild list-backups` — show retained backups (last 10)

### Environment overrides

| Var | Default | Meaning |
|-----|---------|---------|
| `ZEN_DIR` | `$HOME/Downloads/zen.linux-x86_64/zen` | Zen install dir (containing `browser/omni.ja`) |
| `OMNI_SRC` | `/tmp/zen_browser_omni` | Where `omni.ja` is extracted |
| `ZEN_BIN` | `$ZEN_DIR/zen` | Binary used by `zen-raise` |

The profile dir for cache purging is auto-detected via
`~/.config/zen/*.Default (release)`.

## Files

```
bin/zen-patch         Python patcher (9 idempotent patches)
bin/zen-rebuild       Extract / rebuild / restore omni.ja
bin/zen-raise         Launch Zen and raise its window (optional, needs wmctrl)
chrome/userChrome.css Sidebar/UI tweaks
user.js               Privacy hardening + Zen UI prefs
skill/SKILL.md        Claude Code skill that drives the workflow
```

## License

The patcher and config files in this kit are released under MPL-2.0 (matching Zen Browser's license, since the patches are derivatives of Zen source).
