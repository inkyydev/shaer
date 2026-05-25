import { useMemo, useState, type ReactNode } from 'react'

import logo from '../../../assets/logo.svg'
import tooltipIcon from '../../../assets/tooltip-icon.svg'

function InfoTooltip({ children }: { children: ReactNode }) {
  return (
    <span className="roi__tooltip">
      <img src={tooltipIcon} alt="" className="roi__tooltip-icon" aria-hidden />
      <span className="roi__tooltip-bubble" role="tooltip">
        {children}
      </span>
    </span>
  )
}

type PresetKey = 'small' | 'medium' | 'large'

type Preset = {
  label: string
  monthlyInboundCalls: number
  averageJobValue: number
  missedCallsPercent: number
}

const MONTHLY_COST = 400

const PRESETS: Record<PresetKey, Preset> = {
  small: {
    label: 'Small',
    monthlyInboundCalls: 150,
    averageJobValue: 450,
    missedCallsPercent: 30,
  },
  medium: {
    label: 'Medium',
    monthlyInboundCalls: 300,
    averageJobValue: 450,
    missedCallsPercent: 23,
  },
  large: {
    label: 'Large',
    monthlyInboundCalls: 1000,
    averageJobValue: 450,
    missedCallsPercent: 15,
  },
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function RoiCalculator() {
  const [activePreset, setActivePreset] = useState<PresetKey>('small')
  const [monthlyInboundCalls, setMonthlyInboundCalls] = useState(PRESETS.small.monthlyInboundCalls)
  const [averageJobValue, setAverageJobValue] = useState(PRESETS.small.averageJobValue)
  const [missedCallsPercent, setMissedCallsPercent] = useState(PRESETS.small.missedCallsPercent)

  const handlePresetChange = (presetKey: PresetKey) => {
    const preset = PRESETS[presetKey]

    setActivePreset(presetKey)
    setMonthlyInboundCalls(preset.monthlyInboundCalls)
    setAverageJobValue(preset.averageJobValue)
    setMissedCallsPercent(preset.missedCallsPercent)
  }

  const results = useMemo(() => {
    const missedCallsPerMonth = monthlyInboundCalls * (missedCallsPercent / 100)

    const estimatedMonthlyRevenueRecovered = missedCallsPerMonth * averageJobValue

    const netRoi = estimatedMonthlyRevenueRecovered - MONTHLY_COST

    const breakEvenJobs = averageJobValue > 0 ? MONTHLY_COST / averageJobValue : 0

    return {
      missedCallsPerMonth,
      estimatedMonthlyRevenueRecovered,
      monthlyCost: MONTHLY_COST,
      netRoi,
      breakEvenJobs,
    }
  }, [monthlyInboundCalls, averageJobValue, missedCallsPercent])

  return (
    <section className="roi">
      <div className="container">
        <div className="roi__header" data-aos="fade-up">
          <h2 className="roi__title">Turn Missed Calls Into Real Revenue</h2>
          <p className="roi__subtitle">
            Every unanswered call is a lost job. Shaer turns those into booked appointments
            automatically.
          </p>
        </div>

        <div className="row align-items-center roi__calculator-row">
          <div className="col-md-6 roi__inputs-col" data-aos="fade-right" data-aos-delay="100">
            <div className="roi__inputs-card">
              <h3 className="roi__inputs-title">
                Adjust inputs below to simulate your business in real time:
              </h3>

              <div className="roi__preset-buttons">
                {(Object.keys(PRESETS) as PresetKey[]).map((presetKey) => (
                  <button
                    key={presetKey}
                    type="button"
                    className={`roi__preset-btn ${
                      activePreset === presetKey ? 'roi__preset-btn--active' : ''
                    }`}
                    onClick={() => handlePresetChange(presetKey)}
                  >
                    {PRESETS[presetKey].label}
                  </button>
                ))}
              </div>

              <div className="roi__field">
                <label className="roi__label" htmlFor="monthlyInboundCalls">
                  Monthly Inbound Calls
                </label>
                <input
                  id="monthlyInboundCalls"
                  className="roi__input"
                  type="number"
                  min="0"
                  value={monthlyInboundCalls}
                  onChange={(e) => {
                    if (e.target.value.length > 8) return
                    setMonthlyInboundCalls(Number(e.target.value))
                  }}
                />
              </div>

              <div className="roi__field">
                <label className="roi__label" htmlFor="averageJobValue">
                  Average Job Value ($)
                </label>
                <input
                  id="averageJobValue"
                  className="roi__input"
                  type="number"
                  min="0"
                  value={averageJobValue}
                  onChange={(e) => {
                    if (e.target.value.length > 8) return
                    setAverageJobValue(Number(e.target.value))
                  }}
                />
              </div>

              <div className="roi__field roi__field--range">
                <div className="roi__range-header">
                  <label className="roi__label" htmlFor="missedCallsPercent">
                    Missed + After-Hours %
                  </label>
                  <span className="roi__range-value">{missedCallsPercent}%</span>
                </div>

                <input
                  id="missedCallsPercent"
                  className="roi__range"
                  type="range"
                  min="0"
                  max="100"
                  value={missedCallsPercent}
                  onChange={(e) => setMissedCallsPercent(Number(e.target.value))}
                  style={{ ['--roi-range-progress' as string]: `${missedCallsPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 roi__results-col" data-aos="fade-left" data-aos-delay="200">
            <div className="roi__results-card-wrapper">
              <div className="roi__results-card">
                <div className="roi__logo-wrap">
                  <div className="roi__logo">
                    <img src={logo} alt="logo" />
                  </div>
                </div>

                <div className="roi__divider" />

                <h3 className="roi__results-title">
                  {PRESETS[activePreset].label} Business Defaults:
                </h3>

                <div className="roi__results-list">
                  <div className="roi__result-item">
                    <span className="roi__result-label">
                      Missed Calls / Month
                      <InfoTooltip>
                        Monthly inbound calls multiplied by missed + after-hours percentage.
                      </InfoTooltip>
                    </span>
                    <p className="roi__result-value">{Math.round(results.missedCallsPerMonth)}</p>
                  </div>

                  <div className="roi__result-item">
                    <span className="roi__result-label">
                      Add / Month
                      <InfoTooltip>
                        Estimated recovered revenue based on missed calls and average job value.
                      </InfoTooltip>
                    </span>
                    <p className="roi__result-value">
                      {formatCurrency(results.estimatedMonthlyRevenueRecovered)}
                    </p>
                  </div>

                  <div className="roi__result-item">
                    <span className="roi__result-label">
                      Monthly Cost
                      <InfoTooltip>Monthly service cost.</InfoTooltip>
                    </span>
                    <p className="roi__result-value">{formatCurrency(results.monthlyCost)}</p>
                  </div>

                  <div className="roi__result-item">
                    <span className="roi__result-label">
                      Net ROI
                      <InfoTooltip>
                        Estimated monthly revenue recovered minus monthly service cost.
                      </InfoTooltip>
                    </span>
                    <p className="roi__result-value">
                      {results.netRoi >= 0 ? '+' : ''}
                      {formatCurrency(results.netRoi)}
                    </p>
                  </div>

                  <div className="roi__result-item">
                    <span className="roi__result-label">
                      Break-Even Jobs
                      <InfoTooltip>Monthly cost divided by average job value.</InfoTooltip>
                    </span>
                    <p className="roi__result-value">{results.breakEvenJobs.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
