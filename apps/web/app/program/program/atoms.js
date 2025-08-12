// TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
import { _atom } from 'jotai'
import { parseProgramsData } from '@latimeria/core'
import ProgramSample from '@/app/program.mock.json'
import { atomWithLocation } from 'jotai-location'

export const programs = parseProgramsData(ProgramSample)
export const searchQueryAtom = atomWithLocation()
/** export const matchedProgramsAtom = atom((get) => {
  return get(programs)
}) */
