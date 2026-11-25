import { Fragment } from 'react'

const SPLIT = /(\d+%)/
const IS_METRIC = /^\d+%$/

/** Renders text with percentages (e.g. "45%") emphasized. */
export default function Metric({ text }: { text: string }) {
  return (
    <>
      {text.split(SPLIT).map((part, i) =>
        IS_METRIC.test(part) ? (
          <strong key={i} className="metric">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
