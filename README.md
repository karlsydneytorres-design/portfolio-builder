# Portfolio Builder (repository root)

This repository contains the Portfolio Builder starter project.

Note: the actual Next.js app lives in the `portfolio-builder/` subfolder.
If GitHub previously showed "Add a README", it was because the repository root did not contain a `README.md` file — only the nested `portfolio-builder/portfolio-builder/README.md` existed.

What I did:
- Added this `README.md` at the repository root so GitHub will render it on the repository page.

If you prefer the root README to mirror the full project README, move or copy the content from `portfolio-builder/portfolio-builder/README.md` into this file.

Next steps (locally):

Add, commit, and push this file so GitHub updates the repository page:

```bash
git add README.md
git commit -m "Add repository root README to make GitHub display project info"
git push
```

Or, if you want to keep a single README, move the file into the repository root instead:

```bash
# move existing README up one level (from inside the subfolder)
# adjust path if your local layout is different
mv portfolio-builder/portfolio-builder/README.md README.md
git add README.md
git commit -m "Move README to repository root"
git push
```

If you'd like, I can move the README for you and update the inner folder to avoid duplicates — tell me which you prefer.
