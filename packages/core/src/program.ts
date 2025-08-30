import * as v from 'valibot'
import { tokenize, getTokenizer } from 'kuromojin'
import { Token } from './token'
import { hasKanji, hankakuKanaToZenkakuKatakana, kanaToHira, hasKatakana } from './search-utilities'

export const programType = {
  workshop: '体験',
  exhibition: '展示',
  sale: '販売',
  performance: '上演',
  publishing: '配布',
  other: 'その他',
} as const

export const ariaType = {
  '1F': '1F',
  '2F': '2F',
  '3F': '3F',
  '4F': '4F',
  '5F': '5F',
  'rooftop': '屋上',
  'annex1F': '交流棟1F',
  'annex2F': '交流棟2F',
} as const

export const ariaFloor = {
  '1F': 1,
  '2F': 2,
  '3F': 3,
  '4F': 4,
  '5F': 5,
  'rooftop': 6,
  'annex1F': 1,
  'annex2F': 2,
} as const

export const programOptionsSchema = v.objectWithRest({
  room: v.pipe(v.optional(v.string()), v.description('SVG上の部屋ID')),
  imagePath: v.optional(v.string()),
}, v.string())

export const programSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty(), v.slug()),
  name: v.pipe(v.string(), v.nonEmpty()),
  team: v.pipe(v.string(), v.nonEmpty()),
  programType: v.array(v.enum(programType)),
  location: v.pipe(v.string(), v.nonEmpty(), v.description('教室名等')),
  aria: v.enum(ariaType),
  prText: v.optional(v.pipe(v.string(), v.nonEmpty())),
  tag: v.optional(v.array(v.pipe(v.string(), v.maxLength(20), v.description('企画に結びつくタグ')))),
  dates: v.pipe(v.array(v.pipe(v.string(), v.isoDate())), v.minLength(0), v.maxLength(3), v.description('企画を開催する日付の配列')),
  options: v.pipe(v.optional(programOptionsSchema), v.description('企画のオプション情報。SVGのIDや画像パスなどの内部的な情報を含みます')),
})

export type ProgramData = v.InferInput<typeof programSchema>
export type ProgramDataOptions = v.InferOutput<typeof programOptionsSchema>

// Tagsクラス
export class Tags extends Set<string> {
  constructor(init: string[]) {
    super(init)
  }

  // 指定したタグ集合がこの集合のスーパーセットか判定
  isSupersetOf(other: Tags): boolean {
    for (const tag of other) {
      if (!this.has(tag)) return false
    }
    return true
  }

  // 指定したタグ集合とこの集合が互いに素か判定
  isDisjointFrom(other: Tags): boolean {
    for (const tag of other) {
      if (this.has(tag)) return false
    }
    return true
  }
}

// Programクラス
export class Program {
  id: string
  name: string
  team: string
  programType: string[]
  location: string
  aria: string
  prText?: string
  optionalTag?: string[]
  dates: Date[]
  options?: ProgramDataOptions

  constructor(option: ProgramData) {
    this.id = option.id
    this.name = option.name
    this.team = option.team
    this.location = option.location
    this.aria = option.aria
    this.programType = option.programType
    this.prText = option.prText
    this.optionalTag = option.tag
    this.dates = option.dates.map(v => new Date(v))
    this.options = option.options
  }

  /**
   * 企画に結びつくタグを返します。
   */
  get tags(): Tags {
    return new Tags([
      ...this.programType,
      this.aria,
      this.location,
      ...(this.optionalTag || []),
    ])
  }

  get floor(): number {
    return ariaFloor[this.aria as keyof typeof ariaType]
  }
}

// Programsクラス
export class Programs {
  programs: Set<Program>

  constructor(init?: Program[]) {
    this.programs = init ? new Set(init) : new Set()
  }

  /**
   * 以下の結果をANDして適する企画を返します。
   * @param programTypes 「体験」「募金」など。AND検索
   * @param areaTypes 階/ホールなど OR検索
   * @param tagsAndNames ハッシュタグ、企画名 AND検索
   * @param yomiganaSerch ハッシュタグ、企画名の読み仮名検索
   * @param conjugatedWordSearch ハッシュタグ、企画名の活用語を考慮した検索
   */
  async matchPrograms(programTypes: string[], areaTypes: string[], tagsAndNames: string[], _yomiganaSerch: boolean, conjugatedWordSearch: boolean): Promise<Programs> {
    let matchedProgramsResult = new Programs([])
    let temporaryResult = new Programs()

    // programTypes AND
    if (programTypes.length > 0) {
      const result = new Programs()
      for (const program of this.programs) {
        let matched = true
        for (const programType of programTypes) {
          if (!program.programType.includes(programType)) {
            matched = false
            break
          }
        }
        if (matched)
          result.programs.add(program)
      }
      temporaryResult = result
    }
    else {
      for (const program of this.programs) temporaryResult.programs.add(program)
    }

    // areaTypes OR
    if (areaTypes.length > 0) {
      const result = new Programs()
      for (const program of temporaryResult.programs) {
        if (areaTypes.includes(program.aria)) {
          result.programs.add(program)
          continue
        }
      }
      temporaryResult = result
    }
    else {
      for (const program of temporaryResult.programs) temporaryResult.programs.add(program)
    }

    // tagsAndNames AND
    getTokenizer({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict' }).then((_tokenizer) => {
    // kuromoji.js's `tokenizer` instance
    })
    if (tagsAndNames.length > 0) {
      const result = new Programs()
      for (const program of temporaryResult.programs) {
        let matched = false

        const programName = hankakuKanaToZenkakuKatakana(program.name)
        const tags = hankakuKanaToZenkakuKatakana([...program.tags].join('+'))

        for (const tagOrName of tagsAndNames) {
          const analyzedTagOrName = await analyzer(hankakuKanaToZenkakuKatakana(tagOrName))
          const tagOrName_forConjugatedWord = analyzedTagOrName.filter(item => item.reading != undefined || hasKatakana(item.surface_form)).map(item => item.reading == undefined ? kanaToHira(item.surface_form) : item.reading).map(async item => await analyzer(kanaToHira(item)))
          const analyzedTagOrName_forConjugatedWord: Token[] = []
          for (const item of tagOrName_forConjugatedWord) {
            for (const it of await item)
              analyzedTagOrName_forConjugatedWord.push(it)
          }

          const analyzedTagsTemporary = await analyzer(tags)
          const analyzedTags = analyzedTagsTemporary.filter(item => item.surface_form != '+')
          const tags_forConjugatedWord = analyzedTags.filter(item => item.reading != undefined || hasKatakana(item.surface_form)).map(item => item.reading == undefined ? kanaToHira(item.surface_form) : item.reading).map(async item => await analyzer(kanaToHira(item)))
          const analyzedTags_forConjugatedWord: Token[] = []
          for (const item of tags_forConjugatedWord) {
            for (const it of await item)
              analyzedTags_forConjugatedWord.push(it)
          }

          const analyzedProgramName = await analyzer(programName)
          const programName_forConjugatedWord = analyzedProgramName.filter(item => item.reading != undefined || hasKatakana(item.surface_form)).map(item => item.reading == undefined ? kanaToHira(item.surface_form) : item.reading).map(async item => await analyzer(kanaToHira(item)))
          const analyzedProgramName_forConjugatedWord: Token[] = []
          for (const item of programName_forConjugatedWord) {
            for (const it of await item)
              analyzedProgramName_forConjugatedWord.push(it)
          }

          for (const analyzedItem of analyzedTagOrName) {
            matched = false
            if (hasKanji(analyzedItem.surface_form)) { // analyzedItemに表意文字が含まれている
              if (tags.includes(analyzedItem.surface_form) || programName.includes(analyzedItem.surface_form)) { // まずそのまま一致チェック
                matched = true
                continue
              }
              else if (analyzedTags.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true) || analyzedProgramName.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true)) { // 読みでチェック
                matched = true
                continue
              }
            }
            else { // analyzedItemに表意文字が含まれていない
              if (analyzedTags.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true) || analyzedProgramName.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true)) { // 読みでチェック
                matched = true
                continue
              }
            }

            break
          }

          if (!matched && conjugatedWordSearch) { // 活用形考慮検索ONのとき
            matched = false
            for (const analyzedItem of analyzedTagOrName_forConjugatedWord) {
              if (analyzedTags_forConjugatedWord.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true) || analyzedProgramName_forConjugatedWord.map(item => item.reading).filter(item => item != undefined).map(item => item.includes(analyzedItem.reading)).includes(true)) {
                matched = true
                continue
              }
            }
            break
          }
        }
        if (matched) {
          console.log(`${program.name}added.`)
          result.programs.add(program)
        }
      }
      temporaryResult = result
    }
    else {
      for (const program of temporaryResult.programs) temporaryResult.programs.add(program)
    }

    matchedProgramsResult = temporaryResult

    // console.log(matchedProgramsResult)
    return matchedProgramsResult
  }

  /**
   * 企画のイテレータを返します。
   */
  iter(): IterableIterator<Program> {
    return this.programs.values()
  }
}

/**
 * 企画データのJSONをパースします
 */
export function parseProgramsData(input: string): Programs {
  const programsSchema = v.array(programSchema)
  const data = v.parse(programsSchema, input)
  return new Programs(data.map(programData => new Program(programData)))
}

async function analyzer(text: string): Promise<Token[]> {
  const tokens: Token[] = []

  const items = await tokenize(text)
  for (const item of items) {
    tokens.push(new Token(item))
  }

  return tokens
}
