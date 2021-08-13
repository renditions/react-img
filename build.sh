#! /bin/bash
npm exec --no tsc
npm exec --no esbuild -- Img.tsx --platform=neutral --format=cjs --outfile=Img.dist.js
npm exec --no esbuild -- Img.tsx --platform=browser --format=cjs --target=es2017 --minify --outfile=Img.dist.min.js
