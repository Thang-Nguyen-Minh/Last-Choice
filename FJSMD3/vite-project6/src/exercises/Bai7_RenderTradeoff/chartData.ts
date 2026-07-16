export const chartsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Biểu đồ ${index + 1}`,
  data: Array.from({ length: 12 }, (__, pointIndex) => ((index + pointIndex) % 9) + 2),
}))
