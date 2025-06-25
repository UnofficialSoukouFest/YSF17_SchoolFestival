import programs from '../../../program.mock.json'

export function programAll() {
  return programs.map((item) => {
    return {
      teamId: item.id,
      name: item.name }
  })
}
