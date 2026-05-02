import * as migration_20260501_094605 from './20260501_094605';
import * as migration_20260502_222616 from './20260502_222616';

export const migrations = [
  {
    up: migration_20260501_094605.up,
    down: migration_20260501_094605.down,
    name: '20260501_094605',
  },
  {
    up: migration_20260502_222616.up,
    down: migration_20260502_222616.down,
    name: '20260502_222616'
  },
];
