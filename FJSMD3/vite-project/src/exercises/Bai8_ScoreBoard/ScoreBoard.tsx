import { Component } from 'react'

export type ScoreBoardProps = {
  score: number
}

export class ScoreBoard extends Component<ScoreBoardProps> {
  shouldComponentUpdate(nextProps: Readonly<ScoreBoardProps>): boolean {
    return nextProps.score !== this.props.score
  }

  render() {
    return (
      <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-rose-700">ScoreBoard render tối ưu</p>
        <p className="mt-3 text-5xl font-bold text-teal-700">{this.props.score}</p>
        <p className="mt-2 text-sm text-zinc-600">Component con chỉ render lại khi props score thật sự thay đổi.</p>
      </article>
    )
  }
}
