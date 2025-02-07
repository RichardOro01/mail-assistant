import * as fs from 'fs';
import * as path from 'path';

export const createFile = (newPath: string, content: Parameters<typeof fs.writeFileSync>[1]) => {
  const directory = path.dirname(newPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(newPath, content, 'utf8');
};
