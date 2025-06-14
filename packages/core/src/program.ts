// UUID型
export type UUID = string;

// ProgramOption型
export interface ProgramOption {
  id: UUID;
  name: string;
  team: string;
  imagePath?: string;
  programType: string[];
  optionalTag?: string[];
  location: string;
  floor: number;
  prText?: string;
}

// Tagsクラス
export class Tags extends Set<string> {
  constructor(init: string[]) {
    super(init);
  }

  // 指定したタグ集合がこの集合のスーパーセットか判定
  isSupersetOf(other: Tags): boolean {
    for (const tag of other) {
      if (!this.has(tag)) return false;
    }
    return true;
  }

  // 指定したタグ集合とこの集合が互いに素か判定
  isDisjointFrom(other: Tags): boolean {
    for (const tag of other) {
      if (this.has(tag)) return false;
    }
    return true;
  }
}

// Programクラス
export class Program {
  id: UUID;
  name: string;
  team: string;
  floor: number;
  location: string;
  programType: string[];
  imagePath?: string;
  prText?: string;
  optionalTag?: string[];

  constructor(option: ProgramOption) {
    this.id = option.id;
    this.name = option.name;
    this.team = option.team;
    this.floor = option.floor;
    this.location = option.location;
    this.programType = option.programType;
    this.imagePath = option.imagePath;
    this.prText = option.prText;
    this.optionalTag = option.optionalTag;
  }

  /**
   * 企画に結びつくタグを返します。
   */
  get tags(): Tags {
    return new Tags([
      ...this.programType,
      this.floor.toString(),
      this.location,
      ...(this.optionalTag || []),
    ]);
  }
}

// Programsクラス
export class Programs {
  programs: Set<Program>;

  constructor(init?: Program[]) {
    if (init) {
      this.programs = new Set(init);
    } else {
      this.programs = new Set();
    }
  }

  /**
   * 指定したタグを含む企画を返します。
   * @param tags
   * @param is_complete すべてのタグが完全に一致したもののみを返すか
   */
  matchPrograms(tags: Tags, is_complete: boolean = false): Programs {
    const matchedPrograms = new Programs([]);
    for (const program of this.programs) {
      const programTags = program.tags;
      if (is_complete) {
        if (tags.isSupersetOf(programTags)) {
          matchedPrograms.programs.add(program);
          continue;
        }
      }
      if (!tags.isDisjointFrom(programTags)) {
        matchedPrograms.programs.add(program);
      }
    }
    return matchedPrograms;
  }

  /**
   * 企画のイテレータを返します。
   */
  iter(): IterableIterator<Program> {
    return this.programs.values();
  }
}

/**
 * 企画データのJSONをパースします
 */
export function parseProgramsData(content: ProgramOption[]): Program[] {
  return content.map((item) => new Program(item));
}
