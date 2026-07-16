export type BuildDifference = {
  label: string
  development: string
  production: string
}

export const buildCommand = 'npm run build'

export const buildDifferences: BuildDifference[] = [
  {
    label: 'Cấu trúc file',
    development: 'src/ giữ nguyên từng module để HMR cập nhật nhanh',
    production: 'dist/ gom bundle, tách asset và thêm hash vào tên file',
  },
  {
    label: 'Kích thước',
    development: 'Lớn hơn vì chưa minify',
    production: 'Nhỏ hơn nhờ minification, tree-shaking và gzip',
  },
  {
    label: 'Cache',
    development: 'Ưu tiên refresh nhanh, không cache dài hạn',
    production: 'Hash giúp cache dài hạn và tự phá cache khi nội dung đổi',
  },
]

export function explainHashedAsset(filename: string) {
  const hasHash = /-[A-Za-z0-9_-]{6,}\.(js|css|png|svg)$/.test(filename)

  return {
    filename,
    hasHash,
    reason: hasHash
      ? 'Tên file có hash nội dung, giúp trình duyệt dùng cache an toàn và tải file mới khi code thay đổi.'
      : 'Tên file chưa thể hiện hash build production.',
  }
}
