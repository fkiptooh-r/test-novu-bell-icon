import { ChevronDown, ArrowLeft, Bell, Mail } from 'lucide-react'
import { useState } from 'react'

interface Workflow {
  id: string
  identifier: string
  name: string
  critical: boolean
  tags: string[]
}

interface Override {
  channel: string
  source: string
}

interface PreferenceItem {
  level: string
  enabled: boolean
  channels: {
    email: boolean
    in_app: boolean
  }
  overrides?: Override[]
  workflow?: Workflow
}

interface PreferencesDialogProps {
  preferences: PreferenceItem[]
  onPreferenceChange: (preference: PreferenceItem) => void
  onClose: () => void
}

export function PreferencesDialog({ preferences, onPreferenceChange, onClose }: PreferencesDialogProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleToggle = (preference: PreferenceItem, channel: 'email' | 'in_app') => {
    const updatedPreference = {
      ...preference,
      channels: {
        ...preference.channels,
        [channel]: !preference.channels[channel]
      }
    }
    onPreferenceChange(updatedPreference)
  }

  return (
    <div className="preferences-dialog">
      <div className="preferences-header">
        <button onClick={onClose} className="back-button">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notifications</span>
        </button>
        <h1>Preferences</h1>
      </div>

      <div className="preferences-content">
        {preferences.map((preference, index) => {
          const id = preference.workflow?.id || `global-${index}`
          const isExpanded = expandedItems.includes(id)
          const name = preference.workflow?.name || 
            (preference.level === 'global' ? 'Global Preferences' : preference.workflow?.identifier || '')

          return (
            <div key={id} className="preference-item">
              <div 
                className={`preference-header ${isExpanded ? 'expanded' : ''}`} 
                onClick={() => toggleExpand(id)}
              >
                <div className="preference-title">
                  <h3>{name}</h3>
                  <span className="preference-type">In-App</span>
                </div>
                <ChevronDown className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} />
              </div>

              <div className={`preference-toggles ${isExpanded ? 'expanded' : ''}`}>
                <div className="toggle-container">
                  <div className="channel-info">
                    <Bell className="channel-icon" />
                    <span>In-App</span>
                  </div>
                  <button
                    role="switch"
                    aria-checked={preference.channels.in_app}
                    onClick={() => handleToggle(preference, 'in_app')}
                    className={`toggle-switch ${preference.channels.in_app ? 'active' : ''}`}
                  >
                    <span className="toggle-slider" />
                  </button>
                </div>

                <div className="toggle-container">
                  <div className="channel-info">
                    <Mail className="channel-icon" />
                    <span>Email</span>
                  </div>
                  <button
                    role="switch"
                    aria-checked={preference.channels.email}
                    onClick={() => handleToggle(preference, 'email')}
                    className={`toggle-switch ${preference.channels.email ? 'active' : ''}`}
                  >
                    <span className="toggle-slider" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

