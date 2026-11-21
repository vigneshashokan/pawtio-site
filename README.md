# pawtio-site

Static site for `pawtio.app`, hosted via GitHub Pages. Currently just the Privacy Policy and
Terms of Service that the [Pawtio app](https://github.com/vigneshashokan/pawtio-app) links to
and that Apple requires for App Store Connect.

Content is sourced from `docs/legal/privacy-policy.md` and `docs/legal/terms-of-service.md` in
the `pawtio-app` repo (see PR #194 there) — if those change, update the HTML here to match.

## Structure

- `index.html` — root landing page
- `privacy/index.html` — served at `/privacy`
- `terms/index.html` — served at `/terms`
- `delete-account/index.html` — served at `/delete-account`; Google Play's account-deletion URL
- `CNAME` — tells GitHub Pages to serve this at the custom domain `pawtio.app`

## DNS

This repo's Pages site only resolves once `pawtio.app`'s DNS has A records pointing at GitHub
Pages' IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Set these at whatever registrar `pawtio.app` is registered with.
