import { ProgramPopup } from './popup'
import './extra/base.css'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Ganoine/ProgramPopup',
  component: ProgramPopup,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ProgramPopup>

export const WithButton = {
  args: {
    hasOpenButton: true,
    children: (
      <div>
        <h1>ミニページのタイトル</h1>
        <p>開くボタンがついたミニページのポップアップ(モーダル)の例です。</p>
      </div>
    ),
    kind: 'default',
  },
} as StoryObj<typeof ProgramPopup>

export const WithoutButton = {
  args: {
    hasOpenButton: false,
    children: (
      <div>
        <h1>ミニページのタイトル</h1>
        <p>開くボタンがつかないミニページのポップアップ(モーダル)の例です。</p>
      </div>
    ),
    kind: 'default',
  },
} as StoryObj<typeof ProgramPopup>
