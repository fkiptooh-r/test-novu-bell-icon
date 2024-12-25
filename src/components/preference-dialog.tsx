'use client'

import { ChevronDown, ArrowLeft, Bell, Mail, MessageSquare, Smartphone, BellRing } from 'lucide-react'
import { useState } from 'react'
import { PreferenceItem, ChannelPreference } from '../types/preferences'

interface PreferencesDialogProps {
  preferences: PreferenceItem[];
  onPreferenceChange: (updatedPreference: PreferenceItem) => void;
  onClose: () => void;
}

const channelIcons = {
  email: Mail,
  sms: Smartphone,
  in_app: Bell,
  chat: MessageSquare,
  push: BellRing,
};

export function PreferencesDialog({ preferences, onPreferenceChange, onClose }: PreferencesDialogProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggle = (preference: PreferenceItem, channel: keyof ChannelPreference) => {
    const updatedChannels = {
      ...preference.channels,
      [channel]: !preference.channels[channel],
    };

    const updatedPreference: PreferenceItem = {
      ...preference,
      channels: updatedChannels,
    };

    onPreferenceChange(updatedPreference);
  };

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
        {preferences.map((preference) => {
          const id = preference.workflow?.id || 'global';
          const isExpanded = expandedItems.includes(id);
          const name = preference.workflow?.name || 
            (preference.level === 'global' ? 'Global Preferences' : preference.workflow?.identifier || '');

          return (
            <div key={id} className="preference-item">
              <div 
                className={`preference-header ${isExpanded ? 'expanded' : ''}`} 
                onClick={() => toggleExpand(id)}
              >
                <div className="preference-title">
                  <h3>{name}</h3>
                  <span className="preference-type">{preference.level}</span>
                </div>
                <ChevronDown className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} />
              </div>

              <div className={`preference-toggles ${isExpanded ? 'expanded' : ''}`}>
                {(Object.keys(preference.channels) as Array<keyof ChannelPreference>).map((channel) => {
                  const Icon = channelIcons[channel];
                  return (
                    <div key={channel} className="toggle-container">
                      <div className="channel-info">
                        <Icon className="channel-icon" />
                        <span>{channel}</span>
                      </div>
                      <button
                        role="switch"
                        aria-checked={preference.channels[channel]}
                        onClick={() => handleToggle(preference, channel)}
                        className={`toggle-switch ${preference.channels[channel] ? 'active' : ''}`}
                      >
                        <span className="toggle-slider" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

