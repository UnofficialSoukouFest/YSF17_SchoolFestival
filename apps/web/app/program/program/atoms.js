import { _atom } from 'jotai'
import { parseProgramsData } from '@latimeria/core'
import ProgramsData from '@/data/programs/programs.json'
import { atomWithLocation } from 'jotai-location'

export const programs = parseProgramsData(ProgramsData)
export const searchQueryAtom = atomWithLocation()
/** export const matchedProgramsAtom = atom((get) => {
  return get(programs)
}) */
