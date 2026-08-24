# Upstream integration

No external educational source is integrated yet.

Future sources must be reviewed and recorded with `UpstreamSource`, including an exact commit, license, integration mode, and separate approval decisions for code, assets, data, and weights.

- `vendor/` is the preserved, pinned upstream snapshot.
- `src/integrations/` is the adapted AI Core implementation.
- `THIRD_PARTY_NOTICES.md` records attribution and modifications.

Integrated educational modules must not depend on the upstream demo or upstream website remaining online. If upstream disappears, the AI Core lesson must continue to work from repository-contained code and approved assets.
