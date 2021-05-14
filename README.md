# Webpack project template - "No framework"

---

## Main features
- An easy building of project with complicated structure.
- Advanced options of development (hot reload, sharing the project to any devices in 
  LAN or even WAN just right from the localhost).
- Minification of the final bundle in build mode.

## Supported technologies:
- `Webpack`
- `TypeScript`
- `SASS`
- `ESLint`

## Modes:
1. ### development
   | `npm run dev`
    - `webpack-dev-sever`
    - `.map` files for ts and css files

2. ### production
    | `npm run build`

    - minification of `JS`, `CSS`, and `HTML` 
    - contenthash as a part of files' names
    - modules' sizes analyzing by `webpack-bundle-analyzer` (`npm run stats`)
    
## Notes
- styles are necessarily imported into `index.ts` (`entry` point in webpack)
- No `babel` (only modern browsers support)
- See `webpack.config.js` comments for more info