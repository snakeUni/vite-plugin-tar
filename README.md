# vite-plugin-tar

tar file

## Install

```shell
yarn add vite-plugin-tar or npm install vite-plugin-tar
```

## Usage

```tsx
import { defineConfig } from 'vite'
import tarPlugin from 'vite-plugin-tar'

export default defineConfig({
  plugins: [tarPlugin(option)]
})
```

## Option

+ name: tar name, default src.tar.gz
+ fileList: files that is will be tar 
