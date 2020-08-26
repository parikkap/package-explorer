export class Package {
  package: string;
  architecture: string;
  description: string;
  status?: string;
  priority?: string;
  section?: string;
  'installed-size'?: string;
  maintainer?: string;
  source?: string;
  version?: string;
  replaces?: string;
  provides?: string;
  depends?: string;
  suggests?: string;
  breaks?: string;
  conflicts?: string;
  'original-maintainer'?: string;
}
