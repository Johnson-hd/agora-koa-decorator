import fs from 'fs'

/**
 * 解析文件夹，获取文件夹下的所有文件
 * @param dir 目录
 * @param files
 */
export function parseDir(dir: string, files?: string[]): string[] {
  files = files || []
  const _files = fs.readdirSync(dir)
  for (const i in _files) {
    const fileName = `${dir}/${_files[i]}`
    if (fs.statSync(fileName).isDirectory()) {
      parseDir(fileName, files)
    } else {
      files.push(fileName)
    }
  }
  return files
}
