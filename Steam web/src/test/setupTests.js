/* eslint-env node, jest */
/* global vi */
import '@testing-library/jest-dom';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
})); 