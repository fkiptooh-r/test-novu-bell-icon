export type ChannelPreference = {
    email?: boolean;
    sms?: boolean;
    in_app?: boolean;
    chat?: boolean;
    push?: boolean;
  };
  
  export interface Workflow {
    id: string;
    identifier: string;
    name: string;
    critical: boolean;
    tags: string[];
  }
  
  export interface Override {
    channel: keyof ChannelPreference;
    source: string;
  }
  
  export interface PreferenceItem {
    level: 'global' | 'template';
    enabled: boolean;
    channels: ChannelPreference;
    overrides?: Override[];
    workflow?: Workflow;
  }
  
  