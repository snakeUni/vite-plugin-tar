import type { Plugin, ResolvedConfig } from 'vite'
import d from 'debug'
import { tarDir as t } from './tar'
import fs from 'fs-extra'
import path from 'path'

const debug = d('vite-plugin-tar')

interface TarPluginOption {
  /**
   * tar name default src.tar.gz
   */
  name?: string
  /**
   * tar file list default dist
   */
  fileList?: string[]
}

export default function tarPlugin({
  name = 'src.tar.gz',
  fileList = []
}: TarPluginOption = {}): Plugin {
  let config: ResolvedConfig
  return {
    name: 'vite-plugin-tar',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    writeBundle() {
      const buildDir = config.build?.outDir || 'dist'
      let innerFileList = [buildDir, ...fileList]
      const buildDirPath = path.join(process.cwd(), buildDir)

      if (fs.existsSync(buildDirPath)) {
        debug(`start tar > ${buildDir}`)
        t({
          name: name,
          onEntry(entry) {
            debug(`tar > ${entry.path}`)
          },
          fileList: innerFileList,
          onCreateSuccess: () => {
            debug(`${name} created success.`)
          }
        })
      } else {
        debug(`Error: no such file or directory, lstat ${buildDir}`)
        throw new Error(`no such file or directory, lstat ${buildDir}`)
      }
    }
  }
}
