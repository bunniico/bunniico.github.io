+++
date = '2025-05-20T02:20:20-05:00'
draft = true
title = 'Quick Start'
+++

# Requirements
1. Hugo
2. Git

# Create a site
1. Verify installation: `hugo version`
2. Create a Hugo site with the Ananke theme.
```ps
hugo new site quickstart
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
echo "theme = 'ananke'" >> hugo.toml
hugo server
```

`hugo new site quickstart` - Initializes hugo directory in 'quickstart'

`cd quickstart` - Change directory to 'quickstart'

`git init` - Initialize git repo in current dir.

`git submodule add ...` - Clones the theme into the themes directory as a git submodule

`echo "theme = 'ananke'" >> hugo.toml` - Sets the theme in the config file

`hugo server` - Starts the dev. server

# Add content to the site
`hugo new content content/posts/my-first-post.md`
Creates a new file in `content/posts`

Notice that `draft` in the [[Front matter]] is `true`, this means that the post will be generated as a draft and not published.

Add some [[Markdown]] to the body of the post, but do not change the `draft` value.

