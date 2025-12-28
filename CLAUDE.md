# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dutch family recipe website ("Kookboek Familie Oost") built with Hugo static site generator.

- **Production:** https://recepten.oost.io/
- **Local dev:** http://localhost:1313/

## Commands

```bash
# Local development (includes drafts)
hugo server -D

# Build site
hugo --gc

# Create new recipe
hugo new recipes/naam-van-recept.md
```

## Architecture

**Content Structure:**
- `content/recipes/` - Recipe markdown files with YAML front matter
- `archetypes/recipes.md` - Template for new recipes

**Layouts:**
- `layouts/_default/baseof.html` - Base template with nav (Home, Recepten, Tags)
- `layouts/_default/list.html` - Recipe list page
- `layouts/_default/terms.html` - Tags overview page
- `layouts/_default/term.html` - Single tag page (filtered recipes)
- `layouts/recipes/single.html` - Individual recipe page
- `layouts/index.html` - Homepage

**Recipe Front Matter:**
```yaml
title: "Recipe Name"
date: 2024-12-28
draft: false
description: "Short description"
image: ""
servings: 4
prep_time: "15 minuten"
cook_time: "30 minuten"
tags: ["hoofdgerecht", "vegetarisch"]
ingredients:
  - item: "ingredient name"
    amount: "quantity"
instructions:
  - step: "Step description"
```

Optional notes can be added as markdown content below the front matter.

## Key Conventions

- All UI text is in Dutch
- URLs use `relURL` filter for GitHub Pages subpath compatibility
- Single taxonomy: tags only (no categories)
- Recipes are never drafts in production (`draft: false`)
