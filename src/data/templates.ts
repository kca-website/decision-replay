import type { UserProfile } from '../db/db';

export interface TemplateField {
  key: string;
  required?: boolean;
  type?: 'text' | 'textarea' | 'options' | 'slider';
  advanced?: boolean;
}

export interface Template {
  id: string;
  profile: UserProfile;
  nameKey: string;
  descKey: string;
  fields: string[]; // keys of active fields (translation keys under wizard.*)
  advancedFields: string[];
  defaultReplayDays: number;
}

export const TEMPLATES: Template[] = [
  {
    id: 'professional-general',
    profile: 'professional',
    nameKey: 'templates.professional-general.name',
    descKey: 'templates.professional-general.desc',
    fields: ['situation', 'options', 'choice', 'reason', 'expected', 'success', 'confidence'],
    advancedFields: ['assumptions', 'risks', 'missing', 'secondOpinion'],
    defaultReplayDays: 30,
  },
  {
    id: 'professional-time',
    profile: 'professional',
    nameKey: 'templates.professional-time.name',
    descKey: 'templates.professional-time.desc',
    fields: ['situation', 'expected', 'success', 'confidence'],
    advancedFields: ['assumptions', 'risks', 'missing'],
    defaultReplayDays: 30,
  },
  {
    id: 'student-study',
    profile: 'student',
    nameKey: 'templates.student-study.name',
    descKey: 'templates.student-study.desc',
    fields: ['options', 'choice', 'reason', 'expected', 'confidence'],
    advancedFields: ['assumptions', 'risks'],
    defaultReplayDays: 7,
  },
  {
    id: 'student-group',
    profile: 'student',
    nameKey: 'templates.student-group.name',
    descKey: 'templates.student-group.desc',
    fields: ['situation', 'reason', 'expected', 'confidence'],
    advancedFields: ['risks', 'missing'],
    defaultReplayDays: 14,
  },
  {
    id: 'personal-job',
    profile: 'personal',
    nameKey: 'templates.personal-job.name',
    descKey: 'templates.personal-job.desc',
    fields: ['situation', 'options', 'choice', 'reason', 'expected', 'success', 'confidence'],
    advancedFields: ['assumptions', 'risks', 'missing', 'secondOpinion'],
    defaultReplayDays: 180,
  },
  {
    id: 'personal-purchase',
    profile: 'personal',
    nameKey: 'templates.personal-purchase.name',
    descKey: 'templates.personal-purchase.desc',
    fields: ['options', 'choice', 'reason', 'expected', 'success', 'confidence'],
    advancedFields: ['assumptions', 'risks'],
    defaultReplayDays: 60,
  },
];

export const getTemplatesForProfile = (p: UserProfile | null): Template[] => {
  if (!p) return TEMPLATES;
  return TEMPLATES.filter((t) => t.profile === p);
};

export const getTemplateById = (id: string): Template | undefined =>
  TEMPLATES.find((t) => t.id === id);
