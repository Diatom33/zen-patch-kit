// ==========================================================================
// Zen Browser — Privacy Hardening (user.js)
// Auto-generated for privacy hardening. Read on every browser startup.
// ==========================================================================

// --------------------------------------------------------------------------
// 1. WebRTC Leak Prevention
// --------------------------------------------------------------------------
user_pref("media.peerconnection.ice.default_address_only", false);
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);

// --------------------------------------------------------------------------
// 2. Disable Telemetry
// --------------------------------------------------------------------------
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("browser.ping-centre.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

// --------------------------------------------------------------------------
// 3. HTTPS-Only Mode
// --------------------------------------------------------------------------
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_ever_enabled", true);

// --------------------------------------------------------------------------
// 4. Disable Pocket & Sponsored Content
// --------------------------------------------------------------------------
user_pref("extensions.pocket.enabled", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);

// --------------------------------------------------------------------------
// 6. Other Privacy Defaults
// --------------------------------------------------------------------------
user_pref("geo.enabled", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.prefetch-next", false);
user_pref("privacy.trackingprotection.enabled", true);

// --------------------------------------------------------------------------
// 7. Zen UI Preferences
// --------------------------------------------------------------------------
user_pref("zen.tabs.vertical", true);
user_pref("zen.view.sidebar-expanded", false);
user_pref("browser.urlbar.suggest.openpage", true);
user_pref("browser.urlbar.suggest.bookmark", false);
user_pref("browser.urlbar.scotchBonnet.enableOverride", false);
user_pref("browser.startup.page", 3);
user_pref("zen.urlbar.open-on-startup", false);
user_pref("zen.workspaces.continue-where-left-off", true);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("zen.theme.content-element-separation", 0);
user_pref("zen.theme.border-radius", 0);
user_pref("extensions.unifiedExtensions.button.always_visible", true);
user_pref("zen.theme.hide-unified-extensions-button", false);

// --------------------------------------------------------------------------
// 8. DNS-over-HTTPS
// --------------------------------------------------------------------------
user_pref("network.trr.mode", 2);
user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");

// --------------------------------------------------------------------------
// 9. Block All Autoplay
// --------------------------------------------------------------------------
user_pref("media.autoplay.default", 5);
user_pref("media.autoplay.blocking_policy", 2);

// --------------------------------------------------------------------------
// 10. URL Bar as Fuzzy-Finder
// --------------------------------------------------------------------------
user_pref("browser.urlbar.maxRichResults", 20);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.autoFill", true);
user_pref("browser.urlbar.autoFill.adaptiveHistory.enabled", true);

// Faster frecency decay so the URL bar adapts to current habits quicker.
// Default 0.975 (~2.5%/day during idle recalc); 0.95 ~= 5%/day.
user_pref("places.frecency.decayRate", 0.95);

// --------------------------------------------------------------------------
// 11. Lazy Tab Loading + Session Safety
// --------------------------------------------------------------------------
user_pref("browser.sessionstore.interval", 10000);
user_pref("browser.tabs.unloadOnLowMemory", true);
user_pref("browser.sessionstore.restore_on_demand", true);
user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", true);

// --------------------------------------------------------------------------
// 12. Skip about:config Warning Page
// --------------------------------------------------------------------------
user_pref("browser.aboutConfig.showWarning", false);
