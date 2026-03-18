'use client'

import { useState, useEffect, useMemo } from 'react'
import { MdClose, MdUnfoldMore, MdUnfoldLess } from 'react-icons/md'

import BottomSheetProgram from './bottom-sheet-program'
import styles from './bottom-sheet.module.css'
import ProgramSample from '@/app/program.mock.json'
import { parseProgramsData } from '@/app/lib/index.js'

/**
 * @param {Object} props
 * @param {string[]} props.ids
 * @param {Function} props.onClose
 */
export default function BottomSheet({ ids, onClose }) {
  const [opened, setOpened] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const hasProgram = ids.length > 0
  const hasMultiPrograms = ids.length > 1
  useEffect(() => {
    const hasProgram = ids.length > 0
    setSelectedId(hasProgram ? ids[0] : undefined)
  }, [ids])
  const programs = useMemo(() => parseProgramsData(ProgramSample), [])
  const programList = useMemo(() => [...programs.iter()], [programs])

  const selectedProgram = programList.find(program => program.id === selectedId)

  return (
    <div className={`${styles['btst']} ${hasProgram ? (opened ? styles['open'] : styles['small']) : styles['none']}`}>
      <div className={styles['btst-header']}>
        <div
          onClick={() => {
            setOpened(!opened)
          }}
          className={styles['btst-fold']}
        >
          {opened
            ? <MdUnfoldLess size={32} />
            : <MdUnfoldMore size={32} />}
        </div>
        <div
          onClick={() => {
            onClose()
            setOpened(false)
          }}
          className={styles['btst-close']}
        >
          <MdClose size={32} />
        </div>
      </div>
      {hasProgram && (
        hasMultiPrograms
          ? (
              <div className={styles['btst-items']}>
                {ids.map((id) => {
                  const program = programList.find(program => program.id === id)
                  return (
                    <div
                      onClick={() => setSelectedId(id)}
                      className={`${styles['btst-item']} ${selectedId === id ? styles['btst-item-active'] : ''}`}
                      key={id}
                    >
                      {program ? program.name : 'サンプル'}
                    </div>
                  )
                })}
              </div>
            )
          : (
              selectedProgram
                ? (
                    <h2
                      style={{
                        fontSize: Math.min(Math.max(24, 320 / selectedProgram.name.length), 32),
                      }}
                    >
                      {selectedProgram.id}
                    </h2>
                  )
                : (
                    <p>企画データがありません</p>
                  )
            ))}
      {selectedProgram && <BottomSheetProgram program={selectedProgram} />}
    </div>
  )
}
