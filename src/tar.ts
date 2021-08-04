import tar, { FileStat } from 'tar'
import fs from 'fs-extra'

interface TarOption {
  /**
   * 默认为 src.tar.gz
   */
  name: string
  fileList: string[]
  onCreateSuccess?: () => void
  cwd?: string
  onEntry?: (entry: FileStat) => void
  delAfterSuccess?: boolean
}

export function tarDir({
  name,
  fileList,
  onCreateSuccess,
  cwd = process.cwd(),
  onEntry,
  delAfterSuccess = false
}: TarOption) {
  return tar
    .c(
      {
        gzip: true,
        cwd,
        file: name
      },
      fileList
    )
    .then(() => {
      return tar.t({
        file: name,
        onentry: onEntry
      })
    })
    .then(() => {
      if (onCreateSuccess) {
        onCreateSuccess()
      }

      if (delAfterSuccess) {
        fileList.forEach(f => {
          fs.removeSync(f)
        })
      }
    })
}
