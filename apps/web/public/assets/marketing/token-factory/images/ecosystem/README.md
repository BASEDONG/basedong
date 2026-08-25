# GPU ecosystem logos

Official vendor marks for `/token-factory`, used as-is from each homepage.

**Policy:** download only. No redraw, no color remap, no PNG punch/darken.
If an official light-background asset cannot be fetched, omit that vendor.

| File | Source |
|------|--------|
| `nvidia.svg` | nvidia.com black wordmark |
| `intel.svg` | intel.cn header logo |
| `ascend.svg` | hiascend.com |
| `metax.svg` | metax-tech.com |
| `enflame.svg` | enflame-tech.com |

Display: fixed **120×48** slots in `EcosystemSection` (`object-contain`).

Refresh:

```bash
node apps/web/scripts/download-gpu-ecosystem-logos.mjs
```

Sources: `apps/web/scripts/gpu-ecosystem-sources.json`.
