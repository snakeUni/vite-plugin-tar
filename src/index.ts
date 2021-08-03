import type { Plugin } from 'vite'

interface TarPluginOption {
  /**
   * tar name
   */
  name?: string
  /**
   * tar file list
   */
  fileList?: string[]
}

export default function tarPlugin(): Plugin {
  return {
    name: 'vite-plugin-tar'
  }
}
